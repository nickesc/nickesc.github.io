var options = {
    method: "GET",
    headers: {
        'Content-Type': 'application/json'
    }
}


class SimpleUrl{

    pathFromString(string){
        return string.split('/')
    }

    paramsFromSearch(search) {
        let params=search.split("&")
        params[0]=params[0].substr(1)

        for (let i=0; i<params.length; i++){
            let temp=params[i].split("=")
            params[i]={}
            params[temp[0]]=temp[1]
        }
        return params
    }


    constructor(location) {
        //console.log(location)

        this.string=location.toString()
        this.path=location.pathname
        this.pathArray = this.pathFromString(this.path);
        this.params = this.paramsFromSearch(location.search)


        // new URLSearchParams(location.search);

    }
}

let loc=window.location
let simpleUrl=new SimpleUrl(loc)
console.log(simpleUrl)