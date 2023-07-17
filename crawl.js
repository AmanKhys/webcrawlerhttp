const {JSDOM} = require('jsdom')

async function crawlPage(currrentURL) {
    console.log(`actively crawling: ${currrentURL}`)
    try{
        const resp = await fetch(currrentURL)
        
        if(resp.status > 399) {
            console.log(`error in fetch with status code: ${resp.status} on page: ${currrentURL}`)
            return
        }
        const contentType = resp.headers.get("content-type")
        if(!contentType.includes("text/html")) {
             console.log(`non html response, content type: ${contentType} on page: ${currrentURL}`)
            return
        }
        console.log(await resp.text())
    } catch(err) {
        console.log(`error in fetch: ${err.message}, on page: ${currrentURL}`)
    }

}

function normalizeURL(urlString) {

    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if(urlString.length > 0 && urlString.slice(-1) === '/')
        return hostPath.slice(0,-1);
    return hostPath

}

function getURLsFromHTML(inputHTMLBody, inputBaseURL){
    const urls = []
    const dom = new JSDOM(inputHTMLBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for(const linkElement of linkElements){
        
        if(linkElement.href.slice(0,1) === '/'){
            try {
            const urlObj = new URL(`${inputBaseURL}${linkElement.href}`)
            urls.push(`${urlObj}`)

            continue
               
            } catch (error) {
                console.log(`error with relative url: ${error.message}`)
            }
        }
        //if(!linkElement.hostname && !linkElement.pathname){
        //    console.log(linkElement.href)
        //    return `404 invalid url`
        //}
        try{
            const urlObj = new URL(linkElement.href)
            urls.push(urlObj.href)
        }catch(error){
            console.log(`error with absolute url: ${error.message}`)
        }   
    }
    return urls
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}
