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

//array of objects for questions, choices, and answer
var quizQuestions = [
    {
        question: "Commonly used data types DO NOT include ____",
        choices: ["strings", "numbers", "alerts", "booleans"],
        answer: "alerts",
    },
    {
        question: "The condition in an if else statement is enclosed within _____",
        choices: ["parentheses", "quotes", "curly brackets", "square brackets"],
        answer: "curly brackets",
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        answer: "console.log",
    },
    {
        question: "String values must be enclosed within ______ when being assigned variables.",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes",
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choices: ["script", "scripting", "js", "javascript"],
        answer: "script",
    },
    {
        question: "How do you create a function in JavaScript?",
        choices: ["function: myFunction()", "function myFunction()", "function= myFunction()", "myFunction = function()"],
        answer: "function myFunction()",
    }
];

//20 seconds per question
var secondsLeft = quizQuestions.length * 20;

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
    question.textContent = quizQuestions[q].question;
    choiceOne.textContent = quizQuestions[q].choices[0];
    choiceTwo.textContent = quizQuestions[q].choices[1];
    choiceThree.textContent = quizQuestions[q].choices[2];
    choiceFour.textContent = quizQuestions[q].choices[3];
    }
}
   //check user selection against correct answer
choiceList.addEventListener('click', function (event) {
    var correctAnswer = quizQuestions[q].answer;
    var userAnswer = (event.target);
    console.log(userAnswer.innerHTML);
    console.log(correctAnswer);
    var resultMessage = document.createElement("h2");
    if (userAnswer.innerHTML === correctAnswer) {
        resultMessage.textContent = "Correct!";
        choiceList.appendChild(resultMessage);
        setTimeout(function () {
            resultMessage.textContent= " ";
            q++
            showQuestions();
        }, 2000);
    } else {
        resultMessage.textContent = "Wrong!";
        choiceList.appendChild(resultMessage);
        setTimeout(function () {
            resultMessage.textContent= " ";
            q++
            showQuestions();
            secondsLeft = secondsLeft -15;
        }, 2000);
    }
    clearInterval();
})

//score/timer count down
function score() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timer.textContent = "Score: " + secondsLeft;

        if (secondsLeft === 0) {
            gameOver();
            clearInterval(timerInterval);
        }

    }, 1000);
};

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
})

//hides start div, shows questions and answer choices div
startBtn.addEventListener('click', function () {
    startContainer.classList.add("d-none");
    quizContainer.classList.remove("d-none");
    showQuestions();
    score();
})
