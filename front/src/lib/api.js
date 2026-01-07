import httpHandler from "./httpHandler";


export const syncUser = async (userData) => {
    const { data } = await httpHandler.post("/users/sync", userData);
    return data;
};

// Products API
export const getAllProducts = async () => {
    const { data } = await httpHandler.get("/products");
    return data;
};

export const getProductById = async (id) => {
    const { data } = await httpHandler.get(`/products/${id}`);
    return data;
};

export const getMyProducts = async () => {
    const { data } = await httpHandler.get("/products/my");
    return data;
};

export const createProduct = async (productData) => {
    const { data } = await httpHandler.post("/products", productData);
    return data;
};

export const updateProduct = async ({ id, ...productData }) => {
    const { data } = await httpHandler.put(`/products/${id}`, productData);
    return data;
};

export const deleteProduct = async (id) => {
    const { data } = await httpHandler.delete(`/products/${id}`);
    return data;
};

// Comments API
export const createComment = async ({ productId, content }) => {
    const { data } = await httpHandler.post(`/comments/${productId}`, { content });
    return data;
};

export const deleteComment = async ({ commentId }) => {
    const { data } = await httpHandler.delete(`/comments/${commentId}`);
    return data;
};
