process.on("message", (number) => {
    let result = []
    const cant = parseInt(number)
    for(let i = 0; i < cant; i++) {
        const randomNumber = Math.floor(Math.random() * 1000)
        result.push(randomNumber)
    }
    process.send(result)
})