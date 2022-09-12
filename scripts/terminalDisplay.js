class TerminalDisplay {

    urlBase = "nickesc.github.io"

    toolApp = document.getElementById("toolApp")
    toolTitle = document.getElementById("toolTitle")
    toolTime = document.getElementById("toolTime")

    errors = document.getElementsByClassName("errorText")

    homePage = document.getElementById("homePage")
    spiralPage = document.getElementById("spiralBlog")
    projectsPage = document.getElementById("projectsPage")
    helpPage = document.getElementById("helpPage")
    crightPage = document.getElementById("crightPage")

    homeButton =document.getElementById("homeButton")
    spiralButton = document.getElementById("spiralButton")
    projectsButton = document.getElementById("projectsButton")
    portfolioButton = document.getElementById("portfolioButton")
    helpButton = document.getElementById("terminalLabel")

    home = {page:this.homePage, button:this.homeButton, name:"home"}
    spiral = {page:this.spiralPage, button:this.spiralButton, name:"spiral"}
    projects = {page:this.projectsPage, button:this.projectsButton, name:"projects"}
    help = {page:this.helpPage, button:this.helpButton, name:"help"}
    cright = {page:this.crightPage, button:null, name:"cright"}

    displayList = [this.home,this.spiral,this.projects,this.help, this.cright]
    commandOnly = []

    display = {}

    setTime(){
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        let hours = today.getHours(); if(hours<10) hours = "0" + hours
        let minutes = today.getMinutes(); if(minutes<10) minutes = "0" + minutes
        let time = hours + ":" + minutes;

        this.toolTime.innerText = date+' '+time;
    }

    clearMain(){
        for(let i = 0; i<this.displayList.length; i++){
            this.displayList[i].page.style.display = "none"
        }
        //this.homePage.style.display = "none"
        this.lightenButton(this.homeButton)
        //this.spiralPage.style.display = "none"
        this.lightenButton(this.spiralButton)
        //this.projectsPage.style.display = "none"
        this.lightenButton(this.projectsButton)
        //this.helpPage.style.display = "none"
        for(let i =0;i<this.errors.length;i++){
            this.errors[i].style.display = "none"
        }
    }

    redirectToPortfolio(){
        window.location.href = "http://nickesc.com";
    }
    redirectToSource(){
        window.location.href = "http://github.com/nickesc/nickesc.github.io";
    }
    redirectToResume(){
        window.location.href = "./pages/Resume.html";
    }

    attachListeners(){
        document.addEventListener('contextmenu', event => event.preventDefault());

        this.homeButton.addEventListener('click', (event) => {
            this.setDisplay(this.home)

        });
        this.spiralButton.addEventListener('click', (event) => {
            this.setDisplay(this.spiral)
        });
        this.projectsButton.addEventListener('click', (event) => {
            this.setDisplay(this.projects)
        });
        /*this.helpButton.addEventListener('click', (event) => {
            this.setDisplay(this.help)
        });*/

        this.portfolioButton.addEventListener('click', (event) => {
            this.redirectToPortfolio();
        });



        let buttons = document.getElementsByClassName("menuButton")

        for(let button = 0; button<buttons.length; button++){
            buttons[button].addEventListener('mouseenter', (event) => {
                this.darkenButton(buttons[button])
            });
            buttons[button].addEventListener('mouseleave', (event) => {
                if(this.display.button!==buttons[button]) {
                    this.lightenButton(buttons[button])
                }
            });
        }
    }

    darkenButton(button, color = "#FFF9F2"){
        button.style.backgroundColor = "#232326"
        button.style.color = color
    }
    lightenButton(button){
        button.style.backgroundColor = "#FFF9F2"
        button.style.color = "#232326"
    }

    setDisplay(display){
        console.log(display)
        this.display = display
        this.toolApp.innerText = this.urlBase.toUpperCase()
        this.setTime()
        this.clearMain()
        display.page.style.display = "initial"
        this.toolTitle.innerText = ("/"+display.name).toUpperCase()
        if(this.display!==this.help && !this.commandOnly.includes(this.display)) {
            this.darkenButton(display.button)
        }
        let main = document.getElementsByClassName("terminalMain")[0]
        main.scrollTop = 0
    }

    init(){
        this.clearMain()
        this.attachListeners()
        this.setDisplay(this.home)
        this.setTime()
        setInterval(this.setTime, 1000*10);
    }

    constructor() {
        for(let i = 0; i<this.displayList.length; i++){
            if(this.displayList[i].button === null){
                this.commandOnly.push(this.displayList[i])
            }
        }

        this.init()

    }

}