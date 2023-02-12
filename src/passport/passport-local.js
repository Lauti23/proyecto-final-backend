import passport from "passport";
import local from "passport-local";
import { userModel } from "../models/User.js";

const LocalStrategy = local.Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id)
    done(null, user)
})

passport.use("register", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await userModel.findOne({"email": email})
    console.log("Ya existe", user)
    if(user) {
        return done(null, false)
    } else {
        const newUser = new userModel()
        newUser.email = email
        newUser.password = newUser.encryptPassword(password)
        console.log("Nuevo Usuario", newUser)
        await newUser.save()
        done(null, newUser)
    }
    
}))

passport.use("login", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await userModel.findOne({email: email})
    if(!user) {
        return done(null, false);
    } 
    if(!user.comparePasswords(password)) {
        return done(null, false);
    } else {
        done(null, user);
    }
}))