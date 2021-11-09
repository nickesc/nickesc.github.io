
let domain="https://steam-tools-nickesc.herokuapp.com/"

let url=domain+""

var options = {

    method: "GET", // POST, PUT, DELETE, etc.
    headers: {
        // the content type header value is usually auto-set
        // depending on the request body
        'Content-Type': 'application/json'
    },
    //body: undefined // string, FormData, Blob, BufferSource, or URLSearchParams
    //referrer: "about:client", // or "" to send no Referer header,
    // or an url from the current origin
    //referrerPolicy: "no-referrer-when-downgrade", // no-referrer, origin, same-origin...
    //mode: "no-cors", // same-origin, no-cors
    //credentials: "same-origin", // omit, include
    cache: "default", // no-store, reload, no-cache, force-cache, or only-if-cached
    //redirect: "follow", // manual, error
    //integrity: "", // a hash, like "sha256-abcdef1234567890"
    //keepalive: false, // true
    //signal: undefined, // AbortController to abort request
    //window: window // null
}

fetch(url, options)
.then(data=>{return data.json()})
.then(res=>console.log(res))