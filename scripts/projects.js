class Projects{


    mgic;
    scaredyBot;
    branches;
    hbpa;
    gmailExplorer;
    pvi;

    list = []



    constructor(terminal) {
        this.terminal = terminal
        this.featureHolders = document.getElementsByClassName("featureHolder")
        this.constructProject()
        this.setFeature()
    }

    static Categories = {"ART":"art", "CODE":"code", "VIDEO":"video", "TEXT":"text"}

    makeProject(projectObject){
        return new Project(projectObject,this.terminal)
    }

    constructProject(){

        this.mgic = this.makeProject({
            "name":"My-Girlfriend-is-Curious",
            "imgUrl":"../img/mgicLogo.png",
            "bgColor":"#191414",
            "projectUrl":"https://nickesc.github.io/My-Girlfriend-is-Curious",
            "sourceUrl":"https://github.com/nickesc/My-Girlfriend-is-Curious",
            "desc":"My girlfriend wants to know what I’m listening to, and I don’t like Spotify displaying it on their app, so I wrote a small server and HTML tag using Spotify's API and thelinmichael/spotify-web-api-node that will return and display my current listening activity.",
            "year":"2022",
            "cat":Projects.Categories.CODE
        })
        this.scaredyBot = this.makeProject({
            "name":"ScaredyBot",
            "imgUrl":"../img/scaredyBotLogo.png",
            "bgColor":"#29485d",
            "projectUrl":"https://nickesc.github.io/scaredyBot/",
            "sourceUrl":"https://github.com/nickesc/scaredyBot",
            "desc":"A robot that runs away from people, built using an iRobot Create2, the pyCreate2 library and a Raspberry Pi.",
            "year":"2022",
            "cat":Projects.Categories.CODE
        })

        this.branches = this.makeProject({
            "name":"Branches",
            "imgUrl":"../img/branchesLogo.png",
            "bgColor":"#e0e0e0",
            "projectUrl":"https://github.com/nickesc/BranchesGame",
            "sourceUrl":"https://github.com/nickesc/BranchesGame",
            "desc":"A game that aims to create a feeling of agency for the player through the use of choice and branching narrative",
            "year":"2021",
            "cat":Projects.Categories.ART
        })
        this.hbPiA = this.makeProject({
            "name":"HomebakedPiArithmetic",
            "imgUrl":"../img/hbPiALogo.png",
            "bgColor":"#000000",
            "projectUrl":"https://github.com/nickesc/HomebakedPiArithmetic",
            "sourceUrl":"https://github.com/nickesc/HomebakedPiArithmetic",
            "desc":"Bare metal coding a Raspberry Pi into a calculator with a (very) primitive GUI",
            "year":"2021",
            "cat":Projects.Categories.CODE
        })

        this.gmailExplorer = this.makeProject({
            "name":"GmailExplorer",
            "imgUrl":"../img/gmailExplorerLogo.png",
            "bgColor":"#e0dfea",
            "projectUrl":"https://github.com/nickesc/GmailExplorer",
            "sourceUrl":"https://github.com/nickesc/GmailExplorer",
            "desc":"A series of Jupyter Notebooks that grab and visualize nearly every email I've ever received",
            "year":"2022",
            "cat":Projects.Categories.CODE
        })

        this.iob = this.makeProject({
            "name":"In Our Backyard",
            "imgUrl":"../img/iobLogo.png",
            "bgColor":"#142d14",
            "projectUrl":"https://github.com/nickesc/In-Our-Backyard",
            "sourceUrl":"https://github.com/nickesc/In-Our-Backyard",
            "desc":"A collaboration between me and my parents, a project containing an animation and guide, both based around point-cloud visualization",
            "year":"2021",
            "cat":Projects.Categories.TEXT
        })


        this.list = [this.mgic, this.scaredyBot, this.branches, this.hbpa, this.gmailExplorer,this.iob]

    }



    setFeature(){
        this.featureHolders[0].appendChild(this.branches.getFeatureBox())
        this.featureHolders[0].appendChild(this.mgic.getFeatureBox())
        this.featureHolders[0].appendChild(this.scaredyBot.getFeatureBox())
        this.featureHolders[0].appendChild(this.hbPiA.getFeatureBox())
        this.featureHolders[0].appendChild(this.gmailExplorer.getFeatureBox())
        this.featureHolders[0].appendChild(this.iob.getFeatureBox())
    }
}

/*
let projectTemplate = new Project({
    "name":"projectName",
    "imgUrl":"imageUrl",
    "bgColor"":"backgroundColor
    "projectUrl":"projectUrl",
    "sourceUrl":"sourceUrl",
    "desc":"projectDescription",
    "year":"projectYear",
    "cat":"projectCategory"
})
*/


class Project{

    featureBox = {
        "box":undefined,
        "img":undefined,
        "name":undefined
    };
    started = false;

    constructor(projectObject, terminal) {
        this.terminal = terminal
        this.name = projectObject.name;
        this.imgUrl = projectObject.imgUrl;
        this.bgColor = projectObject.bgColor

        //Project Logo Design Guidelines:
        // - square 1000x1000
        // - design centered around letters
        // - font: IBM Courier
        // - basic shapes, flat colors
        // - no gradients
        // - colors from project

        this.projectUrl = projectObject.projectUrl;
        this.sourceUrl = projectObject.sourceUrl;
        this.desc = projectObject.desc;
        this.year = projectObject.year;
        this.cat = projectObject.cat;
    }

    createFeatureBox(){
        this.featureBox.box = document.createElement("td")
        //this.featureBox.imgHolder = document.createElement("div")
        this.featureBox.img = document.createElement("IMG")
        this.featureBox.name = document.createElement("div")

        this.featureBox.box.appendChild(this.featureBox.img)
        //this.featureBox.box.appendChild(this.featureBox.imgHolder)
        this.featureBox.box.appendChild(this.featureBox.name)

        this.featureBox.box.className = "featureBox pointer"
        //this.featureBox.imgHolder.className = "featureImgHolder"
        this.featureBox.img.className = "featureImg"
        this.featureBox.name.className = "featureName"

        this.featureBox.img.alt = this.name + " image"
        this.featureBox.img.src = this.imgUrl
        this.featureBox.name.innerText = this.name
        this.featureBox.box.style.backgroundColor = this.bgColor

        this.featureBox.box.addEventListener('mouseenter', (event) => {
            this.terminal.terminalDisplay.darkenButton(this.featureBox.name)
        });
        this.featureBox.box.addEventListener('mouseleave', (event) => {
            this.terminal.terminalDisplay.lightenButton(this.featureBox.name)
        });


        this.featureBox.box.addEventListener('click', (event) => {
            window.location.href = this.projectUrl;
        });
    }

    getFeatureBox(){
        if(!this.started){
            this.createFeatureBox()
        }
        return this.featureBox.box
    }

}