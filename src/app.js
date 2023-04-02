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
import { Server } from "socket.io";

//LOGGER
import { logger } from "./utils/logger.js";

//MODELS
import { productModel } from "./models/Product.js";
import { messageModel } from "./models/Message.js";

//PRODUCT MANAGER
import { ProductManager } from "./controllers/Products.controller.js";
const productManager = new ProductManager(productModel)

//MESSAGES MANAGER
import { MessagesManager } from "./controllers/Messages.manager.js"
const messagesManager = new MessagesManager(messageModel)

//RUTAS
import { indexRoute } from "./routes/index.route.js";
import { loginRoute } from "./routes/login.route.js";
import { registerRoute } from "./routes/register.route.js";
import { apiRandomsRoute } from "./routes/apiRandoms.route.js";
import { profileRoute } from "./routes/profile.route.js";
import { infoRoute } from "./routes/info.route.js";
import { logoutRoute } from "./routes/logout.route.js";
import { productsRoute } from "./routes/products.route.js";
import { chatRoute } from "./routes/chat.route.js";
import compression from "compression";
import { loginFailedRoute } from "./routes/loginFailed.route.js";
import { registerFailedRoute } from "./routes/registerFailed.route.js";

// let PORT = process.argv[2] || 8080;

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

    app.use(compression())
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(express.static("src/public"));
    app.use(session({
        store: MongoStore.create({mongoUrl: process.env.MONGOATLAS_SESSION_URL}),
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
    app.use("/loginFailed", loginFailedRoute);
    app.use("/register", registerRoute);
    app.use("/registerFailed", registerFailedRoute);
    app.use("/profile", profileRoute);
    app.use("/chat", chatRoute);
    app.use("/products", productsRoute);
    app.use("/api/randoms", apiRandomsRoute);
    app.use("/info", infoRoute);
    app.use("/logout", logoutRoute);
    
    const server = app.listen(PORT, () => logger.info(`Server running on port ${PORT}, process: ${process.pid}`))

    const io = new Server(server)
    
    io.on("connection", async (socket) => {
        console.log(`Nuevo usuario se ha conectado.`)
        const getData = async () => {
            let products = await productManager.getAll()
            let messages = await messagesManager.getAll()
            socket.emit("productsData", products)
            socket.emit("messagesData", messages)
        }
        getData();

        const updateItems = async () => {
            let data = await productManager.getAll();
            io.emit("productsData", data);
        }

        socket.on("createMessage", async (data) => {
            let message = await messagesManager.insert(data);
            io.emit("newMessage", message);
        })

        socket.on("createProduct", async (data) => {
            let product = await productManager.insert(data)
            io.emit("newProduct", product)
        })

        socket.on("deleteProduct", async (data) => {
            await productManager.delete(data);
            updateItems();
        })
    })
}


