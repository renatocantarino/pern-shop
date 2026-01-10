import type { Request, Response } from "express";
import * as commands from "../db/commands";
import { getAuth } from "@clerk/express";


interface SyncUserRequest {
    email: string;
    name: string;
    imageUrl: string;
}

export async function syncUser(req: Request, res: Response) {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        
        const { email, name, imageUrl } = req.body as SyncUserRequest;

        if (!email || !name || !imageUrl) {
            return res.status(400).json({
                error: "Missing required fields",
                required: ["email", "name", "imageUrl"]
            });
        }
        const user = await commands.upsertUser({
            id: userId,
            email,
            name,
            avatar: imageUrl,

        });

        return res.status(200).json({
            message: "User synced successfully",
            user,
        });

    } catch (error) {
        console.error(`[SyncUser Error] UserID: ${getAuth(req).userId || 'unknown'} -`, error);
        res.status(500).json({ error: "Failed to sync user" });
    }

}