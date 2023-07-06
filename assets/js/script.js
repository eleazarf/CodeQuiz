// Initial variables
//startbutton and next button variables
var startBt = document.getElementById("start-btn");
var nextBt = document.getElementById("next-btn");

var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");

var timerID;
var timer = document.getElementById("timer");
var timeLeft = 75; // time left is the time for each question
var timerEl = document.getElementById("timer"); //timer element selects timer section from DOM

//Variables for question containers
var startContainerEl = document.getElementById("start-container");

// This is the count down timer
function countDown() {
    timeLeft--;
    timerEl.textContent = "Time: " + timeLeft;
    if (timeLeft <= 0) {
        saveScore();
    }
}

// This is the Start button which trigger the first question and next button to display
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
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