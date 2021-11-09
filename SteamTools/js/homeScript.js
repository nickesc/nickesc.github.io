
let domain="https://steam-tools-nickesc.herokuapp.com"
let urlPath="/apps?reset=true"
let url=domain+urlPath

var options = {
    method: "GET", // POST, PUT, DELETE, etc.
    headers: {
        'Content-Type': 'application/json'
    },
    cache: "default", // no-store, reload, no-cache, force-cache, or only-if-cached

    // other options
    //body: undefined // string, FormData, Blob, BufferSource, or URLSearchParams
    //referrer: "about:client", // or "" to send no Referer header,
    // or an url from the current origin
    //referrerPolicy: "no-referrer-when-downgrade", // no-referrer, origin, same-origin...
    //mode: "no-cors", // same-origin, no-cors
    //credentials: "same-origin", // omit, include

    //redirect: "follow", // manual, error
    //integrity: "", // a hash, like "sha256-abcdef1234567890"
    //keepalive: false, // true
    //signal: undefined, // AbortController to abort request
    //window: window // null
}

fetch(url, options)
.then(data=>{return data.json()})
.then(res=>console.log(res))

const appInfoForm = document.querySelector("#appInfo");
