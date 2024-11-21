terminal.addCommand("helloworld", async function() {
    const printLinks = links => {
        for (const {name, url} of links) {
            terminal.printLink(name, url, undefined, false)
            terminal.print(" ")
        }
        terminal.print(" ")
    }

    const welcomeLineFuncs = [
        () => terminal.print(" ::::::::  ::::    ::::  :::::::::  :::::::::: ::::::::  "),
        () => terminal.print(":+:    :+: +:+:+: :+:+:+ :+:    :+: :+:       :+:    :+: "),
        () => terminal.print("+:+        +:+ +:+:+ +:+ +:+    +:+ +:+       +:+        "),
        () => terminal.print("+#+        +#+  +:+  +#+ +#++:++#+  :#::+::#  +#+        "),
        () => terminal.print("+#+        +#+       +#+ +#+        +#+       +#+        "),
        () => terminal.print("#+#    #+# #+#       #+# #+#        #+#       #+#    #+# "),
        () => terminal.print(" ########  ###       ### ###        ###        ########  "),
        () => terminal.print(" "),
        () => terminal.print("Добро пожаловать в терминал CMPFC."),
        () => terminal.print(`Вы можете ввести всего ${Object.keys(terminal.allCommands).length - 1} команд/ы.`),
        () => {
            terminal.print("Начните с команды: ")
            terminal.printCommand("help", "help", undefined, false)
            terminal.print(", веселитесь бля!")
        },
        () => terminal.print("                                                                "),
    ]

    let size = {
        x: welcomeLineFuncs.length * 2,
        y: welcomeLineFuncs.length
    }

    for (let i = 0; i < size.y; i++) {

        welcomeLineFuncs[i]()
        terminal.addLineBreak()
    }
}, {
    description: "display the hello-world text",
    rawArgMode: true,
})