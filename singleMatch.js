let request = require("request");
let cheerio = require("cheerio");
function singlePageExtractor(url){
    request(url, cb);
}


function cb(err, response, html){
    let cheerioSelector = cheerio.load(html);
    let bothmathces = cheerioSelector(".event .teams>.team");

    let myTeam;
    for(let i=0; i<bothmathces.length; i++){
        let isLossing = cheerioSelector(bothmathces[i]).hasClass("team-gray");
        if(isLossing == false){
            let myTeamElem = cheerioSelector(bothmathces[i]).find(".name-detail a");
            myTeam = myTeamElem.text();
        }
    }

    let colInnings = cheerioSelector(".Collapsible");

    let bothInningsTeamName = cheerioSelector(".Collapsible .header-title.label");
    for(let j = 0; j < bothInningsTeamName.length; j++){
        let teamName = cheerioSelector(bothInningsTeamName[j]).text();
        let teamFName = teamName.split("INNINGS")[0];
        teamFName = teamFName.trim();
        if(teamFName == myTeam){
            let myWinningTeam = cheerioSelector(colInnings[j]);
            printTeamStats(myWinningTeam, cheerioSelector);
        }
    }
}
function printTeamStats(myWinningTeam, cheerioSelector){
    let statsArr = [];
    let allrows = cheerioSelector(myWinningTeam).find(".table.batsman tbody tr");
    for(let j =0; j<allrows.length; j++){
        let eachbatcol = cheerioSelector(allrows[j]).find("td");
        if(eachbatcol.length == 8){
            let player_name = cheerioSelector(eachbatcol[0]).text();
            let runs = cheerioSelector(eachbatcol[2]).text();
            statsArr.push({
                Name: player_name,
                Runs:runs
            })
        }
    }
    console.table(statsArr);
}

module.exports={
    spFn:singlePageExtractor
}