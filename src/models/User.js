import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv"
dotenv.config()
import bcrypt from "bcrypt";

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

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