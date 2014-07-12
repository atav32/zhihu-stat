/*
 * Serve JSON to our AngularJS client
 */
var request = require("request");
var cheerio = require("cheerio");

exports.zhihuUser = function (req, res) {
  var username = req.query.username;
  var requestUrl = "http://www.zhihu.com/search?q={}&type=people".format(username)
  console.log(requestUrl)
  request({ uri: requestUrl }, parseUserSearchPage);

  function parseUserSearchPage(error, response, body) {
    console.log("parseZhihuUser");
    var users = []
    $ = cheerio.load(body);
    $("div.user").each(parseZhihuUser)
 
    res.json(users);

    function parseZhihuUser() {
        var user = {}
        user["name"] = $("a.user-name", this).text();
        user["bio"] = $("div.user-bio", this).text();
        user["answers"] = extractNumber($("a.answer", this).text());
        user["followers"] = extractNumber($("a.follow", this).text());
        user["profileUrl"] = "http://www.zhihu.com" + $("a.user-name", this).attr("href");
        users.push(user)
    }
  }

  function extractNumber(string) {
      return string.replace(/[^0-9]/g, '');
  }

  function serialize($, object) {
    var list = [];
    object.each(function() {
        list.push($(this).text());
    });
    return list;
  }
};
