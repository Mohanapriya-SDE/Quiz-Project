const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById("progressBarFull");


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'Which class indicates a dropdown menu?',
        choice1: '.dropdown-list',
        choice2: '.dropdown-toggle',
        choice3: '.dropdown',
        choice4: '.select',
        answer: 3,
    },
    {
        question: 'A standard navigation tab is created with:',
        choice1: '<ul class="nav tabs">',
        choice2: '<ul class="navigation-tabs">',
        choice3: '<ul class="nav nav-navbar">',
        choice4: '<ul class="nav nav-tabs">',
        answer: 3,
    },
    {
        question: 'A standard navigation bar is created with:',
        choice1: '<nav class="navbar default-navbar">',
        choice2: '<nav class="navbar navbar-default">',
        choice3: '<nav class="navigationbar navbar-default">',
        choice4: '<nav class="nav navbar">',
        answer: 2,
    },
    {
        question: 'Which class is used to create a black navigation bar?',
        choice1: '.navbar-black',
        choice2: '.navbar-default',
        choice3: '.navbar-dark',
        choice4: '.navbar-inverse',
        answer: 4,
    },
    {
        question: 'Which plugin is used to cycle through elements, like a slideshow?',
        choice1: 'orbit',
        choice2: 'slideshow',
        choice3: 'scrollspy',
        choice4: 'carousel',
        answer: 4,
    },
    {
        question: 'Which plugin is used to create a modal window?',
        choice1: 'Modal',
        choice2: 'Dialog Box',
        choice3: 'popup',
        choice4: 'Window',
        answer: 1,
    },
    {
        question: ' Which plugin is used to create a tooltip?',
        choice1: 'popup',
        choice2: 'DialogBox',
        choice3: 'Modal',
        choice4: 'Tooltip',
        answer: 4,
    },
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 7;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion =() => {

    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        //go to the end page
        return window.location.assign("/Users/Priya/Desktop/Quick%20Quiz/end.html");
      }
    
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        
        const classToApply =
             selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
             
             if (classToApply === "correct") {
                incrementScore(CORRECT_BONUS);
              }
        selectedChoice.parentElement.classList.add(classToApply);
        
        setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};


startGame();