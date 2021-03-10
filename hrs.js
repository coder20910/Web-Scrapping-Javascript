let request = require('request');
let cheerio = require('cheerio');

url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";

request(url, cb);

function cb(err, response, html){
    if (err){
        console.log(err);
    }
    else{
        let cheerioSelector = cheerio.load(html);
        let element = cheerioSelector(".table.batsman");

        let player_name = "";
        let hsrun = 0;

        for(let i = 0; element.length; i++){
            let teamBatsmen = cheerioSelector(element[i]).find('tr');
            for(let j = 0; j < teamBatsmen.length; j++){
                let batsman = cheerioSelector(teamBatsmen[j]).find('td');
                if (batsman.length == 8){
                    let batsman_j = cheerioSelector(batsman[0]).text();
                    let run = cheerioSelector(batsman[3]).text();
                    console.log(batsman_j,"  ",run);
                    if(hsrun <= Number(run)){
                        hsrun = run;
                        player_name = batsman_j;
                    }
                    
                }
                
            }
            console.log("```````````````````````````````````");
            console.log("Highest scorer player name :",player_name,"scored ",hsrun,"run");   
        }
        
    }
}