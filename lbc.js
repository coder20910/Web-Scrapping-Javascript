let request = require('request');
let cheerio = require('cheerio');

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary";

request(url, cb);

// // intial content -> scrap 
// last ball commentry
function cb(err, response, html){
    if(err){
        console.log(err);
    }
    else{
        let chSelector  = cheerio.load(html);
        let element = chSelector(".match-comment .d-flex.match-comment-padder.align-items-center .match-comment-long-text p");
        let text = chSelector(element[0]).text();
        console.log(text); 
    }
}