import express from "express";
import passport from "passport";

export const registerRoute = express.Router();

registerRoute   
    .get("/", (req, res) => {
        res.render("register.handlebars")
    })

    .post("/", passport.authenticate("register", {
        successRedirect: "/profile",
        failureRedirect: "/register",
        passReqToCallback: true
    }), (req, res) => {

    })