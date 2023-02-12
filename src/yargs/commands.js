import yargs from "yargs";
import { hideBin } from "yargs/helpers";


let PORT;
let modo;

yargs(hideBin(process.argv))
    .command("$0", "Establece el puerto 8080 por default",
    () => {}, (arg) => {
        PORT = 8080;
        modo = "fork";
    })

    .command("port <port> modo <modo>", "Establece el puerto y modo que desees.", (argv) => {
        argv.positional("port", {
            describe: "Número de puerto",
            type: "number",
            demandOption: true
        }).positional("modo", {
            describe: "Modo de ejecución del servidor.",
            type: "string",
            demandOption: true
        })
    }, (arg) => {
        PORT = arg.port;
        modo = arg.modo;
    })
    .parse();


export { PORT, modo };