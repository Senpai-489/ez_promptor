import mongoose from "mongoose";

let isConnected = false;
export const connectToDB = async ()=>{
    mongoose.set('strictQuery',true);

    if(isConnected){
        console.log("MongoDB Already Connected");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName : "Share_Prompt",
            useNewUrlParser : true,
            useUnifiedTopology : true,
        })
        isConnected=true;
        console.log('MongoDB Connected Successfully')
    } catch (error) {
        console.log(error);
    }
}