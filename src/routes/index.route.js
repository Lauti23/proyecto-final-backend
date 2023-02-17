import express from "express";
import { isAuthenticated } from "../middlewares/middlewares.js";

export const indexRoute = express.Router();

indexRoute
    .get("/", isAuthenticated, (req, res) => {
        console.log("INDEX", req.user)
        res.send(req.user)
    })