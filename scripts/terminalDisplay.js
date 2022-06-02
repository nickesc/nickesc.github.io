class TerminalDisplay {

    homePage = document.getElementById("homePage")
    spiralPage = document.getElementById("spiralBlog")
    projectsPage = document.getElementById("projectsPage")

    homeButton =document.getElementById("homeButton")
    spiralButton = document.getElementById("spiralButton")
    projectsButton = document.getElementById("projectsButton")
    portfolioButton = document.getElementById("portfolioButton")

    home = {page:this.homePage, button:this.homeButton}
    spiral = {page:this.spiralPage, button:this.spiralButton}
    projects = {page:this.projectsPage, button:this.projectsButton}

    clearMain(){
        this.homePage.style.display = "none"
        this.lightenButton(this.homeButton)
        this.spiralPage.style.display = "none"
        this.lightenButton(this.spiralButton)
        this.projectsPage.style.display = "none"
        this.lightenButton(this.projectsButton)
    }

    attachListeners(){
        this.homeButton.addEventListener('click', (event) => {
            //this.setPage('home')
            this.setDisplay(this.home)

        });
        this.spiralButton.addEventListener('click', (event) => {
            //this.setPage('spiral')
            this.setDisplay(this.spiral)
        });
        this.projectsButton.addEventListener('click', (event) => {
            //this.setPage('projects')
            this.setDisplay(this.projects)
        });

        this.portfolioButton.addEventListener('click', (event) => {
            //this.setPage('projects')
            window.location.href = "http://nickesc.com";
        });
    }

    darkenButton(button){
        button.style.backgroundColor = "#232326"
        button.style.color = "#FFF9F2"
    }
    lightenButton(button){
        button.style.backgroundColor = "#FFF9F2"
        button.style.color = "#232326"
    }

    setDisplay(display){
        //this.clearMain()
        console.log(display)
        this.clearMain()
        display.page.style.display = "initial"
        this.darkenButton(display.button)
    }

    setPage(page){
        this.clearMain()
        if(page === "home"){
            this.homePage.style.display = "initial"
        }
        else if(page === "spiral"){
            this.spiralPage.style.display = "initial"
        }
        else if(page === "projects"){
            this.projectsPage.style.display = "initial"
        }
    }

    init(){
        this.clearMain()
        this.attachListeners()
        this.setDisplay(this.home)
    }

    constructor() {
        this.init()
    }

}