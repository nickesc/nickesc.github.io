
let queries=logQueries()

var options = {
    method: "GET",
    headers: {
        'Content-Type': 'application/json'
    }
}

function logQueries(){
    const queryString = window.location.search;
    //console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    return urlParams
}
