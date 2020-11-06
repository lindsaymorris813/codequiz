// var firstPlace = document.querySelector("#liFirst");
// var secondPlace = document.querySelector("#liSecond");
// var thirdPlace = document.querySelector("liThird");
// var fourthPlace = document.querySelector("liFourth");
// var fifthPlace = document.querySelector("liFifth");
var clearScoresBtn = document.querySelector("#clear-high-scores");
var goBackBtn = document.querySelector("#go-back");
var highScoreList = document.querySelector("#high-score-list");

//pull high scores from local storage
var highScoresArray = JSON.parse(localStorage.getItem('scores'));

//add high scores to page
for (var i = 0; i < 5; i++) {
    var highScore = document.createElement("li");
    highScore.textContent= highScoreList[i];
    highScore.setAttribute("class", "list-group-item");
    highScoreList.appendChild(highScore);

};
//clear scores button
clearScoresBtn.addEventListener('click', function() {
    localStorage.clear();
});

//go back button restarts game
goBackBtn.addEventListener('click', function() {
    window.location = "index.html";
});
    
