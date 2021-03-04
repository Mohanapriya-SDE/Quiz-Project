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
        question: 'Inside which HTML element do we put the JavaScript??',
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 1,
    },
    {
        question: 'What is the correct JavaScript syntax to change the content of the HTML element: <p id="demo">This is a demonstration.</p>',
        choice1: 'document.getElementByName("p").innerHTML="hello world";',
        choice2: 'document.getElementByName("demo").innerHTML="hello world";',
        choice3: 'document.getElementById("p").innerHTML="hello world";',
        choice4: 'document.getElementById("demo").innerHTML="hello world";',
        answer: 4,
    },
    {
        question: 'Where is the correct place to insert a JavaScript?',
        choice1: 'In <head> section',
        choice2: 'In <body> section',
        choice3: 'In <head> and <body> section',
        choice4: 'none',
        answer: 2,
    },
    {
        question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
        choice1: '<script href="xxx.js">',
        choice2: '<script name="xxx.js">',
        choice3: '<script src="xxx.js">',
        choice4: '<script source="xxx.js">',
        answer: 3,
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        choice1: 'alertBox("Hello World");',
        choice2: 'msgBox("Hello World");',
        choice3: 'msg("Hello World");',
        choice4: 'alert("Hello World");',
        answer: 4,
    },
    {
        question: 'How do you create a function in JavaScript?',
        choice1: 'Function my function()',
        choice2: 'Function= "my function()"',
        choice3: 'Function: "my function()"',
        choice4: 'Function()',
        answer: 1,
    },
    {
        question: 'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
        choice1: 'if i<>5',
        choice2: 'if(i!=5):',
        choice3: 'if(i<>5)',
        choice4: 'if i!=5',
        answer: 2,
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