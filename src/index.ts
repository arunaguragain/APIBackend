import express , {Application, Request, Response} from 'express';
import bodyParser from 'body-parser';
import bookRoutes from './routes/book.routes';
import authRoutes from './routes/auth.routes';
import dotenv from 'dotenv';
import {PORT} from './config';
import { connectDatabase } from './database/mongodb';
dotenv.config();
// Yo bhanda tala .env chalauna milcha 
console.log(process.env.PORT);

const app: Application = express();
// const PORT: number = 3000;

app.use(bodyParser.json());

app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);

async function start() {
    await connectDatabase();

    app.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`);
    });
}

start().catch((error) => console.log(error));
