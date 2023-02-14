import yargs from "yargs";
import { hideBin } from "yargs/helpers";


let portNumber;
let modo;


yargs(hideBin(process.argv))
    .command("$0", "Establece el puerto 8080 por default", //ESTABLECE EL PUERTO 8080 POR DEFAULT.
    () => {}, (arg) => {
        portNumber = 8080;
        modo = "fork";
    })

    .command("port <port> modo <modo>", "Establece el puerto y modo que desees.", (argv) => { //ESTABLECEMOS EL PUERTO Y EL MODO DE EJECUCIÓN DEL SERVIDOR.
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
        portNumber = arg.port;
        modo = arg.modo;
    })
    .parse();


export { portNumber, modo };