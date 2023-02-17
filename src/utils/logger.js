import dotenv from "dotenv";
dotenv.config()

import express from "express";
import winston, { format, transports } from "winston";

export const logger = winston.createLogger({
    format: format.combine(
        format.simple(),
        format.timestamp({format: "YY-MM-DD HH:MM:SS"}),
        format.printf(info => `[${info.timestamp}] [${info.level.toUpperCase()}] ${info.message}`)
    ),
    transports: [
        new transports.Console({
            level: "info"
        }),
        new transports.File({
            level: "warn",
            filename: "./logs/warns.log"
        }),
        new transports.File({
            level: "error",
            filename: "./logs/errors.log"
        })
    ]
})