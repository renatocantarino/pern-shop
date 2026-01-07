import express from 'express';
import cors from 'cors';
import { ENV } from './configs/env'
import usersRoutes from './routes/usersRoutes';
import productsRoutes from './routes/productsRoutes';
import commentsRoutes from './routes/commentsRoutes';
import { clerkMiddleware } from '@clerk/express'

const app = express();

app.use(cors({
    origin: ENV.FRONTEND_URL,
    credentials: true,
}))
app.use(clerkMiddleware())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => {
    res.json({
        message: "Welcome to Productify API - Powered by PostgreSQL, Drizzle ORM & Clerk Auth",
        endpoints: {
            users: "/api/users",
            products: "/api/products",
            comments: "/api/comments",
        },
    });
});


app.use('/api/users', usersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/comments', commentsRoutes);





app.listen(ENV.PORT, () => {
    console.log(`Server is running on port ${ENV.PORT}`);
});
