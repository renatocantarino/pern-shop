import { Link, useNavigate } from "react-router";
import { useCreateProduct } from "../hooks/useProducts";
import { useState } from "react";
import { ArrowLeftIcon, FileTextIcon, ImageIcon, SparklesIcon, TypeIcon } from "lucide-react";

function CreatePage() {
    const navigate = useNavigate();
    const createProduct = useCreateProduct();
    const [formData, setFormData] = useState({ title: "", description: "", imageUrl: "" });

    const errorMessage = (() => {
        const err = createProduct.error;
        if (!err) return null;
        // If we receive the richer error thrown from the API helper
        if (err && typeof err === 'object' && (err.status || err.message || err.data !== undefined)) {
            const parts = [];
            if (err.status) parts.push(`Status: ${err.status}`);
            if (err.message) parts.push(err.message);
            if (err.data && typeof err.data === 'string') parts.push(err.data);
            if (err.data && typeof err.data === 'object') {
                // If data is empty object, show explicit note; otherwise pretty-print
                if (Object.keys(err.data).length === 0) parts.push("(empty response body)");
                else parts.push(JSON.stringify(err.data, null, 2));
            }
            if (parts.length) return parts.join(' — ');
        }

        // Zod validation errors (array of issues)
        if (Array.isArray(err)) return err.map((e) => e.message ?? JSON.stringify(e)).join(" • ");
        if (typeof err === "string") return err;
        if (typeof err === "object") {
            // common patterns
            if (err.error) return err.error;
            if (err.message) return err.message;
            if (err.errors) {
                if (Array.isArray(err.errors)) return err.errors.map(e => e.message ?? JSON.stringify(e)).join(" • ");
                if (typeof err.errors === 'object') return Object.values(err.errors).flat().map(v => Array.isArray(v) ? v.join(' • ') : String(v)).join(' • ');
            }
            // fallback: stringify the object in a readable way
            try {
                return JSON.stringify(err, null, 2);
            } catch {
                return String(err);
            }
        }
        return String(err);
    })();

    const handleSubmit = (e) => {
        e.preventDefault();        
        createProduct.mutate(formData, {
            onSuccess: () => navigate("/"),
        });
    };

    return (
        <div className="max-w-lg mx-auto">
            <Link to="/" className="btn btn-ghost btn-sm gap-1 mb-4">
                <ArrowLeftIcon className="size-4" /> Back
            </Link>

            <div className="card bg-base-300">
                <div className="card-body">
                    <h1 className="card-title">
                        <SparklesIcon className="size-5 text-primary" />
                        New Product
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        {/* TITLE INPUT */}
                        <label className="input input-bordered flex items-center gap-2 bg-base-200">
                            <TypeIcon className="size-4 text-base-content/50" />
                            <input
                                type="text"
                                placeholder="Product title"
                                className="grow"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </label>

                        {/* IMGURL INPUT */}
                        <label className="input input-bordered flex items-center gap-2 bg-base-200">
                            <ImageIcon className="size-4 text-base-content/60" />
                            <input
                                type="url"
                                placeholder="Image URL"
                                className="grow"
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                required
                            />
                        </label>

                        {/* IMG PREVIEW */}
                        {formData.imageUrl && (
                            <div className="rounded-box overflow-hidden">
                                <img
                                    src={formData.imageUrl}
                                    alt="Preview"
                                    className="w-full h-55 object-cover"
                                    onError={(e) => (e.target.style.display = "none")}
                                />
                            </div>
                        )}

                        <div className="form-control">
                            <div className="flex items-start gap-2 p-3 rounded-box bg-base-200 border border-base-300">
                                <FileTextIcon className="size-4 text-base-content/50 mt-1" />
                                <textarea
                                    placeholder="Description"
                                    className="grow bg-transparent resize-none focus:outline-none min-h-24"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        {createProduct.isError && (
                            <div role="alert" className="alert alert-error alert-sm">
                                <span>{errorMessage || "Failed to create. Try again."}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={createProduct.isPending}
                        >
                            {createProduct.isPending ? (
                                <span className="loading loading-spinner" />
                            ) : (
                                "Create Product"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default CreatePage;