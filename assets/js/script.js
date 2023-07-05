// Initial variables
var timerID;
var timer = document.getElementById("timer");
var startBt = document.getElementById("start-btn");
var nextBt = document.getElementById("next-btn");

startBt.addEventListener("click", initQuiz);

// init quiz
function initQuiz() {
    timerID = setInterval(timeC, 1000);
    startContainerEl.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    QuestionIn = 0
    questionContainerEl.classList.remove("hide");

    // Timer will start as soon as start button is clicked
    timeC();
    NextQ();
};

// Countdown timer
function timeC() {
    timeL--;
    timer.textContent = "Time: " + timeL;
    if (timeL <= 0) {
        saveSc();
    }
}

