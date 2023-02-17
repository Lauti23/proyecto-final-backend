import express from "express";
import { isAuthenticated, routeLogs } from "../middlewares/middlewares.js";

export const productsRoute = express.Router()

productsRoute
    .get("/", isAuthenticated, routeLogs, (req, res) => {
        res.render("products.handlebars")
    })