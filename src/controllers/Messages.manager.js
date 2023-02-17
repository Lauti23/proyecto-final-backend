import { messageModel } from "../models/Message.js";


export class MessagesManager {
    constructor(model) {
        this.model = model
    }

    async getAll() {
        let data = await this.model.find()
        if(data.length === 0) {
            return {status: "Error", message: "No hay mensajes en la base de datos."}
        } else {
            return data
        }
    }

    async insert(data) {
        let message = new messageModel({email: data.email, message: data.message, date: data.date})
        if(!data.email || !data.message || !data.date) {
            return {status: "Error", message: "Faltan campos por completar."}
        } else {
            message.save()
            return message
        }
    }

    async findMessage(messageInfo) {
        let data = await this.model.findOne({email: messageInfo.email, message: messageInfo.message})
        if(!data) {
            return {status: "Error", message: "No hay mensajes para mostrar"}
        } else {
            return data
        }
    }
}