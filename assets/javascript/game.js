var charChoices = {

  "obi": {
    name: "Obi-Wan Kenobi",
    base: 2,
    newBase: 0,
    hp: 100,
    countAttk: 6
  },

  "luke": {
    name: "Luke Skywalker",
    base: 3,
    newBase: 0,
    hp: 100,
    countAttk: 7
  },

  "vader": {
    name: "Darth Vader",
    base: 25,
    newBase: 0,
    hp: 100,
    countAttk: 10
  },

  "jarjar": {
    name: "Darth Jar Jar Binks",
    base: 20,
    newBase: 0,
    hp: 100,
    countAttk: 15
  }

};

//chosenEnemies is just referencing the original object
var chosenEnemies = {};
var playerLock = false;
var enemyLock = false;
var defenderLock = false;
var lockedPlayer;
var defendingChar;
var deaths = 0;

$(document).ready(function () {

  $(".player").on("click", function () {
    if (playerLock === false) {
      var usrChoice = $(this).val();
      lockedPlayer = usrChoice;
      getPlaya(usrChoice, charChoices);
      playerLock = true;
    }
  });

  $(document).on("click", ".enemy", function () {
    // console.log(playerLock + " playerlock " + enemyLock + " enemyLock");
    if (playerLock === true && enemyLock === false) {
      var enChoice = $(this).val();
      defendingChar = enChoice;
      getPlaya(enChoice, chosenEnemies);
      enemyLock = true;
    }
  });

  $("#attack").on("click", function () {
    attackMode();
    updateVisuals();
  });

  //end of doc.rdy  
});

function getPlaya(playa, playerChoice) {
  Object.getOwnPropertyNames(playerChoice).forEach(key => {
    var value = playerChoice[key];
    if (playa !== key && playerLock === false) {
      var dudeID = "#" + key;
      createEnemies(key, value);
      $(dudeID).hide();
    } else if (playa === key && playerLock === true) {
      var hidEnemy = "." + playa;
      defender(key, value);
      $(hidEnemy).hide();
    }
  });
}

function createEnemies(enemyName, info) {
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
    role: "progressbar",
    style: "width: 100%",
    'aria-valuenow': info.hp,
    'aria-valuemin': "0",
    'aria-valuemax': info.hp
  });

  hpSpan.addClass(classSpanID);
  hpSpan.text(info.hp);

  $("#enemyChar").append(enemyButton);
  $("." + enemyName).append(namePlate).append(progressDiv);
  $("." + classProgressID).append(progressBarDiv);
  $("." + iHateMyLifeID).append(hpSpan);
  chosenEnemies[enemyName] = info;
}


function defender(defenderName, info) {
  // console.log(defenderName + " defender name " + info + " info");
  var defenderButton = $("<button>");
  var namePlate = $("<h5>");
  var progressDiv = $("<div>");
  var progressBarDiv = $("<div>");
  var hpSpan = $("<span>");
  var btnDefenderID = "d" + defenderName;
  var classProgressID = "defenderProgress" + defenderName;
  var iHateMyLifeID = "killDefenderNow" + defenderName;
  var classSpanID = defenderName + "defenderHP";

  defenderButton.addClass("defender btn btn-success");
  defenderButton.addClass(btnDefenderID);
  defenderButton.attr({
    value: defenderName,
    countAttk: info.countAttk
  });

  namePlate.addClass("card-title");
  namePlate.text(info.name);

  progressDiv.addClass("progress" + " " + classProgressID);
  progressBarDiv.addClass("progress-bar bg-warning" + " " + iHateMyLifeID);
  progressBarDiv.attr({
    role: "progressbar",
    style: "width: 100%",
    'aria-valuenow': info.hp,
    'aria-valuemin': "0",
    'aria-valuemax': info.hp
  });

  hpSpan.addClass(classSpanID);
  hpSpan.text(info.hp);

  $("#defender").append(defenderButton);
  $("." + btnDefenderID).append(namePlate).append(progressDiv);
  $("." + classProgressID).append(progressBarDiv);
  $("." + iHateMyLifeID).append(hpSpan);
  defenderLock = true;
  $("#attack").show();
}

function attackMode() {

  //player base attack increase
  charChoices[lockedPlayer].newBase += charChoices[lockedPlayer].base;
  //player hp changing
  charChoices[lockedPlayer].hp -= chosenEnemies[defendingChar].countAttk;
  //changing defending chars hp
  chosenEnemies[defendingChar].hp -= charChoices[lockedPlayer].newBase;

  //if hp becomes negative automatically set it to 0;
  if (charChoices[lockedPlayer].hp <= 0) {
    charChoices[lockedPlayer].hp = 0;
    resetGame();
  } else if (chosenEnemies[defendingChar].hp <= 0) {
    chosenEnemies[defendingChar].hp = 0;
    $("#defender").empty();
    $("#attack").hide();
    enemyLock = false;
    if (++deaths === 3) {
      resetGame();
    }
  }
}

//some funky visual updates not working, weird errors with jarjar...dammit jarjar
function updateVisuals() {

  //update player visuals
  $("." + lockedPlayer + "Progress").attr("style", "width: " + charChoices[lockedPlayer].hp + "%");
  $("." + lockedPlayer + "HP").text(charChoices[lockedPlayer].hp);

  //update defending visuals
  $(".killDefenderNow" + defendingChar).attr("style", "width: " + chosenEnemies[defendingChar].hp + "%");

  // because the span tag was dynamically created i couldn't change the text. haven't figured out how to change the text
  $("." + defendingChar + "defenderHP").text(charChoices[defendingChar.hp]);
}

function resetGame() {
  charChoices = {

    "obi": {
      name: "Obi-Wan Kenobi",
      base: 2,
      newBase: 0,
      hp: 100,
      countAttk: 6
    },

    "luke": {
      name: "Luke Skywalker",
      base: 3,
      newBase: 0,
      hp: 100,
      countAttk: 7
    },

    "vader": {
      name: "Darth Vader",
      base: 25,
      newBase: 0,
      hp: 100,
      countAttk: 10
    },

    "jarjar": {
      name: "Darth Jar Jar Binks",
      base: 20,
      newBase: 0,
      hp: 100,
      countAttk: 15
    }

  };
  $(".player").show();
  $("#enemyChar").empty();
  $("#defender").empty();
  $("#attack").hide();

  deaths = 0;
  playerLock = false;
  enemyLock = false;
  defenderLock = false;
}