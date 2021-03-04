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
        question: 'Inline elements are normally displayed without starting a new line.',
        choice1: 'true',
        choice2: 'false',
        answer: 1,
    },
    {
        question:"How can you make a numbered list?",
        choice1: "<ul>",
        choice2: "<ol>",
        choice3: "<li>",
        choice4: "<dl>",
        answer: 2,
    },
    {
        question: " How can you make a bulleted list?",
        choice1: "<ol>",
        choice2: "<ul>",
        choice3: "<dl>",
        choice4: "<li>",
        answer: 2,
    },
    {
        question: " What is the correct HTML for making a checkbox? ",
        choice1: '<input type="checkbox">',
        choice2: '<input type="check">',
        choice3: '<checkbox>',
        choice4: 'undefined',
        answer: 1,
    },
    {
        question: " What is the correct HTML for making a text input field?",
        choice1: '<input type="textfield">',
        choice2: '<textinput type="text">' ,
        choice3: '<input type="text">',
        choice4: '<textfield>',
        answer: 3,
    },
    {
        question: "What is the correct HTML for making a drop-down list?",
        choice1: '<select>',
        choice2: '<list>',
        choice3: '<input type="dropdown">',
        choice4: '<input type="list">',
        answer: 1,
    },
    {
        question: " What is the correct HTML for making a text area?",
        choice1: '<ipnut type="textbox">',
        choice2: '<input type="textarea">',
        choice3: '<textarea>',
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
        question: "An <iframe> is used to display a web page within a web page.",
        choice1: 'There is no such iframe in html',
        choice2: 'true',
        choice3: 'false',
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