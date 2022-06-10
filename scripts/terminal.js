class Terminal {



    block = document.getElementsByClassName("terminalBlock")[0]
    terminal = document.getElementById("terminal")
    label = document.getElementById("terminalLabel")
    active = true

    lastCommands = [""]
    commandIndex = 0
    command;
    currText = "";
    static promptDefault = "nickesc.github.io [v0.8.2]";
    prompt = Terminal.promptDefault;

    powerButton = document.getElementById("close")
    status = document.getElementById("status")
    terminalDisplay;

    static errorMessages = {"stopped": "Stopped. Type 'start'.", "unknown": "Unknown command. Click for help.", "badPage":"Unknown page. Click for help."}

    constructor(terminalDisplay) {

        this.terminalDisplay = terminalDisplay

        this.errorPrompt = document.createElement("div")
        this.errorPrompt.className = "errorText pointer"
        this.errorPrompt.innerText = "Unknown command. Click for help."
        this.errorPrompt.style.display = "none"
        this.label.appendChild(this.errorPrompt)
        this.errorPrompt.addEventListener('click', (event) => {
            this.terminalDisplay.setDisplay(this.terminalDisplay.help)
        });


        this.init()
    }

    // display an error text above the terminal
    displayError(errorText) {
        this.errorPrompt.innerText = errorText
        this.errorPrompt.style.display = "block"
    }

    // clear error text from the terminal
    clearError() {
        this.errorPrompt.style.display = "none"
    }

    // replaces the current text in the console with the last command
    lastCommand(event) {
        console.log(this.lastCommands)
        event.preventDefault()

        if (this.commandIndex === 0) {
            this.currText = this.terminal.value
        }

        if (this.commandIndex < this.lastCommands.length - 1) {
            this.commandIndex += 1
            this.terminal.value = this.lastCommands[this.commandIndex]
        }

        //this.displayError(this.commandIndex)
    }

    // replaces the current text in the console with the next command
    nextCommand(event) {
        console.log(this.lastCommands)
        event.preventDefault()
        if (this.commandIndex > 0) {
            this.commandIndex -= 1
            this.terminal.value = this.lastCommands[this.commandIndex]
        }
        //this.displayError(this.commandIndex)
    }

    attachListeners() {
        // power button listener
        this.powerButton.addEventListener('click', (event) => {
            this.powerToggle()
        });

        // listener for any keypress
        document.addEventListener('keypress', (event) => {
            // focus to terminal
            this.terminal.focus();
            if (this.terminal.placeholder === "Started. Type 'help' for help.") {
                this.terminal.placeholder = "Type 'help' for help."
            }

            // send command on enter
            if (event.keyCode === 13 || event.code === "Enter") {
                event.preventDefault();
                this.command = this.terminal.value
                console.log(this.command)
                if (this.command !== "") {
                    this.lastCommands.splice(1, 0, this.command);
                }
                this.terminal.value = ""
                this.terminal.blur();
                this.clearError()

                this.commandInput(this.command)
            }
        })

        // listener for any keydown
        this.terminal.addEventListener('keydown', (event) => {
            // clear console on ctrl+c
            if ((event.ctrlKey) && (event.keyCode === 67 || event.code === 'KeyC')) {
                this.terminal.value = ""
            }



            // next command on down arrow
            if (event.keyCode === 40 || event.code === "ArrowDown") {
                this.nextCommand(event)
            }
            // last command on up arrow
            if (event.keyCode === 38 || event.code === "ArrowUp") {
                this.lastCommand(event)
            }
        });

    }

    // initialization of the terminal
    init() {
        this.attachListeners()

    }

    // toggles the display with the stop and start commands, for use with power button and power command
    powerToggle() {
        if (this.active) {
            this.stop()
        } else {
            this.start()
        }
    }

    // starts the terminal display
    start() {
        document.getElementsByClassName("terminalDisplay")[0].style.display = "block"
        if (this.active === false) {
            this.terminalDisplay.setDisplay(this.terminalDisplay.home)
            this.terminalDisplay.toolTitle.style.color = "#232326"
            this.terminal.placeholder = "Started. Type 'help' for help."
            this.powerButton.innerText = "X"
            this.powerButton.style.color = "#FFF9F2"
            //this.status.style.display = "none"
            //this.block.style.backgroundColor = "#232326"
        }
        this.active = true
    }

    // stops the terminal display
    stop() {
        document.getElementsByClassName("terminalDisplay")[0].style.display = "none"
        this.terminalDisplay.toolTitle.innerText = "\xa0\xa0STOPPED"
        this.terminalDisplay.toolTitle.style.color = "#EF5252"
        this.terminal.placeholder = "Stopped. Type 'start' to start."
        this.powerButton.innerText = "O"
        this.powerButton.style.color = "#EF5252"
        //this.status.style.display = "block"
        //this.block.style.backgroundColor = "#FFF9F2"

        this.active = false
    }

    // intercept commands given to the terminal
    commandInput(command) {

        command = command.toLowerCase().split(" ")
        this.prompt = Terminal.promptDefault

        if (this.active || command[0] === "start" || command[0] === "power") {

            switch (true) {
                case (command[0] === "help"):
                    this.terminalDisplay.setDisplay(this.terminalDisplay.help)
                    break;
                case (command[0] === "open"):
                    let found = false;
                    for(let i = 0; i<this.terminalDisplay.displayList.length; i++){
                        if (command[1] === this.terminalDisplay.displayList[i].name){
                            this.terminalDisplay.setDisplay(this.terminalDisplay.displayList[i])
                            found = true
                            break;
                        } else if (command[1] === "portfolio"){
                            this.terminalDisplay.redirectToPortfolio()
                            found = true
                            break;
                        }
                    }
                    if(!found){
                        this.displayError(Terminal.errorMessages.badPage)
                    }
                    break;
                case (command[0] === "start"):
                    this.start()
                    break;
                case (command[0] === "stop"):
                    this.stop()
                    break;
                case (command[0] === "power"):
                    this.powerToggle()
                    break;
                case (command[0] === "resume"):
                    this.terminalDisplay.redirectToResume()
                    break;
                case (command[0] === "cright"):
                    this.terminalDisplay.setDisplay(this.terminalDisplay.cright)
                    break;

                case (command[0] === ""):
                    break;
                default:
                    this.displayError(Terminal.errorMessages.unknown)
                    break;
            }
        } else {
            this.displayError(Terminal.errorMessages.stopped)
        }
    }
}

class User {

    name;
    user;
    pass;
    admin;

    constructor(name,user,pass,admin) {

        this.name = name;
        this.user = user;
        this.pass = pass;
        this.admin = admin;
    }
}

class Profiles {

    static nickesc = new User("Nick","nickesc", "admin", true);
    static guest = new User("Guest","guest", "", false);
    static dummy = new User("John","user", "pass", false);

    static list = [Profiles.guest, Profiles.nickesc,Profiles.dummy]

}

class Profile {

    user;

    constructor(terminal) {

        this.terminal = terminal
    }

    login(user,pass){
        if (user && pass) {
            for (let x = 0; x < Profiles.list.length; x++) {
                if (user === Profiles.list[x].user) {
                    if (pass === Profiles.list[x].pass) {
                        this.user = Profiles.list[x]
                        this.terminal.profile = this
                    }
                }
            }
        }
    }

    logout(){
        this.user = null
    }


}