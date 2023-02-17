import dotenv from "dotenv"
dotenv.config()
import mongoose, { Schema } from "mongoose";

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log("Database connected")) 
    .catch(err => console.log("Error to connect with database:", err.message));

const collection = "messages";

const messageSchema = new Schema({
    email: String,
    message: String,
    date: String
},
{
    timestamps: true
}) 

export const messageModel = mongoose.model(collection, messageSchema);