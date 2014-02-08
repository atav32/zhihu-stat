var request = require("request");
var cheerio = require("cheerio");
var http = require("http");
 
var username = process.argv[2];
var user = {};
request({ uri: "http://www.zhihu.com/people/" + username, }, parseZhihuUser);

function parseZhihuUser(error, response, body) {
    $ = cheerio.load(body);
    user["name"] = $("span.name").text();
    user["location"] = $("span.location").attr('title');
    var followDiv = $("div.zm-profile-side-following > a > strong");
    var followList = serialize($, followDiv);
    user["following"] = followList[0];
    user["followers"] = followList[1];
    var userStatsDiv = $("div.profile-navbar > a.item > span.num");
    var userStatsList = serialize($, userStatsDiv);
    user["questions"] = userStatsList[0];
    user["answers"] = userStatsList[1];
    user["essays"] = userStatsList[2];
    user["bookmarks"] = userStatsList[3];
    user["edits"] = userStatsList[4];
    user["profile_views"] = $("div.zm-side-section-inner > span > strong").text(); 
 
    console.log(user);
    http.createServer(function(request, response) {
      response.writeHead(200, {"Content-Type": "application/json"});
      response.write(JSON.stringify(user, undefined, 2));
      response.end();
    }).listen(8888);
}

function serialize($, object) {
    var list = [];
    object.each(function() {
        list.push($(this).text());
    });
    return list;
}
