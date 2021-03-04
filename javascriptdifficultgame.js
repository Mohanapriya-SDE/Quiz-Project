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
        question: "Which event occurs when the user clicks on an HTML element?",
        choice1: 'onmouseover',
        choice2: 'onchange',
        choice3: 'onclick',
        choice4: 'onmouseclick',
        answer: 3,
    },
    {
        question: 'How do you declare a JavaScript variable?',
        choice1: 'variable carName;',
        choice2: 'var carName;',
        choice3: 'V carName;',
        choice4: 'const carName;',
        answer: 2,
    },
    {
        question: 'Which operator is used to assign a value to a variable?',
        choice1: '=',
        choice2: '+',
        choice3: '*',
        choice4: '-',
        answer: 1,
    },
    {
        question: 'What will the following code return: Boolean(10 > 9)',
        choice1: 'NaN',
        choice2: 'false',
        choice3: 'true',
        answer: 3,
    },
    {
        question: 'Which of the following is the correct syntax to redirect a URL using JavaScript?',
        choice1: 'window.location ="https://www.quickquiz.com";',
        choice2: 'document.location ="https://www.quickquiz.com";',
        choice3: 'navigator.location ="https://www.quickquiz.com";',
        choice4: 'browser.location ="https://www.quickquiz.com";',
        answer: 1,
    },
    {
        question: 'Which array method sorts the elements of an array?',
        choice1: 'sort()',
        choice2: 'changeOrder(order)',
        choice3: 'order()',
        choice4: 'None of the above methods',
        answer: 1,
    },
    {
        question: 'How do you open a new window with JavaScript?',
        choice1: 'window.new(...);',
        choice2: 'window.open_new(...);',
        choice3: 'open(new window());',
        choice4: 'window.open(...);',
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