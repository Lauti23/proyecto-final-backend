import express from "express";

export const indexRoute = express.Router();

indexRoute
    .get("/", (req, res) => {
        res.send("asd")
    })