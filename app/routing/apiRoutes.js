var friendsData = require("../data/friends");


module.exports = function (app) {
  app.get("/api/friends", function (req, res) {
    res.json(friendsData);
  });

  app.post("/api/friends", function (req, res) {
    var newSurvey = req.body; //for cleaner code crunching
    var currentLowScore = Number.MAX_SAFE_INTEGER; //start off with the least possible match score, then find closer matches as we compare
    var bestMatch = null; //save the object that holds the best friend match as we compare
    friendsData.forEach((friend) => {  // compare new survey entry agains each currenly stored friend
      var scoreTotal = 0; //variable to hold the tally of the differences between survey scores
      friend.scores.forEach((score, index) => { //compare score index against score index
        scoreTotal += Math.abs(score - newSurvey.scores[index]); //calculate difrences and convert to positive number (no negatives)
      })
      if (scoreTotal < currentLowScore) { //if the tally of this friend is lower than the tally of the currently stored friend (or the safe number)
        currentLowScore = scoreTotal;
        bestMatch = friend; //then this becomes the best match!
      }
    })
    friendsData.push(newSurvey); //finally add the new survey entry data to the api/data array
    res.json( //send this data back to the survey html page and pop up in modal
      {
        name: bestMatch.name,
        photo: bestMatch.photo
      }
    );
  });

};