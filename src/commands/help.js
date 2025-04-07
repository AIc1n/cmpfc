terminal.addCommand("help", function() {
    terminal.printLine("Добро пожаловать в раздел помощи!", Color.COLOR_1)
    terminal.printLine("Доступные команды:\n")
    let helpCommands = ["helloworld", "now", "clear"]
    let longestCommandLength = helpCommands.reduce((p, c) => Math.max(p, c.length), 0)
    for (let command of helpCommands.sort((a, b) => a.localeCompare(b))) {
        let spaces = strRepeat(" ", longestCommandLength - command.length + 2)
        let description = terminal.allCommands[command]
        terminal.printCommand(`  ${command}${spaces}`, command, Color.PURPLE, false)
        terminal.printLine(`${description}`)
    }
}, {
    description: "shows this help menu",
})