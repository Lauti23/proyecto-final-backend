import express from "express";

export const logoutRoute = express.Router();

logoutRoute
    .get("/", (req, res) => {
        req.logout(function(err) {
            if (err) { return next(err); }
            console.log("Logged Out")
        res.redirect("login")
    })
})