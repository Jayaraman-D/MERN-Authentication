// server.js

import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import corsOptions from './config/corsOptions.js';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRoutes from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'

const app = express();
const port = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req , res)=> res.send('API WORKING is fine'));
app.use('/api/auth/', authRoutes);
app.use('/api/user/', userRoute);

app.listen(port , ()=>{
    console.log(`Server is running on this port: ${port}`);
    connectDB();
})