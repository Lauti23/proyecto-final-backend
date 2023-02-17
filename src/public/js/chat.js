const socket = io();
console.log("Chat page with scripts")
//ELEMENTOS DEL DOM
let chatBox = document.getElementById("chatBox");
let chatLogs = document.getElementById("chatHistory");
let messageBox = document.getElementById("messageBox");
let userEmail = document.getElementById("userEmail").innerText

//FUNCIÓN PARA OBTENER EL MENSAGE QUE SE QUIERE ENVIAR
const submitChat = (e) => {
    e.preventDefault();
    let message = e.target[0].value;
    let email = userEmail
    console.log(message)
    if(!message == "" && email) {
        let date = new Date().toLocaleString()
        let chat = {email, date, message}
        console.log(chat)
        socket.emit("createMessage", chat)
        messageBox.value = "";
    }
}

chatBox.addEventListener("submit", (e) => submitChat(e));

socket.on("newMessage", data => {
    console.log(data)
    let chat = document.createElement("p");
    chat.innerHTML = `<span class="email">${data.email}</span><span class="date">[${data.date}]:</span><span class="message"> ${data.message}</span>`;
    chatLogs.append(chat);
})

socket.on("messagesData", data => {
    let messages = "";
    data.forEach(text => {
        messages += `<p class="chatMessageLine"><span class="email">${text.email}</span><span class= "date"> [${text.date}]</span><span class= "message">: ${text.message}</span></p>`
    })
    chatLogs.innerHTML = messages;
    messageBox.value = "";
}) 