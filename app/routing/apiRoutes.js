var friendsData = require("../data/friends");


module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
      });
      
    app.post("/api/friends", function(req, res) {
      var newSurvey = req.body;
      var currentLowScore = Number.MAX_SAFE_INTEGER;
      var bestMatch = null;
        friendsData.forEach((friend) => {
          var scoreTotal = 0;
          friend.scores.forEach((score, index) => {
            scoreTotal += Math.abs(score - newSurvey.scores[index]);
          })
          if (scoreTotal < currentLowScore) {
            currentLowScore = scoreTotal;
            bestMatch = friend;
          }
        })
        friendsData.push(newSurvey);
        res.json(
            {name: bestMatch.name,
            photo: bestMatch.photo}
        );
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    // if (tableData.length < 5) {
    //     tableData.push(req.body);
    //     res.json(true); 
    // }
    // else {
    //     waitListData.push(req.body);
    //     res.json(false);
    // }
    });

    app.post("/api/clear", function(req, res) {
        // Empty out the arrays of data while working on getting functiionality working
        friendsData.length = [];
    
        res.json({ ok: true });
      });
    };