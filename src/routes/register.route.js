import express from "express";
import passport from "passport";
import { routeLogs } from "../middlewares/middlewares.js";


export const registerRoute = express.Router();

registerRoute   
    .get("/", routeLogs, (req, res) => {
        res.render("register.handlebars")
    })

    .post("/", routeLogs, passport.authenticate("register", {
        successRedirect: "/profile",
        failureRedirect: "/registerFailed",
        passReqToCallback: true
    }), (req, res) => {

    })