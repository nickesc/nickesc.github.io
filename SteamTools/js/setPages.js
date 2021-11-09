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

function setAppInfo(info){

    info.appid=info.steam_appid

    let categories=[];
    try {
        for (const cat of info.categories) {
            categories.push(cat.description)
        }
    } catch(err){
        console.log(err)
    }

    let achievs=[];
    try {
        for (const ach of info.achievements.highlighted) {
            achievs.push([ach.name,ach.path])
        }
    } catch(err){
        console.log(err)
    }

    let genres=[];
    try {
        for (const gen of info.genres) {
            genres.push(gen.description)
        }
    } catch(err){
        console.log(err)
    }

    let pics=[];
    try {
        for (const pic of info.screenshots) {
            pics.push(pic.path_full)
        }
    } catch(err) {
        console.log(err)
    }

    let movies=[];
    try {
        for (const mov of info.movies) {
            movies.push([mov.name,mov.mp4.max])
        }
    } catch(err) {
        console.log(err)
    }

    let developers = [];
    try {
        for (const dev of info.developers) {
            developers.push(dev)
        }
    } catch(err) {
        console.log(err)
    }

    let publishers=[];
    try {
        for (const pub of info.publishers) {
            publishers.push(pub)
        }
    } catch(err) {
        console.log(err)
    }

    let requirements=[]
    try {
        requirements.push(info.pc_requirements.minimum)
    }
    catch (err){
        console.log(err)
    }
    try {
        requirements.push(info.mac_requirements.minimum)
    }
    catch (err){
        console.log(err)
    }
    try {
        requirements.push(info.linux_requirements.minimum)
    }
    catch (err){
        console.log(err)
    }
    let platforms = info.platforms

    let releaseDate=info.release_date.date
    if(info.release_date.coming_soon){
        let releaseDate=releaseDate+" (coming soon)"
    }

    let email=""
    try{
        email=info.support_info.email
    } catch(err){
        console.log()
    }

    let price="$??.??"
    let initialPrice=price
    let discount = 0
    try{
        price=info.price_overview.final_formatted
        initialPrice=info.price_overview.initial_formatted
        discount=info.price_overview.discount_percent
    } catch(err){
        console.log(err)
    }

    console.log(categories, genres, pics, movies, developers, publishers, requirements, platforms, releaseDate, achievs)
    //let appId=appid
    let requiredAge=info.requiredAge
    let isFree=info.is_free
    let detailedDescription=info.detailed_description
    let aboutTheGame=info.about_the_game


    replaceClassInnerHtml("appTitle",info.detailed_description)

//    for (const titleElement of titleElements){
  //      //let node = detailedDescriptionDom.cloneNode()
    //    titleElement.innerHTML=detailedDescriptionDom


}
