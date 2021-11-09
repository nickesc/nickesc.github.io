var textToHTML= function (str) {
    var dom = document.createElement('div');
    dom.classList.add("steamHtml")
    dom.innerHTML = str;
    return dom;
}

function replaceClassInnerHtml(className, innerHtml){

    const classElements = document.getElementsByClassName(className);
    for (const element of classElements){
        element.innerHTML = innerHtml
    }
}

function setAppInfoResQueries(res, queries){
    let appid=queries.get('appid')
    let info=res[appid].data

    setAppInfo(info, appid)
}


function setUndefined(){
    $.get("undefined.html", function( data ) {
        $(".toolResultHolder:first").html(data);
    });

}

function setAppInfo(info, appid){

    info.appid=appid

    let categories=[];
    for (const cat of info.categories){
        categories.push(cat.description)
    }

    let genres=[];
    for (const gen of info.genres){
        genres.push(gen.description)
    }

    let pics=[];
    for (const pic of info.screenshots){
        pics.push(pic.path_full)
    }

    let movies=[];
    for (const mov of info.movies){
        movies.push(mov.mp4.max)
    }
    console.log(categories, genres, pics, movies)
    //let appId=appid
    let requiredAge=info.requiredAge
    let isFree=info.is_free
    let detailedDescription=info.detailed_description
    let aboutTheGame=info.about_the_game


    replaceClassInnerHtml("appTitle",info.appid)

//    for (const titleElement of titleElements){
  //      //let node = detailedDescriptionDom.cloneNode()
    //    titleElement.innerHTML=detailedDescriptionDom


}
