class Projects{



    constructor() {
        this.featureHolders = document.getElementsByClassName("featureHolder")
        this.setFeature()
    }

    static Categories = {"ART":"art", "CODE":"code", "VIDEO":"video", "TEXT":"text"}

    mgic = new Project({
        "name":"My-Girlfriend-is-Curious",
        "imgUrl":"https://github.com/nickesc/My-Girlfriend-is-Curious/blob/main/img/demoTrackImg.png?raw=true",
        "projectUrl":"https://nickesc.github.io/My-Girlfriend-is-Curious",
        "sourceUrl":"https://github.com/nickesc/My-Girlfriend-is-Curious",
        "desc":"My girlfriend wants to know what I’m listening to, and I don’t like Spotify displaying it on their app, so I wrote a small server and HTML tag using Spotify's API and thelinmichael/spotify-web-api-node that will return and display my current listening activity.",
        "year":"2022",
        "cat":Projects.Categories.CODE
    })
    scaredyBot = new Project({
        "name":"ScaredyBot",
        "imgUrl":"https://github.com/nickesc/scaredyBot/raw/main/img/handsomeBoy.png",
        "projectUrl":"https://nickesc.github.io/scaredyBot/",
        "sourceUrl":"https://github.com/nickesc/scaredyBot",
        "desc":"A robot that runs away from people, built using an iRobot Create2, the pyCreate2 library and a Raspberry Pi.",
        "year":"2022",
        "cat":Projects.Categories.CODE
    })

    branches = new Project({
        "name":"Branches",
        "imgUrl":"https://github.com/nickesc/BranchesGame/blob/main/BranchesIcon.png?raw=true",
        "projectUrl":"https://github.com/nickesc/BranchesGame",
        "sourceUrl":"https://github.com/nickesc/BranchesGame",
        "desc":"A game that aims to create a feeling of agency for the player through the use of choice and branching narrative",
        "year":"2021",
        "cat":Projects.Categories.ART
    })
    hbpa = new Project({
        "name":"HomebakedPiArithmetic",
        "imgUrl":"https://github.com/nickesc/HomebakedPiArithmetic/raw/main/img/default.jpg",
        "projectUrl":"https://github.com/nickesc/HomebakedPiArithmetic",
        "sourceUrl":"https://github.com/nickesc/HomebakedPiArithmetic",
        "desc":"Bare metal coding a Raspberry Pi into a calculator with a (very) primitive GUI",
        "year":"2021",
        "cat":Projects.Categories.CODE
    })

    gmailExplorer = new Project({
        "name":"GmailExplorer",
        "imgUrl":"https://github.com/nickesc/Gmail-Explorer-Visualizer/raw/main/output_14_1.png",
        "projectUrl":"https://github.com/nickesc/GmailExplorer",
        "sourceUrl":"https://github.com/nickesc/GmailExplorer",
        "desc":"A series of Jupyter Notebooks that grab and visualize nearly every email I've ever received",
        "year":"2022",
        "cat":Projects.Categories.CODE
    })

    pvi = new Project({
        "name":"Photogrammetry Video Capture of a Stationary Object",
        "imgUrl":"https://github.com/nickesc/PhotogrammetryVideoInstructions/blob/main/thumb.png?raw=true",
        "projectUrl":"https://nickesc.github.io/PhotogrammetryVideoInstructions/",
        "sourceUrl":"https://github.com/nickesc/PhotogrammetryVideoInstructions",
        "desc":"Instructions for how to pick an object and take a video for the purposes of turning it into a point-cloud using photogrammetry",
        "year":"2021",
        "cat":Projects.Categories.TEXT
    })


    list = [this.mgic, this.scaredyBot]

    setFeature(){
        this.featureHolders[0].appendChild(this.branches.getFeatureBox())
        this.featureHolders[0].appendChild(this.mgic.getFeatureBox())
        this.featureHolders[0].appendChild(this.gmailExplorer.getFeatureBox())
        this.featureHolders[0].appendChild(this.scaredyBot.getFeatureBox())
        this.featureHolders[0].appendChild(this.hbpa.getFeatureBox())
        this.featureHolders[0].appendChild(this.pvi.getFeatureBox())
    }

}

/*
let projectTemplate = new Project({
    "name":"projectName",
    "imgUrl":"imageUrl",
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