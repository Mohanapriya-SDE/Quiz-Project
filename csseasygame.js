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
        question: 'What is the correct HTML for referring to an external style sheet?',
        choice1: '<stylesheet>mystyle.css</stylesheet>',
        choice2: '<style src="mystyle.css">',
        choice3: '<link rel="stylesheet" type="text/css" href="mystyle.css">',
        choice4: '<a href="stylesheet.css></a>',
        answer: 3,
    },
    {
        question: 'Which HTML tag is used to define an internal style sheet?',
        choice1: '<style>',
        choice2: '<css>',
        choice3: '<head>',
        choice4: '<script>',
        answer: 1,
    },
    {
        question: 'Which HTML attribute is used to define inline styles?',
        choice1: 'class',
        choice2: 'styles',
        choice3: 'font',
        choice4: 'style',
        answer: 4,
    },
    {
        question: 'Which is the correct CSS syntax?',
        choice1: 'body {color:black;}',
        choice2: 'body:"color=black";',
        choice3: 'body {color="black";}',
        choice4: 'body="color:black";',
        answer: 1,
    },
    {
        question: 'How do you insert a comment in a CSS file?',
        choice1: '/* this is comment */',
        choice2: '// this is comment //',
        choice3: " 'this is comment ",
        choice4: '//* this is comment',
        answer: 1,
    },
    {
        question: 'Which property is used to change the background color?',
        choice1: 'bgcolor',
        choice2: 'color',
        choice3: 'background-color',
        choice4: '<a href="stylesheet.css></a>',
        answer: 3,
    },
    {
        question: 'How do you add a background color for all <h1> elements?',
        choice1: 'h1.all {background-color:#FFFFFF;}',
        choice2: 'all.h1 {background-color:#FFFFFF;}',
        choice3: 'h1 {background-color:#FFFFFF;}',
        choice4: 'h1.all {bgcolor:#FFFFFF;}',
        answer: 3,
    },
    {
        question: 'Which CSS property is used to change the text color of an element?',
        choice1: 'textcolor',
        choice2: 'fgcolor',
        choice3: 'fontcolor',
        choice4: 'color',
        answer: 4,
    },
    {
        question: 'Which CSS property controls the text size?',
        choice1: 'text-size',
        choice2: 'font-size',
        choice3: 'font-style',
        choice4: 'text-style',
        answer: 2,
    },
    {
        question: 'What is the correct CSS syntax for making all the <p> elements bold?',
        choice1: '<p style="font-size:bold";>',
        choice2: 'p {font-weight:bold;}',
        choice3: 'p style="text-size:bold;">',
        choice4: 'p {text-size:bold;}',
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