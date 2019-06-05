var charChoices = {
  
  "obi": {
    name: "Obi-Wan Kenobi",
    base: 5,
    newBase: 0,
    hp: 100,
    countAttk: 10
  },
  
  "luke": {
    name: "Luke Skywalker",
    base: 5,
    newBase: 0,
    hp: 120,
    countAttk: 15
  },
  
  "vader": {
    name: "Darth Vader",
    base: 5,
    newBase: 0,
    hp: 140,
    countAttk: 20
  },
  
  "jarjar": {
    name: "Darth Jar Jar Binks",
    base: 5,
    newBase: 0,
    hp: 160,
    countAttk: 25
  }
  
};


$(document).ready(function () {

  $(".player").on("click", function () {
    var usrChoice = $(this).val();
    getPlaya(usrChoice);
    
  });

//end of doc.rdy  
});

function getPlaya(playa){
  Object.getOwnPropertyNames(charChoices).forEach(key => {
    var value;
    if (playa !== key) {
      value = charChoices[key];
      // console.log(value.base);
      var dudeID = "#" + key;
      createEnemies(key, value);
      $(dudeID).hide();
    }
  });
}

function createEnemies(enemyName, info){
  
  console.log(info.countAttk + " info's");
  var enemyButton = $("<button>");
  var namePlate = $("<h5>");
  var progressDiv = $("<div>");
  
  enemyButton.addClass("enemy " + " btn" + " btn-danger" + " " + enemyName);
  enemyButton.attr("value", enemyName);
  
  namePlate.addClass("card-title");
  namePlate.text(info.name);

  progressDiv.addClass("progress bar bg-primary");

  $("#enemyChar").append(enemyButton);
  $("." + enemyName).append(namePlate);
}