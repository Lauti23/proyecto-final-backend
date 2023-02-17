import express from "express";
import { isAuthenticated } from "../middlewares/middlewares.js";

export const chatRoute = express.Router();

chatRoute   
    .get("/", isAuthenticated, (req, res) => {
        res.render("chat.handlebars", {email: req.user.email})
    })