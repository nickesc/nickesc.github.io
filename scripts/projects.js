class Projects{


    mgic;
    scaredyBot;
    branches;
    hbpa;
    gmailExplorer;
    iob;
    dotfiles;
    bumblebee;
    starfish;
    tempchecker;
    deltaskinTemplate;
    clientEnhanced;
    controllerMappingTemplates;
    wbge;


    list = []



    constructor(terminal) {
        this.terminal = terminal
        this.featureHolders = document.getElementsByClassName("featureHolder")
        this.projectsHolder = document.getElementById("projectsHolder")
        this.constructProjects()
        this.setFeatured()
        this.terminal.projects = this
        //this.setProjects()
    }

    static Categories = {"ART":"art", "CODE":"code", "VIDEO":"video", "TEXT":"text"}

    makeProject(projectObject){
        return new Project(projectObject,this.terminal)
    }

    constructProjects(){

        this.wbge = this.makeProject({
            "name": "White Background Enforcer",
            "imgUrl": "../img/wbge.png",
            "bgColor": "#2B2B2B",
            "projectUrl": "https://addons.mozilla.org/en-US/firefox/addon/wbge/",
            "sourceUrl": "https://github.com/nickesc/white-background-enforcer",
            "desc": "A browser extension that sets a white background on pages where background-color is not explicitly set",
            "year": "2025",
            "cat": Projects.Categories.CODE,
            "command": "whitebackgroundenforcer",
        });

        this.controllerMappingTemplates = this.makeProject({
            "name": "Controller Mapping Templates",
            "imgUrl": "../img/controllerMappingTemplates.png",
            "bgColor": "#FFFFFF",
            "projectUrl": "https://nickesc.itch.io/controller-mapping-templates",
            "sourceUrl": "https://github.com/nickesc/controller-mapping-templates",
            "desc": "Simple templates to create controller mapping images for a number of gamepads.",
            "year": "2025",
            "cat": Projects.Categories.ART,
            "command": "controllermappingtemplates",
        });

        this.clientEnhanced = this.makeProject({
            "name": "Client-Enhanced",
            "imgUrl": "../img/clientEnhanced.png",
            "bgColor": "#76D676",
            "projectUrl": "https://github.com/nickesc/client-enhanced/releases",
            "sourceUrl": "https://github.com/nickesc/client-enhanced",
            "desc": "A client-side Minecraft modpack that aims to overhaul and modernize the experience.",
            "year": "2024",
            "cat": Projects.Categories.CODE,
            "command": "clientenhanced",
        });

        this.deltaskinTemplate = this.makeProject({
            "name": "deltaskin-template",
            "imgUrl": "../img/deltaskinTemplate.png",
            "bgColor": "#9636EB",
            "projectUrl": "https://github.com/nickesc/deltaskin-template",
            "sourceUrl": "https://github.com/nickesc/deltaskin-template",
            "desc": "A template and build system for creating skins for the Delta emulator.",
            "year": "2024",
            "cat": Projects.Categories.CODE,
            "command": "deltaskintemplate",
        });

        this.tempChecker = this.makeProject({
            "name": "tempChecker",
            "imgUrl": "../img/tempCheckerLogo.png",
            "bgColor": "#111111",
            "projectUrl": "https://io.adafruit.com/nickesc/dashboards/room-environment",
            "sourceUrl": "https://github.com/nickesc/tempChecker",
            "desc": "A small project to track the temperature and other conditions in my bedroom and other rooms of my house.",
            "year": "2023",
            "cat": Projects.Categories.CODE,
            "command": "tempchecker",
        });

        this.loggedmessage = this.makeProject({
            "name": "loggedmessage",
            "imgUrl": "../img/loggedmessageLogo.png",
            "bgColor": "#CECECE",
            "projectUrl": "https://www.npmjs.com/package/loggedmessage",
            "sourceUrl": "https://github.com/nickesc/loggedmessage",
            "desc": "A simple but flexible console logging library with common-sense builtin functions and defaults.",
            "year": "2023",
            "cat": Projects.Categories.CODE,
            "command": "loggedmessage",
        });

        this.starfish = this.makeProject({
            "name": "Starfish",
            "imgUrl": "../img/starfishLogo.png",
            "bgColor": "#92D0DD",
            "projectUrl": "https://nickesc.itch.io/starfish",
            "sourceUrl": "https://github.com/nickesc/projectStarfish",
            "desc": "A small, physics-based game with a simple premise: throw the Starfish as far as you can before the timer runs out! Built with Godot as a part of the Gamedev.js Jam 2023 game jam.",
            "year": "2023",
            "cat": Projects.Categories.ART,
            "command": "Starfish",
        });

        this.bumblebee = this.makeProject({
            "name":"The BumbleBee",
            "imgUrl":"../img/bumblebeeLogo.png",
            "bgColor":"#152C49",
            "projectUrl":"https://nickesc.github.io/BumbleBee",
            "sourceUrl":"https://github.com/nickesc/bumblebee",
            "desc":"A portable word game generator written in CircuitPython, based on The New York Times Spelling Bee.",
            "year":"2023",
            "cat":Projects.Categories.CODE,
            "command":"TheBumbleBee"
        })

        this.dotfiles = this.makeProject({
            "name":".dotfiles",
            "imgUrl":"../img/dotfilesLogo.png",
            "bgColor":"#28704F",
            "projectUrl":"https://github.com/nickesc/.dotfiles",
            "sourceUrl":"https://github.com/nickesc/.dotfiles",
            "desc":"My .dotfile repository for automated MacOS setup, including custom scripts and themes.",
            "year":"2022",
            "cat":Projects.Categories.CODE,
            "command":".dotfiles"
        })

        this.note = this.makeProject({
            "name":"note",
            "imgUrl":"../img/noteLogo.png",
            "bgColor":"#232323",
            "projectUrl":"https://github.com/nickesc/.dotfiles/blob/main/scripts/note",
            "sourceUrl":"https://github.com/nickesc/.dotfiles/blob/main/scripts/note",
            "desc":"A ZSH script to manage 'notes' and 'notebooks' from the command line; creates git tracked directories of Markdown files for easy access to notes.",
            "year":"2022",
            "cat":Projects.Categories.CODE,
            "command":"note"
        })

        this.paradise = this.makeProject({
            "name":"VSCode Paradise",
            "imgUrl":"../img/paradiseLogo.png",
            "bgColor":"#151515",
            "projectUrl":"https://marketplace.visualstudio.com/items?itemName=nickesc.vscode-paradise-nickesc",
            "sourceUrl":"https://github.com/nickesc/vscode-paradise-nickesc",
            "desc":"An alternate port of the Paradise theme by Manas140 to VSCode, released on the Visual Studio Code Marketplace.",
            "year":"2022",
            "cat":Projects.Categories.CODE,
            "command":"VSCodeParadise"
        })

        this.scaredyBot = this.makeProject({
            "name":"ScaredyBot",
            "imgUrl":"../img/scaredyBotLogo.png",
            "bgColor":"#29485d",
            "projectUrl":"https://nickesc.github.io/scaredyBot/",
            "sourceUrl":"https://github.com/nickesc/scaredyBot",
            "desc":"A robot that runs away from people, built using an iRobot Create2, the pyCreate2 library and a Raspberry Pi.",
            "year":"2022",
            "cat":Projects.Categories.CODE,
            "command":"ScaredyBot"
        })

        this.gmailExplorer = this.makeProject({
            "name":"Gmail Explorer",
            "imgUrl":"../img/gmailExplorerLogo.png",
            "bgColor":"#e0dfea",
            "projectUrl":"https://github.com/nickesc/GmailExplorer",
            "sourceUrl":"https://github.com/nickesc/GmailExplorer",
            "desc":"A series of Jupyter Notebooks that grab and visualize nearly every email I've ever received.",
            "year":"2022",
            "cat":Projects.Categories.CODE,
            "command":"GmailExplorer"
        })

        this.mgic = this.makeProject({
            "name":"My Girlfriend is Curious",
            "imgUrl":"../img/mgicLogo.png",
            "bgColor":"#191414",
            "projectUrl":"https://nickesc.github.io/My-Girlfriend-is-Curious",
            "sourceUrl":"https://github.com/nickesc/My-Girlfriend-is-Curious",
            "desc":"My girlfriend wants to know what I’m listening to, and I don’t like Spotify displaying it on their app, so I wrote a small server and HTML tag using Spotify's API and thelinmichael/spotify-web-api-node that will return and display my current listening activity.",
            "year":"2022",
            "cat":Projects.Categories.CODE,
            "command":"MyGirlfriendisCurious"
        })

        this.logos = this.makeProject({
            "name":"Logo Reference Sheet",
            "imgUrl":"../img/logosLogo.png",
            "bgColor":"#EF5252",
            "projectUrl":"https://nickesc.github.io/N.-Escobar-Media-Branding/Logos/logos.html",
            "sourceUrl":"https://github.com/nickesc/N.-Escobar-Media-Branding/tree/main/Logos",
            "desc":"A reference for my different logos. Provides image links, HTML tags and color codes useful when making other projects to keep branding consistent",
            "year":"2022",
            "cat":Projects.Categories.ART,
            "command":"LogoReferenceSheet"
        })

        this.branches = this.makeProject({
            "name":"Branches",
            "imgUrl":"../img/branchesLogo.png",
            "bgColor":"#e0e0e0",
            "projectUrl":"https://github.com/nickesc/BranchesGame",
            "sourceUrl":"https://github.com/nickesc/BranchesGame",
            "desc":"Branches: A Game of Choice and Agency is a game that aims to create a feeling of agency for the player through the use of choice and branching narrative.",
            "year":"2021",
            "cat":Projects.Categories.ART,
            "command":"Branches"
        })

        this.branchesScript = this.makeProject({
            "name":"Branches Script",
            "imgUrl":"../img/branchesScriptLogo.png",
            "bgColor":"#e0e0e0",
            "projectUrl":"https://nickesc.github.io/Branches-Script/",
            "sourceUrl":"https://github.com/nickesc/Branches-Script/",
            "desc":"The script page for Branches. Frontend and backend with a database for lines in the script. Used the webpage to keep voice actors updated on lines I needed recoded while making the game, and sent notifications to them when a new line is added. The database is currently broken.",
            "year":"2021",
            "cat":Projects.Categories.CODE,
            "command":"BranchesScript"
        })

        this.hbPiA = this.makeProject({
            "name":"Homebaked Pi: Arithmetic",
            "imgUrl":"../img/hbPiALogo.png",
            "bgColor":"#000000",
            "projectUrl":"https://github.com/nickesc/HomebakedPiArithmetic",
            "sourceUrl":"https://github.com/nickesc/HomebakedPiArithmetic",
            "desc":"Bare metal coding a Raspberry Pi into a calculator with a primitive GUI.",
            "year":"2021",
            "cat":Projects.Categories.CODE,
            "command":"HomebakedPi:Arithmetic"
        })

        this.steamToolsApi = this.makeProject({
            "name":"Steam Tools API",
            "imgUrl":"../img/steamToolsApiLogo.png",
            "bgColor":"#1B2838",
            "projectUrl":"https://steam-tools-nickesc.herokuapp.com/",
            "sourceUrl":"https://github.com/nickesc/SteamToolsAPI",
            "desc":"A wrapper for the Steam Web API. Unfinished but semi-robust, allows users to explore the Steam Web API a little more easily.",
            "year":"2021",
            "cat":Projects.Categories.CODE,
            "command":"SteamToolsAPI"
        })

        this.wildlife = this.makeProject({
            "name":"Wildlife",
            "imgUrl":"../img/wildlifeLogo.png",
            "bgColor":"#2D417C",
            "projectUrl":"https://nickesc.github.io/Wildlife/",
            "sourceUrl":"https://github.com/nickesc/Wildlife",
            "desc":"A spoof of a Steam listing for the fake game, Wildlife: Speculative Explorations of Southern California's Animal Ecology. Wildlife is an exploration of a potential climate change future, made as a part of an experimental art class.",
            "year":"2021",
            "cat":Projects.Categories.ART,
            "command":"Wildlife"
        })

        this.llt = this.makeProject({
            "name":"Lice License Templates",
            "imgUrl":"../img/lltLogo.png",
            "bgColor":"#C1A4DD",
            "projectUrl":"https://github.com/nickesc/N.-Escobar-Media-Branding/blob/main/license-info.md",
            "sourceUrl":"https://github.com/nickesc/license-templates",
            "desc":"Better license templates for the Lice license generator.",
            "year":"2021",
            "cat":Projects.Categories.CODE,
            "command":"LiceLicenseTemplates"
        })

        this.iob = this.makeProject({
            "name":"In Our Backyard",
            "imgUrl":"../img/iobLogo.png",
            "bgColor":"#142d14",
            "projectUrl":"https://github.com/nickesc/In-Our-Backyard",
            "sourceUrl":"https://github.com/nickesc/In-Our-Backyard",
            "desc":"A collaboration between my parents and me; a project containing an animation and guide, both based around point-cloud visualization.",
            "year":"2021",
            "cat":Projects.Categories.ART,
            "command":"InOurBackyard"
        })

        this.valor = this.makeProject({
            "name":"Valor",
            "imgUrl":"../img/valorLogo.png",
            "bgColor":"#7C5745",
            "projectUrl":"#",
            "sourceUrl":"#",
            "desc":"The final project from my COMP 131 class. An confusing first person dungeon crawler, written in Java. No links to this yet.",
            "year":"2019",
            "cat":Projects.Categories.CODE,
            "command":"Valor"
        })

        this.list = [
            this.tempChecker, // sep 2023
            this.loggedmessage, // jul 2023
            this.starfish, // april 2023
            this.bumblebee, // jan 2023
            this.dotfiles, // nov 2022
            this.note, // nov 2022
            this.paradise, // nov 2022
            this.scaredyBot, // may 2022
            this.gmailExplorer, // may 2022
            this.mgic, // april 2022
            this.logos, // march 2022
            this.branches, // dec 2021
            this.branchesScript, // dec 2021
            this.hbPiA, // dec 2021
            this.steamToolsApi, // nov 2021
            this.wildlife, // dec 2021
            this.llt, // dec 2021
            this.iob, // oct 2021
            this.valor, // dec 2019
        ];

        this.featured = [
          this.starfish,
          this.bumblebee,
          this.dotfiles,
          this.scaredyBot,
          this.mgic,
          this.branches,
        ];

    }

    setFeatured(){

        for (let i = 0; i<this.featured.length; i++){
            this.featureHolders[0].appendChild(this.featured[i].getFeatureBox())
        }
    }

    setProjects(){

        for (let i = 0; i<this.list.length; i++){
            this.projectsHolder.appendChild(this.list[i].getProjectBox())
        }
    }
}

/*
this.projectTemplate = new Project({
    "name":"projectName",
    "imgUrl":"../img/Logo.png",
    "bgColor":"#",
    "projectUrl":"projectUrl",
    "sourceUrl":"sourceUrl",
    "desc":"projectDescription",
    "year":"projectYear",
    "cat":Projects.Categories.
})
*/


class Project{

    featureBox = {
        "box":undefined,
        "img":undefined,
        "name":undefined
    };
    projectBox = {
        "box":undefined,
        "textHolder":undefined,
        "topHolder":undefined,
        "img":undefined,
        "name":undefined,
        "desc":undefined,
        "year":undefined,
        "source":undefined
    };
    featured = false;
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
        this.command = projectObject.command
        this.createProjectBox()
        document.getElementById("projectsHolder").appendChild(this.getProjectBox())

    }

    redirectToProject(){
        window.location.href = this.projectUrl;
    }
    redirectToSource(){
        window.location.href = this.sourceUrl;
    }
    redirectToImg(){
        window.location.href = this.imgUrl;
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

    createProjectBox(){
        this.projectBox.box = document.createElement("div")
        this.projectBox.textHolder = document.createElement("div")
        this.projectBox.img = document.createElement("IMG")
        this.projectBox.topHolder = document.createElement("div")
        this.projectBox.name = document.createElement("div")
        this.projectBox.desc = document.createElement("div")
        this.projectBox.year = document.createElement("div")
        this.projectBox.source = document.createElement("div")

        this.projectBox.box.appendChild(this.projectBox.img)
        this.projectBox.box.appendChild(this.projectBox.textHolder)
        this.projectBox.textHolder.appendChild(this.projectBox.topHolder)
        this.projectBox.topHolder.appendChild(this.projectBox.name)
        this.projectBox.topHolder.appendChild(this.projectBox.year)
        this.projectBox.textHolder.appendChild(this.projectBox.desc)
        this.projectBox.textHolder.appendChild(this.projectBox.source)


        this.projectBox.box.className = "projectBox pointer"
        this.projectBox.textHolder.className = "projectTextHolder"
        this.projectBox.topHolder.className = "projectTopHolder"
        this.projectBox.img.className = "projectImg"
        this.projectBox.name.className = "projectName"
        this.projectBox.desc.className = "projectDesc"
        this.projectBox.year.className = "projectYear"
        this.projectBox.source.className = "projectSource"

        this.projectBox.img.alt = this.name + " image"
        this.projectBox.img.src = this.imgUrl
        this.projectBox.name.innerText = this.name
        this.projectBox.desc.innerText = this.desc
        this.projectBox.year.innerText = this.year
        this.projectBox.source.innerText = "Source"
        this.projectBox.source.style.color = "#EF5252"
        this.projectBox.source.style.textDecoration = "underline solid"
        //this.projectBox.source.href = this.sourceUrl
        this.projectBox.box.style.backgroundColor = this.bgColor

        this.projectBox.box.addEventListener('mouseenter', (event) => {
            this.terminal.terminalDisplay.darkenButton(this.projectBox.textHolder)
        });
        this.projectBox.box.addEventListener('mouseleave', (event) => {
            this.terminal.terminalDisplay.lightenButton(this.projectBox.textHolder)
        });

        this.projectBox.source.addEventListener('mouseenter', (event) => {
            this.projectBox.source.style.color = "#FFF9F2"
            this.projectBox.source.style.textDecoration = "underline dotted"
        });
        this.projectBox.source.addEventListener('mouseleave', (event) => {
            this.projectBox.source.style.color = "#EF5252"
            this.projectBox.source.style.textDecoration = "underline solid"
        });



        this.projectBox.box.addEventListener('click', (event) => {
            //event.stopPropagation();
            window.location.href = this.projectUrl;
        });
        this.projectBox.source.addEventListener('click', (event) => {
            event.stopPropagation();
            window.location.href = this.sourceUrl;
            this.projectBox.source.style.color = "#232326"
        });
    }

    getFeatureBox(){
        if(!this.featured){
            this.createFeatureBox()
            this.featured=true
        }
        return this.featureBox.box
    }

    getProjectBox(){

        return this.projectBox.box
    }

}
