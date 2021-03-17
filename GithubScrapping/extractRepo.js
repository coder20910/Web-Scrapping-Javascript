let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
let path = require("path");


function extractR(url){
    request(url,cb);
}

function cb(error, response, html){
    if(error){
        console.log(error);
    }
    else{
        exrtactRepolinks(html);
    }
}

function createDir(src){
    if (fs.existsSync(src) == false){
        fs.mkdirSync(src);
    }
}

function createFile(src){
    if (fs.existsSync(src) == false){
        fs.openSync(src, "w");
    }
}
function exrtactRepolinks(url){
    let selTool = cheerio.load(url);
    
    let topicName = selTool("h1");
    topicName = selTool(topicName[0]).text().trim();

    let pathFolder = path.join(__dirname, topicName);
    createDir(pathFolder);

    let AllreposLinks = selTool(".f3.color-text-secondary.text-normal.lh-condensed");
    
    for(let i = 0; i<8; i++){
        let aArr = selTool(AllreposLinks[i]).find("a");
        let link =  selTool(aArr[1]).attr("href");
        let name = link.split("/").pop();

        let filePath = path.join(pathFolder, name+".json");
        createFile(filePath);
        
        let repoLink = "https://github.com" + link + "/issues";
        issueExport(repoLink);
    }
   
}

function issueExport(url){
    request(url, cb1);
}
function cb1(err, response, html){
    if(err){
        console.log(err);
    }
    else{
        exportIssues(html);
    }
}

function exportIssues(src){
    
    let itool = cheerio.load(src);
    let issues = itool(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
    
    let issueArr = [];
    for(let i = 0; i<issues.length;i++){
        let name = itool(issues[i]).text();
        let link = itool(issues[i]).attr("href");
       
        let issueobj = {
            Name : name,
            link: "https://github.com/"+link
        }
        issueArr.push(issueobj);
    }
    console.table(issueArr);
}
module.exports = {
    extractR: extractR
}