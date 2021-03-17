let request = require("request");
let cheerio = require("cheerio");

let singleMatchFileObj = require("./singleMatch");

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";
request(url, cb);

function cb(err, response, html){
    if (err)
    {
        console.log(err);
    }
    else{
        let cheerioSelector = cheerio.load(html);
        let matchcard = cheerioSelector(".col-md-8.col-16");
        for(let i = 0; i < matchcard.length; i++){
            let allanchorsofAMathc= cheerioSelector(matchcard[i]).find(".match-cta-container .btn.btn-sm.btn-outline-dark.match-cta");
            let link = cheerioSelector(allanchorsofAMathc[2]).attr("href");
            let fullLink = "https://www.espncricinfo.com"+link;

            singleMatchFileObj.spFn(fullLink);
        }
    }
}
