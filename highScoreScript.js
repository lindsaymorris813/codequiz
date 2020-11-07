// var firstPlace = document.querySelector("#liFirst");
// var secondPlace = document.querySelector("#liSecond");
// var thirdPlace = document.querySelector("liThird");
// var fourthPlace = document.querySelector("liFourth");
// var fifthPlace = document.querySelector("liFifth");
var clearScoresBtn = document.querySelector("#clear-high-scores");
var goBackBtn = document.querySelector("#go-back");
var highScoreList = document.querySelector("#high-score-list");

//pull high scores from local storage
var highScoresArray = JSON.parse(localStorage.getItem("scores"));

//add high scores to page
function showTopScores() {
for (var i = 0; i < 5; i++) {
    if (highScoresArray.length !== null) {
    var highScore = document.createElement("li");
    highScore.textContent= "Initials: " + highScoresArray[i].initials + " --- Score: " + highScoresArray[i].score;
    highScore.setAttribute("class", "list-group-item");
    highScoreList.appendChild(highScore);
} else {
    return;
}
};
}

//clear scores button
clearScoresBtn.addEventListener('click', function() {
    localStorage.clear();
    var highScoresArray = JSON.parse(localStorage.getItem("scores"));
});

//go back button restarts game
goBackBtn.addEventListener('click', function() {
    window.location = "index.html";
});

showTopScores();