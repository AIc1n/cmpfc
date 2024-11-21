terminal.addCommand("cmdnotfound", async function(commandName, tokens) {
    const commandArgs = tokens[2]

    let commandNames = Object.keys(terminal.commandData)
    let distances = Object.fromEntries(commandNames.map(name => [name, levenshteinDistance(commandName, name)]))
    let bestMatch = commandNames.reduce((a, b) => distances[a] < distances[b] ? a : b)

    terminal.printLine(`команда: ${commandName} не найдена`)

    if (distances[bestMatch] <= 2) {
        terminal.print("возможно вы имели в виду: ")
        terminal.printCommand(`${bestMatch}${commandArgs}`, `${bestMatch}${commandArgs}`)
    }
}, {
    description: "сообщение о том, что команда не найдена",
    rawArgMode: true,
    isSecret: true
})