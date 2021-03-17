let request = require("request");
let cheerio = require("cheerio");


let url = "https://github.com/ethereum/mist/issues";
request(url,cb);
function extractIssuesLinks(url){
    console.log(url);
    // request(url,cb);
}
function cb(error, response, html){
    if(error){
        console.log(console.error());
    }
    else{
        issuesExport(html);
    }
}
function issuesExport(html){
    
    let selTool = cheerio.load(html);
    let issues = selTool(".flex-auto.min-width-0.p-2.pr-3.pr-md-2 a");
    console.log(issues.length);
    for(let i=0; i<issues.length;i++){
        let iname = selTool(issues).text();
        let link = selTool(issues[i]).attr("href");
        console.log(link);
    }
}

// module.exports={
//     extractIssuesLinks:extractIssuesLinks
// }