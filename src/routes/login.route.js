import express from "express";
import passport from "passport";

export const loginRoute = express.Router();

loginRoute  
    .get("/", (req, res) => {
        res.render("login.handlebars")
    })

    .post("/", passport.authenticate("login", {
        successRedirect: "/profile",
        failureRedirect: "/login",
        passReqToCallback: true
    }), (req, res) => {

    })