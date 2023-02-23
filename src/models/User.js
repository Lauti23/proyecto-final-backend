import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv"
dotenv.config()
import bcrypt from "bcrypt";
import { logger } from "../utils/logger.js";

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_ATLAS_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})  
    .then(db => logger.info("Conectado a la base de datos"))
    .catch(err => logger.error("Error al conectarse a la base de datos: ", err.message));;

const collection = "users";

const userSchema = new Schema({
    email: String,
    password: String
})

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
};

userSchema.methods.comparePasswords = function(password) {
    return bcrypt.compareSync(password, this.password)
};

export const userModel = mongoose.model(collection, userSchema);