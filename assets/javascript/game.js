var charChoices = {
  
  "obi": {
    name: "Obi-Wan Kenobi",
    base: 35,
    newBase: 0,
    hp: 100,
    countAttk: 10
  },
  
  "luke": {
    name: "Luke Skywalker",
    base: 30,
    newBase: 0,
    hp: 120,
    countAttk: 15
  },
  
  "vader": {
    name: "Darth Vader",
    base: 25,
    newBase: 0,
    hp: 140,
    countAttk: 20
  },
  
  "jarjar": {
    name: "Darth Jar Jar Binks",
    base: 20,
    newBase: 0,
    hp: 160,
    countAttk: 25
  }
  
};

var chosenEnemies = {};
var playerLock = false;
var enemyLock = false;

$(document).ready(function () {
    
  $(".player").on("click", function () {
    if(playerLock === false){
      var usrChoice = $(this).val();
      getPlaya(usrChoice, charChoices);
      playerLock = true;
    }
  });

  $(document).on("click", ".enemy", function () {
    console.log(playerLock + " playerlock " + enemyLock + " enemyLock");
    if(playerLock === true && enemyLock === false){
      var enChoice = $(this).val();
      getPlaya(enChoice, chosenEnemies);
      enemyLock = true;
    }
  });

//end of doc.rdy  
});

function getPlaya(playa, playerChoice){
  Object.getOwnPropertyNames(playerChoice).forEach(key => {
    var value;
    if (playa !== key) {
      value = playerChoice[key];
      // console.log(value);
      if(playerLock === false && enemyLock === false){
        var dudeID = "#" + key;
        createEnemies(key, value);
        $(dudeID).hide();
      } else {
        defender(key, value);
      }
    } 
  });
}

function createEnemies(enemyName, info){
  var enemyButton = $("<button>");
  var namePlate = $("<h5>");
  var progressDiv = $("<div>");
  var progressBarDiv = $("<div>");
  var hpSpan = $("<span>");
  var classProgressID = "enemyProgress" + enemyName;
  var iHateMyLifeID = "killMeNow" + enemyName;
  var classSpanID = enemyName + "EnemyHP";

  enemyButton.addClass("enemy btn btn-danger");
  enemyButton.addClass(enemyName);
  enemyButton.attr("value", enemyName);
  
  namePlate.addClass("card-title");
  namePlate.text(info.name);

  progressDiv.addClass("progress" + " " + classProgressID);
  progressBarDiv.addClass("progress-bar bg-info" + " " + iHateMyLifeID);
  progressBarDiv.attr({
    role:"progressbar",
    style:"width: 100%",
    'aria-valuenow':info.hp,
    'aria-valuemin':"0",
    'aria-valuemax':info.hp
  });

  hpSpan.addClass(classSpanID);
  hpSpan.text(info.hp);

  $("#enemyChar").append(enemyButton);
  $("." + enemyName).append(namePlate).append(progressDiv);
  $("." + classProgressID).append(progressBarDiv);
  $("." + iHateMyLifeID).append(hpSpan);
  chosenEnemies[enemyName] = info;
}

function defender(defenderName, info){
  console.log(defenderName + " defender name " + info + " info");
}