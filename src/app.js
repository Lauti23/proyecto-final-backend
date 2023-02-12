import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cluster from "cluster";
import { cpus } from "os";

//Variable para la cantidad de núcleos
const numCpus = cpus().length;

import { PORT, modo } from "./yargs/commands.js"
console.log("MODO ELEGIDO: ", modo)
import handlebars from "express-handlebars";
import session from "express-session";
import passport from "passport";
import "./passport/passport-local.js";
import MongoStore from "connect-mongo";

//PRODUCT MODEL
import { productModel } from "./models/Product.js";

//MANAGER DE PRODUCTOS
import { ProductManager } from "./controllers/products.controller.js";
const productManager = new ProductManager(productModel)

//RUTAS
import { indexRoute } from "./routes/index.route.js";
import { loginRoute } from "./routes/login.route.js";
import { registerRoute } from "./routes/register.route.js";
import { apiRandomsRoute } from "./routes/apiRandoms.route.js";
import { profileRoute } from "./routes/profile.route.js";
import { infoRoute } from "./routes/info.route.js";
import { logoutRoute } from "./routes/logout.route.js";

//CONDICIONAL PARA VER EN QUE MODO SE EJECUTARA EL SERVIDOR.
if(modo === "cluster" && cluster.isPrimary) {
    console.log(`Primary process ${process.pid}`)
    for(let i = 0; i < numCpus; i++) {
        cluster.fork()
    }
    cluster.on("exit", (worker, code) => {
        console.log(`Worker ${worker.process.pid} died with ${code}`)
        cluster.fork()
    })
} else {
    
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(express.static("src/public"));
    app.use(session({
        store: MongoStore.create({mongoUrl: process.env.MONGO_SESSION_URL}),
        key: process.env.KEY,
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 600000
        }
    }))
    app.use(passport.initialize())
    app.use(passport.session())

    //CONFIGURACIÓN HANDLEBARS
    app.engine("handlebars", handlebars.engine());
    app.set("view engine", "handlebars");
    app.set("views", "src/public/views");

    //RUTAS
    app.use("/", indexRoute);
    app.use("/login", loginRoute);
    app.use("/register", registerRoute);
    app.use("/profile", profileRoute);
    app.use("/api/randoms", apiRandomsRoute);
    app.use("/info", infoRoute);
    app.use("/logout", logoutRoute);

    //PROBANDO LOS METODOS DEL CONTROLLER EN RUTA PROVISORIA
    app //OBTIENE TODOS LOS PRODUCTOS
        .get("/getAll", async (req, res) => {
            let result = await productManager.getAll()
            res.send(result)
        })
        //CREA UN PRODUCTO
        .post("/getAll", async (req, res) => {
            let newProduct = await productManager.insert(req.body)
            // console.log(newProduct)
            res.send(newProduct)
        })
        //ELIMINA UN SOLO PRODUCTO
        .delete("/getAll", async (req, res) => {
            let deleted = await productManager.findAndDelete(req.body)
            console.log(deleted)
            res.send(deleted)
        })
        //ELIMINA TODOS LOS PRODS
        .delete("/delete", async (req, res) => {
            await productManager.deleteAll()
            res.send("Items deleted")
        })

    const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

}

