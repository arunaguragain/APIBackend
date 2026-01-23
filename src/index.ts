import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { PORT } from './config';
import { connectDatabase } from './database/mongodb';
import cors from 'cors';


dotenv.config();
// Yo bhanda tala .env chalauna milcha
console.log(process.env.PORT); 

import adminUserRouter from './routes/admin/user.route';
import authRoutes from './routes/auth.routes';
import bookRoutes from './routes/book.routes';
import path from 'path';
const app: Application = express();
// const PORT: number = 3000;

let corsOptions={
    origin:["http://localhost:3000","http://localhost:3003"],
    //which url can access backend
    //put your frontend domain/url here
}
//origin:"*",//yo le sabai url lai access dincha
app.use(cors(corsOptions));

app.use('/uploads', express.static(path.join(
    __dirname, '../uploads'
))); //static filr serving

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/admin/users', adminUserRouter);
async function start(){
    await connectDatabase();
        
    app.listen(PORT, () => {
        console.log(`Server: http://localhost:${PORT}`);
    });
}

start().catch((error) => console.log(error));
