import { productModel } from "../models/Product.js"

export class ProductManager {
    constructor(model) {
        this.model = model
    }

    async getAll() {
        try {
            let data = await this.model.find()
            if(data.length === 0) {
                return {status: "Error", message: "No hay productos en la base de datos."}
            } else {
                return data
            }
        } catch (error) {
            logger.error(error.message)
        }
    }

    async getProduct(data) {
        try {
            let product = await this.model.findOne({name: data.name, image: data.image, price: data.price, stock: data.stock})
            if(!product) {
                return {status: "Error", message: "No se pudo encontrar el producto."}
            } else {
                return product
            }
        } catch (error) {
            logger.error(error.message)
        }
    }

    async insert(item) {
        try {
            let product = new productModel({name: item.name, image: item.image, price: item.price, stock: item.stock})
            if(!item.name || !item.image || !item.price || !item.stock) {
                return {status: "Error", message: "Faltan campos por completar."}
            } else {
                product.save()
                return product
            }
        } catch (error) {
            logger.error(error.message)   
        }
    }

    async findAndDelete(item) {
        try {
            let productToFind = await this.model.findOne({name: item.name})
            if(!productToFind) {
                return {status: "Error", message: "No hay productos en la base de datos."}
            } else {
                let productToDelete = await this.model.deleteOne({name: productToFind.name})
                return {status: "Success", message: `Producto eliminado ${productToFind}`}
            }   
        } catch (error) {
            logger.error(error.message)   
        }
    }

    async deleteAll() {
        try {
            let dataToDelete = await this.model.deleteMany()
            return {status: "Success", message: "Productos eliminados"}
        } catch (error) {
            logger.error(error.message)
        }
    }
}