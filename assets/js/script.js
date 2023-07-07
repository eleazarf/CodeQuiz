// Initial variables
//startbutton and next button variables
var startBt = document.getElementById("start-btn");
var nextBt = document.getElementById("next-btn");

//variables related to countdown timer
var timerID;
var timer = document.getElementById("timer");
var timeLeft = 76; // time left is the time for each question
var timerEl = document.getElementById("timer"); //timer element selects timer section from DOM

//Variables for question container
var startContainerEl = document.getElementById("start-container");
var questionContainerEl = document.getElementById("question-container");
var checkAnswerEl = document.getElementById("check-answer");
var answerButtonsEl = document.getElementById("answer-buttons");
var questionEl = document.getElementById("question");

//Variables related to scores
var scores = JSON.parse(localStorage.getItem("scores")) || [];
var viewHighScores = document.getElementById("highscores-link");
var restartButton = document.getElementById("restart-btn");
var submitButton = document.getElementById("submit-btn");
var clearScoreButton = document.getElementById("clear-btn");

// This is the count down timer function
function countDown() {
    timerEl.textContent = "Time: " + --timeLeft;
    if (timeLeft <= 0) {
        saveScore();
    }
}

// This is the Start button which trigger the first question and next button to display
startBt.addEventListener("click", startGame);
nextBt.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
});



// this is the Start Quiz function
function startGame() {
    timerID = setInterval(countDown, 1000);
    startContainerEl.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerEl.classList.remove("hide");

    // Timer will start as soon as start button is clicked
    countDown();
    setNextQuestion();
};

// saveScore function saves the score once time is up or question is answered, uses a local store variable
function saveScore() {
    clearInterval(timerID);
    timerEl.textContent = "Time: " + timeLeft;
    setTimeout(function () {
        localStorage.setItem("scores", JSON.stringify(scores));
        questionContainerEl.classList.add("hide");
        document.getElementById("score-container").classList.remove("hide");
        document.getElementById("your-score").textContent = "Your final score is " + timeLeft;
    }, 2000)
};

// Function to go to next question
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
};

// Reset state function used to reset 
function resetState() {
    clearStatusClass(document.body)
    nextBt.classList.add("hide")
    checkAnswerEl.classList.add("hide")
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild
            (answerButtonsEl.firstChild)
    }
};

// Display questions into container
function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsEl.appendChild(button)
    })
};

// function used to select answer 
function selectAnswer(e) {
    var selectedButton = e.target;
    var correct = selectedButton.dataset.correct;
    checkAnswerEl.classList.remove("hide")
    // Checking if the answer correct or wrong then show feedback
    if (correct) {
        checkAnswerEl.innerHTML = "That's correct!";
    } else {
        checkAnswerEl.innerHTML = "Incorrect, please give it another shot.";
        if (timeLeft <= 10) {
            timeLeft = 0;
        } else {
            // If the aswer is wrong, deduct time by 10
            timeLeft -= 10;
        }
    }

    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextBt.classList.remove("hide")
        checkAnswerEl.classList.remove("hide")
    } else {
        startBt.classList.remove("hide")
        saveScore();
    }
};

// Function to check and show the correct answer, changing buttons colors
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
};

// Function to remove all the classes
function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
};

// adding View high scores link listener
viewHighScores.addEventListener("click", showHighScores);
submitButton.addEventListener("click", function (event) {
    event.preventDefault()
    var initials = document.querySelector("#initials-field").value;
    showHighScores(initials);
});

// Restart button for scores
restartButton.addEventListener("click", function () {
    window.location.reload();
});

// function to show high scores
function showHighScores(initials) {
    document.getElementById("highscores").classList.remove("hide")
    document.getElementById("score-container").classList.add("hide");
    startContainerEl.classList.add("hide");
    questionContainerEl.classList.add("hide");
    if (typeof initials == "string") {
        var score = {
            initials, timeLeft
        }
        scores.push(score)
    }

    var highScoreEl = document.getElementById("highscore");
    highScoreEl.innerHTML = "";
    for (i = 0; i < scores.length; i++) {
        var div1 = document.createElement("div");
        div1.setAttribute("class", "name-div");
        div1.innerText = scores[i].initials;
        var div2 = document.createElement("div");
        div2.setAttribute("class", "score-div");
        div2.innerText = scores[i].timeLeft;

        highScoreEl.appendChild(div1);
        highScoreEl.appendChild(div2);
    }

    localStorage.setItem("scores", JSON.stringify(scores));

};

// function to load scores from local storage
var loadScores = function () {
    // Get score from local storage
    if (!savedScores) {
        return false;
    }
    // Convert scores into array
    savedScores = JSON.parse(savedScores);
    var initials = document.querySelector("#initials-field").value;
    var newScore = {
        score: timeLeft,
        initials: initials
    }
    savedScores.push(newScore);
    savedScores.forEach(score => {
        initialsField.innerText = score.initials
        scoreField.innerText = score.score
    })
};

// Function to show high scores
function showHighScores(initials) {
    document.getElementById("highscores").classList.remove("hide")
    document.getElementById("score-container").classList.add("hide");
    startContainerEl.classList.add("hide");
    questionContainerEl.classList.add("hide");
    if (typeof initials == "string") {
        var score = {
            initials, timeLeft
        }
        scores.push(score)
    }

    var highScoreEl = document.getElementById("highscore");
    highScoreEl.innerHTML = "";
    for (i = 0; i < scores.length; i++) {
        var div1 = document.createElement("div");
        div1.setAttribute("class", "name-div");
        div1.innerText = scores[i].initials;
        var div2 = document.createElement("div");
        div2.setAttribute("class", "score-div");
        div2.innerText = scores[i].timeLeft;

        highScoreEl.appendChild(div1);
        highScoreEl.appendChild(div2);
    }

    localStorage.setItem("scores", JSON.stringify(scores));

};

// this function clears local storage score items 
clearScoreButton.addEventListener("click", function () {
    localStorage.clear();
    document.getElementById("highscore").innerHTML = "";
});