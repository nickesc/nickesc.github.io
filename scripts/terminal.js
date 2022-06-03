class Terminal{



    terminal = document.getElementById("terminal")
    label = document.getElementById("terminalLabel")
    active = true

    lastCommands = []
    commandIndex = 0
    command;
    promptDefault = "nickesc.github.io [Version 0.3.7]";
    prompt = this.promptDefault;

    constructor(terminalDisplay) {

        this.promptUnknown = document.createElement("div")
        this.promptUnknown.className = "errorText"
        this.promptUnknown.innerText = "Unknown command. Click for help."

        this.promptStopped = document.createElement("div")
        this.promptStopped.className = "errorText"
        this.promptStopped.innerText = "Stopped. Type 'start'."

        this.terminalDisplay = terminalDisplay

        this.init()
    }





    attachListeners(){
        document.addEventListener('keypress', (event) => {
            this.terminal.focus();
        })
        this.terminal.addEventListener('keypress', (event) => {

            if (event.keyCode === 13 || event.code === "Enter") {
                event.preventDefault();

                this.command = this.terminal.value
                console.log(this.command)
                this.lastCommands.unshift(this.command)
                this.terminal.value=""

                this.commandInput(this.command)
            }
        });
    }

    init(){
        this.attachListeners()
    }

    start(){
        document.getElementsByClassName("terminalDisplay")[0].style.display = "block"
        if(this.active === false) {
            this.terminalDisplay.setDisplay(this.terminalDisplay.home)
            this.terminalDisplay.toolTitle.style.color = "#232326"
            this.terminal.placeholder="Type 'help' for help."
        }
        this.active = true
    }
    exit(){
        document.getElementsByClassName("terminalDisplay")[0].style.display = "none"
        this.terminalDisplay.toolTitle.innerText = "STOPPED"
        this.terminalDisplay.toolTitle.style.color = "#EF5252"

        this.terminal.placeholder="Stopped. Type 'start' to start."

        this.active = false
    }

    commandInput(command) {
        this.prompt = this.promptDefault
        this.promptUnknown.style.display = "none"

        if(this.active || command === "start"){
            switch (command.toLowerCase()) {
                case "help":
                    this.terminalDisplay.setDisplay(this.terminalDisplay.help)
                    break;
                case "open home":
                    this.terminalDisplay.setDisplay(this.terminalDisplay.home)
                    break;
                case "open projects":
                    this.terminalDisplay.setDisplay(this.terminalDisplay.projects)
                    break;
                case "open spiral":
                    this.terminalDisplay.setDisplay(this.terminalDisplay.spiral)
                    break;
                case "open portfolio":
                    this.terminalDisplay.redirectToPortfolio()
                    break;
                case "":
                    break;
                case "start":
                    this.start()
                    break;
                case "stop":
                    this.exit()
                    break;

                default:
                    this.label.appendChild(this.promptUnknown)
                    this.promptUnknown.style.display = "block"
                    break;
            }
        } else{
            this.label.appendChild(this.promptStopped)
            this.promptUnknown.style.display = "none"
            this.promptUnknown.style.display = "block"
        }




    }
}