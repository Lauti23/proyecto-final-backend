import express from "express";
import { isAuthenticated, routeLogs } from "../middlewares/middlewares.js";



export const chatRoute = express.Router();

chatRoute   
    .get("/", isAuthenticated, routeLogs, (req, res) => {
        res.render("chat.handlebars", {email: req.user.email})
    })