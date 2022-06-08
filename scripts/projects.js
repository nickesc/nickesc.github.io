class Projects{

    static Categories = {"ART":"art", "CODE":"code", "VIDEO":"video"}

}

let projectTemplate = {
    "name":"projectName",
    "imgUrl":"imageUrl",
    "projectUrl":"projectUrl",
    "sourceUrl":"sourceUrl",
    "desc":"projectDescription",
    "year":"projectYear",
    "cat":"projectCategory"
}


class Project{

    featureBox = {"box":undefined, "imgHolder":undefined, "img":undefined,"name":undefined};

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
        this.featureBox.box = document.createElement("div")
    }

}