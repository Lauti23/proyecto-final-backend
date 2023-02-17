import express from "express";
import passport from "passport";
import { routeLogs } from "../middlewares/middlewares.js";

export const loginRoute = express.Router();

let currentUser;

loginRoute  
    .get("/", routeLogs, (req, res) => {
        res.render("login.handlebars")
    })

    .post("/", routeLogs, passport.authenticate("login", {
        successRedirect: "/profile",
        failureRedirect: "/login",
        passReqToCallback: true
    }), (req, res) => {
        currentUser = req.user.email
    });

export {currentUser}