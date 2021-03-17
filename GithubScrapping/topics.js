let request = require("request");
let cheerio = require("cheerio"); 
let extractRepo = require("./extractRepo");

let url = "https://github.com/topics";

request(url,cb);

function cb(error, response, html){
    if(error){
        console.log(error);
    }
    else{
        topicExtractor(html);
    }
}

function topicExtractor(html){
    let selTool = cheerio.load(html);
    let topics = selTool(".container-lg.p-responsive.mt-6 ul li a");
    for(let i = 0; i<topics.length; i++){
        let topicName = selTool(topics[i]).text();
        topicName = topicName.trim().split("\n")[0];

        let link = "https://github.com/"+selTool(topics[i]).attr("href");
        extractRepo.extractR(link);
        console.log(topicName + " : "+link);
    }
}