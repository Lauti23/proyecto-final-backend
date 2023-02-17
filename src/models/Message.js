import dotenv from "dotenv"
dotenv.config()
import mongoose, { Schema } from "mongoose";
// import { logger } from "../utils/logger.js";

// mongoose.set('strictQuery', false);
// mongoose.connect(process.env.MONGO_DB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
//     .then(db => logger.info("Conectado a la base de datos"))
//     .catch(err => logger.error("Error al conectarse a la base de datos: ", err.message));

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