let request = require('request');
let cheerio = require('cheerio');

url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";

request(url, cb);

function cb(err, response, html){
    if(err){
        console.log(err);
    }
    else{
        let cheerioSelector = cheerio.load(html);
        let element = cheerioSelector(".table.bowler");
        for(let i = 0; i<element.length; i++){
            let teambowlers = cheerioSelector(element[i]).find("tr");
            for(let j = 0; j<teambowlers.length;j++){
                let bowlerData = cheerioSelector(teambowlers[j]).find("td");
                let bowler = cheerioSelector(bowlerData[0]).text()
                let wickets = cheerioSelector(bowlerData[3]).text();
                console.log(bowler + " => " + wickets);
            }
        }
    }
}