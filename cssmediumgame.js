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
        question: 'How do you display hyperlinks without an underline?',
        choice1: 'a {text-decoration:none;}',
        choice2: 'a {text-decoration:no-underline;}',
        choice3: 'a {text-underline:none;}',
        choice4: 'a {decoration:no-underline;}',
        answer: 1,
    },
    {
        question: 'How do you make each word in a text start with a capital letter?',
        choice1: 'text-style:capitalize;',
        choice2: 'transform:capitalize;',
        choice3: 'text-transform:capitalize;',
        choice4: 'text-style:uppercase;',
        answer: 3,
    },
    {
        question: 'Which property is used to change the font of an element?',
        choice1: 'font-family',
        choice2: 'font-size',
        choice3: 'font-style',
        choice4: 'text-style',
        answer: 1,
    },
    {
        question: 'How do you make the text bold?',
        choice1: 'font-weight:bold;',
        choice2: 'font-style:bold;',
        choice3: 'font-size:bold;',
        choice4: 'style:bold;',
        answer: 1,
    },
    {
        question: 'How do you display a border like this: The top border = 10 pixels, The bottom border = 5 pixels, The left border = 20 pixels, The right border = 1pixel?',
        choice1: 'border-width:10px 1px 20px 5px;',
        choice2: 'border-width:10px 20px 1px 5px;',
        choice3: 'border-width:10px 5px 20px 1px;',
        choice4: 'border-width:20px 1px 10px 5px;',
        answer: 3,
    },
    {
        question: 'Which property is used to change the left margin of an element?',
        choice1: 'padding-left',
        choice2: 'margin-left',
        choice3: 'indent',
        choice4: 'both 1 and 2',
        answer: 2,
    },
    {
        question: 'How do you make a list that lists its items with squares?',
        choice1: 'list-type:square;',
        choice2: 'list-style-type:square;',
        choice3: 'list:square;',
        answer: 2,
    },
    {
        question: 'How do you select an element with id "demo"?',
        choice1: 'demo',
        choice2: '.demo',
        choice3: '#demo',
        choice4: '*demo',
        answer: 3,
    },
    {
        question: 'How do you select elements with class name "test"?',
        choice1: 'test',
        choice2: '.test',
        choice3: '#test',
        choice4: '*test',
        answer: 2,
    },
    {
        question: 'How do you select all p elements inside a div element?',
        choice1: 'div.p',
        choice2: 'div p',
        choice3: 'div + p',
        choice4: 'div-p',
        answer: 2,
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