import express from "express";

export const infoRoute = express.Router();

infoRoute
    .get("/", (req, res) => {
        res.render("info.handlebars")
    })