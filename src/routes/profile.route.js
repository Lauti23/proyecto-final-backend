import express from "express";
import { isAuthenticated } from "../middlewares/middlewares.js";

export const profileRoute = express.Router()

profileRoute
    .get("/", isAuthenticated, (req, res) => {
        console.log("PERFIL:", req.user)
        res.render("profile.handlebars", {email: req.user.email})
    })