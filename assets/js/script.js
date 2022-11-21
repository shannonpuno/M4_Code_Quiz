//Write variables 
var start_Btn = document.getElementById(".start");
const scores_Btn = document.querySelector(".scores_Btn");
var quizBoxEl = document.querySelector("#quizBox")
var questionText = document.getElementById("question-text");
var choiceA = document.querySelector("#A");
var choiceB = document.querySelector("#B");
var choiceC = document.querySelector("#C");
var reactBtn = document.querySelectorAll(".optionsBtn");
var choicesText = document.getElementById("choices-text");
const timerCount = document.querySelector("#timer");
const userResults = document.getElementById("user-score");
const userName = document.getElementById("user-name");
var checkAns = document.getElementById("check-ans");
var HighscoresBox = document.getElementById("resultsBox");
var submitBtnEl = document.getElementById("submitBtn");
var highScoreListEl = document.getElementById("highscoreList");
var clearBtnEl = document.getElementById("clearBtn");

var questIndex = 0;
var currentQuest = 0;
var userScore = 0;
var totalTime = 45;




//Quiz questions Array
var quizQuestions = [

    {
        quest: "What does the Math.random() method do?",
        choices:["a. Rounds the number down to the nearest whole number", "b. Multiplies an array of selected objects","c. Generates a random number between 0 and 1"],
        correctAns: "c"
    },
    {
        quest: "What are the two values of a Boolean data type?",
        choices:["a. Yes and No","b. True and False","c. Correct and Incorrect"],
        correctAns: "b"
    },
    {
        quest: "Which options are Primitive Data Types?",
        choices: [ "a. String","b. bigint","c. null"],
        correctAns: "c"
    },
    {
        quest: "What are Arrays generally describes as?",
        choices: ["a. list-like objects", "b. A collection of only pseudonumbers","c. Undefined values"],
        correctAns: "a"
    },
    {
        quest: "What would 'console.log('Hello' + 'World'); print out as?",
        choices:[ "a. HELLOWORLD", "b. Hello World", "c. HelloWorld"],
        correctAns: "c"
    }
];

// After start button is clicked moves to the next div 
function nextDiv(beg, next) {
    document.getElementById(beg).classList.add("hide");
    document.getElementById(next).removeAttribute("class")
};

// Created function when start button is clicked 

function startQuiz() {
    
    questionText.style.display = "block";
    nextDiv("start", "quizBox");
    questIndex = 0;
    showQuest(questIndex);
    startTimer();
    

};

// Function Created to Display the Questions



function showQuest(x){
    questionText.textContent = quizQuestions[x].quest;
    choiceA.textContent = quizQuestions[x].choices[0];
    choiceB.textContent = quizQuestions[x].choices[1];
    choiceC.textContent = quizQuestions[x].choices[2];
    questIndex = x;
}



// Created function to check user answers 

function checkResponse(correctAns){
    correctAns.preventDefault();
    

    if (quizQuestions[questIndex].correctAns == correctAns.target.value) {
        checkAns.textContent = "Your Answer is Correct!";
        userScore = userScore + 4;

    } else {
        totalTime -= 5;
        timerCount.textContent = totalTime;
        checkAns.textContent = "Incorrect! The correct answer is: " +  quizQuestions[questIndex].correctAns;
    } 
    if(questIndex < quizQuestions.length -1){
        showQuest(questIndex +1);
    } else {
        endQuiz();
    }

}


// Created function to start Timer after Start Button is clicked


function startTimer(){
    var startClock = setInterval(function(){
        totalTime--;
        timerCount.textContent = totalTime;
        if (totalTime <= 0) {
            clearInterval(startClock);
            endQuiz();
        } else if (questIndex >= quizQuestions.length +1){
            clearInterval(startClock);
            endQuiz();
        }
    }, 1000);
}

// Function to store User Score in local storage
var i = 0;
function storeUserScore (event) {
    event.preventDefault();

    if (userName.value === ""){
        alert("Please enter your name for High Scores!")
        return;
    }

    var savedScores = localStorage.getItem("high scores");
    var scoresList;

    if (savedScores === null) {
        scoresList = [];
    } else {
        scoresList = JSON.parse(savedScores)
    }
    var userData = {
        name: userName.value,
        score: userScore

    };
    console.log(userData);
    scoresList.push(userData);

    var scoresListString = JSON.stringify(scoresList);
    window.localStorage.setItem("high scores", scoresListString);

    showHighScores();
}


//Function to Display High Score Board
var i = 0;
function showHighScores() {
    highScoreListEl.style.display = "block";

    var savedScores = localStorage.getItem("high scores");

    if (savedScores === null){
        return;
    }
    console.log(savedScores);

    var storedScores = JSON.parse(savedScores);

    for (; i < storedScores.length; i++) {
        var newScoreItems = document.createElement("p");
        newScoreItems.innerHTML = storedScores[i].name + " : " + storedScores[i].score;
        highScoreListEl.appendChild(newScoreItems);
    }
}

// Function for the end of Quiz showing User total score

function endQuiz() {
    quizBoxEl.style.display = "none";
    HighscoresBox.style.display = "block";
    console.log(HighscoresBox);

    userResults.textContent = userScore;
    timerCount.style.display = "none";
};

// Event Listers for Buttons
reactBtn.forEach(function(click){
    click.addEventListener("click",checkResponse);
});

start_Btn.addEventListener("click", startQuiz);
scoreResults.addEventListener("click", viewScores);

submitBtnEl.addEventListener("click", function(event) {
    storeUserScore(event);
});

function clearResults() {
clearBtnEl.addEventListener("click", function(){
    window.localStorage.removeItem("high scores");
    highScoreListEl.innerHTML = "Cleared All High Scores.";

})
};