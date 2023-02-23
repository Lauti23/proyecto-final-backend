console.log("Products Scripts")
const socket = io();

//ELEMENTOS DEL DOM
let productsForm = document.getElementById("form");
let table = document.getElementById("table");
let needData = document.getElementById("noData");


//FUNCIÓN PARA OBTENER EL PRODUCTO QUE SE QUIERE GUARDAR
const submitProducts = (e) => {
    e.preventDefault()
    let name = e.target[0].value;
    let price = e.target[1].value;
    let image = e.target[2].value;
    let stock = e.target[3].value;
    if(name && price && image && stock) {
        let product = {name, price, image, stock}
        socket.emit("createProduct", product)
        productsForm.reset()
    } else {
        needData.innerHTML = "¡Faltan campos por completar!"
    }
}

productsForm.addEventListener("submit", (e) => submitProducts(e));

socket.on("productsData", data => {
    if(data.status === "Error") {
        table.innerHTML = `<p class="noProducts">No hay productos almacenados.</p>`
    } else {
        data.forEach(prod => {
            let tr = document.createElement("tr");
            tr.innerHTML = `<td class="productsTd">${prod.name}</td>
                            <td class="productsTd">$ ${prod.price}</td>
                            <td class="productsTd"><img class="productsImage" src=${prod.image}></td>
                            <td class="productsTd">${prod.stock}</td>
                            <td class="productsTd"><button id="deleteBtn" class=${prod.name}> X </button></td>`
            table.append(tr);
            tr.addEventListener("click", (e) => {
                if(e.target.id === "deleteBtn") {
                    let buttonClicked = e.target;
                    let itemToDelete = buttonClicked.className;
                    console.log(itemToDelete)
                    socket.emit("deleteProduct", itemToDelete);
                }
            })
        });
    }
})

socket.on("newProduct", data => {
    let tr = document.createElement("tr");
    tr.classList.add("productsRow")
    tr.innerHTML = `<td class="productsTd">${data.name}</td>
                    <td class="productsTd">$ ${data.price}</td>
                    <td class="productsTd"><img class="productsImage" src=${data.image}></td>
                    <td class="productsTd">${data.stock}</td>`
    table.append(tr);
}) 