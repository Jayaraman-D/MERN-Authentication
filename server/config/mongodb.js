import mongoose from "mongoose";

const connectDB = async ()=>{
 try {
    mongoose.connection.on('connected', ()=>{
        console.log('MongoDB connected');
    });

    mongoose.connection.error('error', ()=>{
        console.log('Error in momgoDB connection');
    })

    await mongoose.connect(`${process.env.MONGODB_URL}/mern-auth`);

 } catch (error) {
    console.error(`Error oocured in MondoDB connection: ${error.message}`)
 }
    
}

export default connectDB