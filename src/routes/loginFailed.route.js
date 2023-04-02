import { Router } from "express";

export const loginFailedRoute = Router();

loginFailedRoute.get("/", (req, res) => {
    res.render("loginFailed.handlebars")
})