import express from "express";
import core from "os"
export const infoRoute = express.Router();

let data = [
    {
        titulo: "Argumentos de entrada",
        descripcion: process.argv,
    },
    {
        titulo: "Sistema operativo",
        descripcion: process.platform,
    },
    {
        titulo: "Version Node.js",
        descripcion: process.version,
    },
    {
        titulo: "Memoria total reservada(rss)",
        descripcion: process.memoryUsage().rss,
    },
    {
        titulo: "Path de ejecución",
        descripcion: process.execPath,
    },
    {
        titulo: "Process id",
        descripcion: process.pid,
    },
    {
        titulo: "Carpeta del proyecto",
        descripcion: process.cwd(),
    },
    {
        titulo: "Cantidad de nucleos",
        descripcion: core.cpus().length
    }
];


infoRoute
    .get("/", (req, res) => {
        res.render("info.handlebars", {data: data})
    })