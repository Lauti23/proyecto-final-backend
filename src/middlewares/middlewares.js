import { logger } from "../utils/logger.js";

export const isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next()
    }
    console.log("Debes logearte primero")
    res.redirect("/login")
}

//LOGGER

export const routeLogs = (req, res, next) => {
    logger.info(`RUTA ${req.baseUrl} ${req.url} MÉTODO ${req.method}`)
    next()
}