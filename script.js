
const questions = [
    {
        question: "What is the capital of France?",
        choices: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Earth", "Mars", "Venus", "Jupiter"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the largest mammal in the world?",
        choices: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correctAnswer: "Blue Whale"
    },
    {
        question:"Who is the first Woman president of India?",
        choices :["Prathibha Devisingh Patil","Indira Priyadarshini Gandhi ","Droupadi Murmu","Sushma Swaraj"],
        correctAnswer:"Prathibha Devisingh Patil"
    },
    {
        question:"What is the value of π (pi) rounded to two decimal places?",
        choices :["3.11","3.15","3.16","3.14"],
        correctAnswer:"3.14"
    }
];


let currentQuestion = 0;
let score = 0;
let timeLeft = 10; // Set the initial time in seconds for each question
let timerInterval; // Variable to store the timer interval

const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const resultElement = document.getElementById("result");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");
const timerDisplay = document.getElementById("time-display");

function displayQuestion() {
    timeLeft = 10; // Reset the timer for each question
    clearInterval(timerInterval); // Clear any previous intervals

    timerInterval = setInterval(updateTimer, 800); // Start the timer interval

    const question = questions[currentQuestion];
    questionElement.textContent = question.question;
    choicesElement.innerHTML = "";

    question.choices.forEach(choice => {
        const li = document.createElement("li");
        li.textContent = choice;
        li.addEventListener("click", () => checkAnswer(choice));
        choicesElement.appendChild(li);
    });
}

function updateTimer() {
    timerDisplay.textContent = timeLeft + "s";

    if (timeLeft === 0) {
         // Stop the timer
        checkAnswer(""); // Automatically check the answer when time runs out
    } else {
        timeLeft--;
    }
}
function checkAnswer(choice) {
    const question = questions[currentQuestion];

    if (choice === question.correctAnswer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        showResult();
    }
}

function resetTimer() {
    timeLeft = 10; // Reset the timer to the initial time (e.g., 10 seconds)
    clearInterval(timerInterval); // Clear any previous intervals
    timerInterval = setInterval(updateTimer, 800); // Start the timer interval again
    
}

function showResult() {
    questionContainer.style.display = "none";
    nextButton.style.display = "none";
    restartButton.style.display = "block"; // Show the Restart button
    resultElement.textContent = `You scored ${score} out of ${questions.length}!`;
    resultElement.style.display = "block";
    timer.style.display = "none";
    resetTimer();
   
}

nextButton.addEventListener("click", () => {
    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        showResult();
    }
});

restartButton.addEventListener("click",() => {
    currentQuestion = 0;
    score = 0;
    questionContainer.style.display = "block";
    resultElement.style.display = "none";
    nextButton.style.display = "block"; // Show the Next button
    restartButton.style.display = "none"; // Hide the Restart button
    timer.style.display = "block";
    resetTimer();

});
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
shuffleArray(questions);

// Initial question display
displayQuestion();




