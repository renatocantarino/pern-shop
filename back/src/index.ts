import express from 'express';
import cors from 'cors';
import { ENV } from './configs/env'

//import { clerkMiddleware } from '@clerk/express'

const app = express();

app.use(cors({ origin: ENV.FRONTEND_URL }))
//app.use(clerkMiddleware())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'Hello, World!' });
});


app.use('/api/users', usersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/comments', commentsRoutes);





app.listen(ENV.PORT, () => {
    console.log(`Server is running on port ${ENV.PORT}`);
});
