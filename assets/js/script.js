// Initial variables
//startbutton and next button variables
var startBt = document.getElementById("start-btn");
var nextBt = document.getElementById("next-btn");

//variables related to countdown timer
var timerID;
var timer = document.getElementById("timer");
var timeLeft = 75; // time left is the time for each question
var timerEl = document.getElementById("timer"); //timer element selects timer section from DOM


//Variables for question container
var startContainerEl = document.getElementById("start-container");
var questionContainerEl = document.getElementById("question-container");
var checkAnswerEl = document.getElementById("check-answer");
var answerButtonsEl = document.getElementById("answer-buttons");
var questionEl = document.getElementById("question");




//Question variables for quiz
var questions = [
    { 
        question: "How do you write 'Hello World' in an alert box?", 
        answers: [
            { text: "msg('Hello World')", correct: false },
            { text: "alert('Hello World')" , correct: true },
            { text: "prompt('Hello World')", correct: false },
            { text: "alertBox('Hello World')", correct: false }
        ]
    },
    { 
        question: "Which of the following function of Array object calls a function for each element in the array?", 
        answers: [
            { text: "concat()", correct: false },
            { text: "filter()", correct: false },
            { text: "forEach()", correct: true },
            { text: "split()", correct: false }
        ]
    },
    { 
        question: "How to write an IF statement for executing some code if 'i' is NOT equal to 8?", 
        answers: [
            { text: "if (i != 8)", correct: true },
            { text: "if i =! 8", correct: false },
            { text: "if (i <> 8)", correct: false },
            { text: "if (i !=== 8)", correct: false }
        ]
    },
    { 
        question: "What is the correct way to write a JavaScript array?", 
        answers: [
            { text: "var vegetable = (0:'kale', 1:'lettuce', 2:'spinach')", correct: false },
            { text: "var vegetable = ['kale', 'lettuce', 'spinach']", correct: true },
            { text: "var vegetable = (kale, lettuce, spinach)", correct: false },
            { text: "None of the above", correct: false }
        ]
    },
    { 
        question: "How do you round the number 102.456, to the nearest integer?",
        answers: [
            { text: "Math.random(102.456)", correct: false },
            { text: "Math.rnd(102.456)", correct: false },
            { text: "round(102.456)", correct: false },
            { text: "None of the above", correct: true }
        ]
    },
];

// This is the count down timer
function countDown() {
    timeLeft--;
    timerEl.textContent = "Time: " + timeLeft;
    if (timeLeft <= 0) {
        saveScore(); //goes to function to save score once time is up
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
        //localStorage.setItem("scores", JSON.stringify(scores));
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
    //clearStatusClass(document.body)
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