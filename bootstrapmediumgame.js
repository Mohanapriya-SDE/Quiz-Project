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
        question: 'Which button class is used to create a large button?',
        choice1: '.btn-l',
        choice2: '.btn-xl',
        choice3: '.btn-lg',
        choice4: '.btn-large',
        answer: 3,
    },
    {
        question: 'Which class is used to create a button group?',
        choice1: '.btn-group',
        choice2: '.group-btn',
        choice3: '.button-grp',
        choice4: '.button-group',
        answer: 1,
    },
    {
        question: 'How can you insert a search icon?',
        choice1: '<span class="glyph glyph-search"></span>',
        choice2: '<span class=" glyphicon-search"></span>',
        choice3: '<span class="glyph-search"></span>',
        choice4: '<span class="glyphicon glyphicon-search"></span>',
        answer: 4,
    },
    {
        question: 'Which class is used to create a badge?',
        choice1: '.badge',
        choice2: '.flag',
        choice3: '.tag',
        choice4: '.bg',
        answer: 1,
    },
    {
        question: 'Which class is used to create a basic pagination?',
        choice1: '.page',
        choice2: '.navigation',
        choice3: '.pagination',
        choice4: '.label',
        answer: 3,
    },
    {
        question: 'Which class is used to create a basic list group?',
        choice1: '.list-grp-item',
        choice2: '.grouped-list',
        choice3: '.list-group',
        choice4: '.grp-list',
        answer: 3,
    },
    {
        question: 'Which class adds a heading to a panel?',
        choice1: '.panel-head',
        choice2: '.panel-header',
        choice3: '.panel-footer',
        choice4: '.panel-heading',
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