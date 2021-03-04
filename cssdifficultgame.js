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
        question: 'How do you group selectors?',
        choice1: 'Seperate each selector with a plus sign',
        choice2: 'Seperate each selector with a space',
        choice3: 'Seperate each selector with a comma',
        choice4: 'Seperate each selector with a equal to',
        answer: 3,
    },
    {
        question: 'What is the default value of the position property?',
        choice1: 'relative',
        choice2: 'absolute',
        choice3: 'static',
        choice4: 'fixed',
        answer: 3,
    },
    {
        question: 'If we want define style for an unique element, then which css selector will we use ?',
        choice1: 'Id',
        choice2: 'class',
        choice3: 'text',
        choice4: 'name',
        answer: 1,
    },
    {
        question: 'If we dont want to allow a floating div to the left side of an element, which css property will we use ?',
        choice1: 'float',
        choice2: 'margin',
        choice3: 'clear',
        choice4: 'padding',
        answer: 3,
    },
    {
        question: 'Suppose we want to arragnge five nos. of DIVs so that DIV4 is placed above DIV1. Now, which css property will we use to control the order of stack?',
        choice1: 'd-index',
        choice2: 'x-index',
        choice3: 's-index',
        choice4: 'z-index',
        answer: 4,
    },
    {
        question: 'If we want to wrap a block of text around an image, which css property will we use ?',
        choice1: 'wrap',
        choice2: 'margin',
        choice3: 'float',
        choice4: 'align',
        answer: 3,
    },
    {
        question: 'If we want to show an Arrow as cursor, then which value we will use ?',
        choice1: 'pointer',
        choice2: 'arr',
        choice3: 'default',
        choice4: 'arrow',
        answer: 3,
    },
    {
        question: 'If we want to use a nice looking green dotted border around an image, which css property will we use?',
        choice1: 'border-type',
        choice2: 'border-style',
        choice3: 'border-decoration',
        choice4: 'border-line',
        answer: 2,
    },
    {
        question: 'Which of the following properties will we use to display border around a cell without any content ??',
        choice1: 'empty-cell',
        choice2: 'nonempty-cell',
        choice3: 'blank cell',
        choice4: 'void-cell',
        answer: 1,
    },
    {
        question: 'What should be the table width, so that the width of a table adjust to the current width of the browser window?',
        choice1: '640px',
        choice2: 'full-screen',
        choice3: '1024px',
        choice4: '100%',
        answer: 4,
    },
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

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