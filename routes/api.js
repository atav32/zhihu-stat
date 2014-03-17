/*
 * Serve JSON to our AngularJS client
 */
var request = require("request");
var cheerio = require("cheerio");

exports.zhihuUser = function (req, res) {
  var username = req.query.username;
  var user = {};
  request({ uri: "http://www.zhihu.com/people/"+username, }, parseZhihuUser);

  function parseZhihuUser(error, response, body) {
    console.log("parseZhihuUser");
    $ = cheerio.load(body);
    user["name"] = $("div.title-section > span.name").text();
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
    user["profileViews"] = $("div.zm-side-section-inner > span > strong").text(); 
 
    console.log(user);
    res.json(user);
  }

  function serialize($, object) {
    var list = [];
    object.each(function() {
        list.push($(this).text());
    });
    return list;
  }
};
