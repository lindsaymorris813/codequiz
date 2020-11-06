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


//quiz questions array with answers and correct answer index
var quizQuestions = [
    {
        question: "Commonly used data types DO NOT include ____",
        choices: ["stings", "numbers", "alerts", "booleans"],
        answerIndex: 3,
    },
    {
        question: "The condition in an if else statement is enclosed within _____",
        choices: ["parentheses", "quotes", "curly brackets", "square brackets"],
        answerIndex: 3,
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        answerIndex: 4,
    },
    {
        question: "String values must be enclosed withing ______ when being assigned variables.",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answerIndex: 3,
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choices: ["script", "scripting", "js", "javascript"],
        answerIndex: 1,
    },
    {
        question: "How do you create a function in JavaScript?",
        choices: ["function: myFunction()", "function myFunction()", "function= myFunction()", "myFunction = function()"],
        answerIndex: 2,
    }
];

var secondsLeft = quizQuestions.length * 10;

//hides start div, shows questions and answer choices div
startBtn.addEventListener('click', function () {
    startContainer.classList.add("d-none");
    quizContainer.classList.remove("d-none");
    runQuestions();
    score();
});
//running through questions, loops as you click answers, when all questinos complete or time is out, 
//hides question container and shows game over container
function runQuestions() {
    quizContainer.addEventListener('click', function (event) {
        for (var i = 1; i < quizQuestions.length; i++);
        if (event.target.parentElement.id.innerHTML === quizQuestions[i].answerIndex) {
            
            question.textContent = quizQuestions[i].question;
            choiceOne.textContent = quizQuestions[i].choices[0];
            choiceTwo.textContent = quizQuestions[i].choices[1];
            choiceThree.textContent = quizQuestions[i].choices[2];
            choiceFour.textContent = quizQuestions[i].choices[3];
        }
    })
}
//score/timer count down
function score() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timer.textContent = "Score: " + secondsLeft;

        if (secondsLeft === 0) {
            quizContainer.classList.add("d-none");
            gameOverContainer.classList.remove("d-none");
        }

    }, 1000);
}


//user submits initials and saves high score & initials to local storage
userSubmitBtn.addEventListener('click', function (event) {
    event.preventDefault();
    if (userInitials.innerHTML !== null) {
        var highScore = {
            intials: userInitials,
            score: secondsLeft
        };

        localStorage.setItem('scores', JSON.stringify(highScore));
        window.location = "highscore.html";
    }

});
