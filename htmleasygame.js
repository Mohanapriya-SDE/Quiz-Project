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
        question: 'Which input type defines a slider control?',
        choice1: 'slider',
        choice2: 'controls',
        choice3: 'range',
        choice4: 'search',
        answer: 3,
    },
    {
        question: "What is the correct HTML for inserting an image?",
        choice1: '<image src="image.gif" alt="MyImage">',
        choice2: '<img href="image.gif" alt="MyImage">',
        choice3: '<image href="image.gif" alt="MyImage">',
        choice4: '<img src="image.gif" alt="MyImage">',
        answer: 4,
    },
    {
        question: " What is the correct HTML for inserting a background image?",
        choice1: '<body bg="background.gif">',
        choice2: '<background img="background.gif">',
        choice3: '<body style="background-url:(background.gif)">',
        choice4: '<body style="background-image: url(background.gif)">',
        answer: 4,
    },
    {
        question: " Choose the correct HTML element for the largest heading:",
        choice1: "<h6>",
        choice2: "<heading>",
        choice3: "<h1>",
        choice4: "<head>",
        answer: 3,
    },
    {
        question: " What is the correct HTML element for inserting a line break?",
        choice1: "<br>",
        choice2: "<lb>",
        choice3: "<break>",
        choice4: "<tr>",
        answer: 1,
    },
    {
        question: " Choose the correct HTML element to define important text",
        choice1: "<important>",
        choice2: "<strong>",
        choice3: "<i>",
        choice4: "<b>",
        answer: 2,
    },
    {
        question: " Choose the correct HTML element to define emphasized text",
        choice1: "<i>",
        choice2: "<italic>",
        choice3: "<em>",
        choice4: "<bold>",
        answer: 3,
    },
    {
        question: "What is the correct HTML for creating a hyperlink?",
        choice1: "<a name = http://www.webschool.com> WebSchool.com</a> ",
        choice2: "<a>www.webschool.com</a>",
        choice3: "<a href=http://www.webschool.com>WebSchool.com</a>",
        choice4: "<<a url = http://www.webschool.com> WebSchool.com</a>>",
        answer: 3,
    },
    {
        question: " Which character is used to indicate an end tag?",
        choice1: "/",
        choice2: ">",
        choice3: "^",
        choice4: "*",
        answer: 1,
    },
    {
        question: " Which of these elements are all <table> elements?",
        choice1: "<table>,<tr>,<td>",
        choice2: "<table>,<thred>,<body>",
        choice3: "<table>,<head>,<tfoot>",
        choice4: "<thread>,<head>,<body>",
        answer: 1,
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