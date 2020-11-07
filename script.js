var startBtn = document.querySelector("#start-quiz-btn");
var startContainer = document.querySelector("#start-container");
var quizContainer = document.querySelector("#quiz-container");
var gameOverContainer = document.querySelector("#game-over-container");
var askQuestion = document.querySelector("#question");
var choiceOne = document.querySelector("#li1");
var choiceTwo = document.querySelector("#li2");
var choiceThree = document.querySelector("#li3");
var choiceFour = document.querySelector("#li4");
var question = document.querySelector("#question");
var userInitials = document.querySelector("#initials");
var userSubmitBtn = document.querySelector("#userSubmit");
var timer = document.querySelector("#timer");
var choiceList = document.querySelector("#choice-list");
var userAnswer;
var correctAnswer;
var timePenalty = 10;
var q = 0;
var highScore = [];

//quiz questions array with answers and correct answer index
function getStoredScores() {
    var storedScores = JSON.parse(localStorage.getItem("scores"));
    if (storedScores !== null) {
        highScore = storedScores;
    }
}
var quizQuestions = [
    {
        question: "Commonly used data types DO NOT include ____",
        choices: ["stings", "numbers", "alerts", "booleans"],
        answerIndex: "alerts",
    },
    {
        question: "The condition in an if else statement is enclosed within _____",
        choices: ["parentheses", "quotes", "curly brackets", "square brackets"],
        answerIndex: "curly brackets",
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        answerIndex: "console.log",
    },
    {
        question: "String values must be enclosed withing ______ when being assigned variables.",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answerIndex: "quotes",
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choices: ["script", "scripting", "js", "javascript"],
        answerIndex: "script",
    },
    {
        question: "How do you create a function in JavaScript?",
        choices: ["function: myFunction()", "function myFunction()", "function= myFunction()", "myFunction = function()"],
        answerIndex: "function myFunction()",
    }
];

var secondsLeft = quizQuestions.length * 10;

function gameOver() {
    quizContainer.classList.add("d-none");
    gameOverContainer.classList.remove("d-none");

}
//running through questions, loops as you click answers, when all questinos complete or time is out, 
//hides question container and shows game over container
function showQuestions() {
    if (q >= quizQuestions.length) {
        gameOver();
    } else {
    var correctAnswer = quizQuestions[q].answerIndex;
    question.textContent = quizQuestions[q].question;
    choiceOne.textContent = quizQuestions[q].choices[0];
    choiceTwo.textContent = quizQuestions[q].choices[1];
    choiceThree.textContent = quizQuestions[q].choices[2];
    choiceFour.textContent = quizQuestions[q].choices[3];
    return correctAnswer;
}
// to move on to next question
function nextquestion() {
    q++;
    var correctAnswer = quizQuestions[q].answerIndex;
    question.textContent = quizQuestions[q].question;
    choiceOne.textContent = quizQuestions[q].choices[0];
    choiceTwo.textContent = quizQuestions[q].choices[1];
    choiceThree.textContent = quizQuestions[q].choices[2];
    choiceFour.textContent = quizQuestions[q].choices[3];
    return correctAnswer;
    }
}

//score/timer count down
function score() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timer.textContent = "Score: " + secondsLeft;

        if (secondsLeft === 0) {
            gameOver();
        }

    }, 1000);
};
//check user selection against correct answer
choiceList.addEventListener('click', function (event) {
    event.preventDefault();
    var userAnswer = (event.target);

    if (userAnswer.innerHTML === correctAnswer) {
        setTimeout(correctAnswerResponse, 2000);
        q++
        showQuestions();
    } else {
        setTimeout(wrongAnswerResponse, 2000);
        q++
        showQuestions();

    }
    return userAnswer;
    gameOver();
}),

//user submits initials and saves high score & initials to local storage
userSubmitBtn.addEventListener('click', function (event) {
    event.preventDefault();
    getStoredScores();
    if (userInitials.value !== " ") {
        var thisGame = {
            initials: userInitials.value.trim(),
            score: secondsLeft
            
        }
        highScore.push(thisGame);
        localStorage.setItem('scores', JSON.stringify(highScore));
        window.location = "highscore.html";
    } else {
        alert("Please enter initials");
    }
});

function correctAnswerResponse(event) {
    function playSound() {
        var a = new Audio(Assets/week7-brrring.mp3);
        a.play();
    }
}

function wrongAnswerResponse(event) {
    function playSound() {
        var a = new Audio(Assets/week7-bounce.mp3);
        a.play();
    }
}

//hides start div, shows questions and answer choices div
startBtn.addEventListener('click', function () {
    startContainer.classList.add("d-none");
    quizContainer.classList.remove("d-none");
    showQuestions();
    score();
});