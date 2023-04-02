import { Router } from "express";

export const registerFailedRoute = Router();

registerFailedRoute.get("/", (req, res) => {
    res.render("registerFailed.handlebars")
})