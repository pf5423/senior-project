const question = document.querySelector("#question");
const nextbtn = document.querySelector(".nextBtn");
const choices = Array.from(document.getElementsByClassName("answerText"));
const choiceContainers = Array.from(document.getElementsByClassName("choice-container"));
const texts = document.querySelectorAll(".answerText");
const progressText = document.getElementById("progressText");
const progressbarfull = document.getElementById("progressbarfull");
const game = document.getElementById("game");
const hud = document.getElementById("hud");
const message  = document.getElementById("gameMessage");

let currentQuestion = {};
let acceptingQuestion = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

let fileName = "questions.json";
console.log(fileName)
fetch(fileName)
  .then((res) => {
    return res.json();
  })
  .then((returned) => {
    questions = returned;
    startGame();
  })
  .catch((err) => {
    console.log(err);
  });

const correctplus = 2;
const maxQuestions = 5;

let getNewQuestion = () => {
  questionCounter++;
  progressText.innerText = `Question: ${questionCounter}/${maxQuestions}`;

  progressbarfull.style.width = `${(questionCounter / maxQuestions) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;
  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
    choice.disabled = false;
  });
  availableQuestions.splice(questionIndex, 1);
  acceptingQuestion = true;
  nextbtn.disabled = true;
  nextbtn.classList.add("btn-disabled");
  choices.forEach((choice) => {
    choice.parentElement.classList.remove("correct");
    choice.parentElement.classList.remove("wrong");
    choice.parentElement.classList.remove("disabled");
  });
};

let startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
  message.classList.add("hidden");
  game.classList.remove("hidden");
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    answerChoice(e);
    nextbtn.disabled = false;
    nextbtn.classList.remove("btn-disabled");
  });
});

let answerChoice = (click) => {
  let selectedChoice = click.target;
  let correctChoice = document.querySelector(`#one${currentQuestion.answer}`);
  let selectedAnswer = selectedChoice.dataset.number;
  let Correct =
    selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
  choices.forEach((choice) => {
    choice.parentElement.classList.add("disabled");
    choice.disabled = true;
  });
  if (Correct === "correct") {
    incrementScore(correctplus);
    selectedChoice.parentElement.classList.add("correct");
  } else if (Correct === "incorrect") {
    selectedChoice.parentElement.classList.add("wrong");
    correctChoice.parentElement.classList.add("correct");
  }
};



nextbtn.addEventListener("click", () => {
  if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
    if (score == 10) {
      message.textContent = "Congratulations! You're a data expert!";
    }
    else if (score > 0) {
      message.textContent = "Good job! Let's do some review and score even higher!";
    }
    else {
      message.textContent = "Oh no! You definitely didn't study! Try again!";
    }
    message.classList.remove("hidden");
    nextbtn.textContent = "Restart";
    nextbtn.addEventListener("click", () => {
      location.reload();
    });
  } else {
    getNewQuestion();
  }
});

let incrementScore = (num) => {
  score += num;
};
