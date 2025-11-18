// server.js

import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRoutes from './routes/authRoute.js'

const app = express();
const port = process.env.PORT || 3000;
connectDB();

app.use(express.json());
app.use(cors({credentials: true}));
app.use(cookieParser());

app.get('/', (req , res)=> res.send('API WORKING'));
app.use('/api/auth/', authRoutes);

console.log('setup was done');
app.listen(port , ()=>{
    console.log(`Server is running on this port: ${port}`)
})