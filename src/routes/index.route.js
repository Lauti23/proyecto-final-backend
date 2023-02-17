import express from "express";
import { isAuthenticated, routeLogs } from "../middlewares/middlewares.js";



export const indexRoute = express.Router();

indexRoute
    .get("/", isAuthenticated, routeLogs, (req, res) => {
        console.log("INDEX", req.user)
        res.send(req.user)
    })