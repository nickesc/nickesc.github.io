

class Strings {
    static domain(){
        return this.remote();
    }

    static remote(){
        return "https://steam-tools-nickesc.herokuapp.com"
    }
    static local(){
        return "http://localhost:5000"
    }
    static STEAM_API_KEY(){
        return "E8F9BC57707F681083F235617B800368"
    }
    static includeKey(sign="&"){
        return sign+"key="+this.STEAM_API_KEY()
    }
}