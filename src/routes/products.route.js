import express from "express";
import { isAuthenticated } from "../middlewares/middlewares.js";

export const productsRoute = express.Router()

productsRoute
    .get("/", isAuthenticated, (req, res) => {
        res.render("products.handlebars")
    })