import express from "express";
import { routeLogs } from "../middlewares/middlewares.js";

export const logoutRoute = express.Router();

logoutRoute
    .get("/", routeLogs, (req, res) => {
        req.logout(function(err) {
            if (err) { return next(err); }
            console.log("Logged Out")
        res.redirect("login")
    })
})