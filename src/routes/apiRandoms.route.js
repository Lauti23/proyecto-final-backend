import express from "express";
import { fork } from "child_process";

export const apiRandomsRoute = express.Router();

apiRandomsRoute.get("/", (req, res) => {
    let number = parseInt(req.query.cant)
    if(isNaN(number) || number === 0) {
        number = 100000000
    }
    console.log(number)
    const forked = fork("./src/process/random.process.js")
    forked.send(number)
    forked.on("message", data => {
        res.render("randoms", {result: data, cantidad: number})
    })
    
})

