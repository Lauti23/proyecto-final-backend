import express from "express";

export const apiRandomsRoute = express.Router();

apiRandomsRoute
    .get("/", (req, res) => {
        res.render("randoms.handlebars")
    })