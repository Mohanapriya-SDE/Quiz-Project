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
        question: 'Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?',
        choice1: 'src',
        choice2: 'alt',
        choice3: 'longdesc',
        choice4: 'title',
        answer: 2,
    },
    {
        question: 'Which doctype is correct for HTML5?',
        choice1: '<!DOCTYPE HTML5>',
        choice2: '<!DOCTYPE html5>',
        choice3: '<!DOCTYPE html>',
        choice4: '<!DOCTYPE HTML PUBLIC-"http://www.webschool.com">',
        answer: 3,
    },
    {
        question: 'In HTML, which attribute is used to specify that an input field must be filled out?',
        choice1: 'formvalidate',
        choice2: 'validate',
        choice3: 'required',
        choice4: 'placeholder',
        answer: 3,
    },
    {
        question: 'What is the correct HTML element for playing video files?',
        choice1: '<media>',
        choice2: '<movie>',
        choice3: '<video>',
        choice4: '<src>',
        answer: 3,
    },
    {
        question: 'What is the correct HTML element for playing audio files?',
        choice1: '<audio>',
        choice2: '<src>',
        choice3: '<video>',
        choice4: '<media>',
        answer: 1,
    },
    {
        question: 'The HTML global attribute, "contenteditable" is used to:',
        choice1: 'Specifies a context menu for an element. The menu appears when the user right-clicks on the menu',
        choice2: 'Updates content from server',
        choice3: 'Returns the position of first found occurence of content inside a string',
        choice4: 'Specifies whether the content of an element is editable or not',
        answer: 4,
    },
    {
        question: 'In HTML, onblur and onfocus are:',
        choice1: 'style attributes',
        choice2: 'HTML elements',
        choice3: 'Event attributes',
        answer: 3,
    },
    {
        question: 'Graphics defined by SVG is in which format?',
        choice1: 'HTML',
        choice2: 'XML',
        choice3: 'CSS',
        choice4: 'JSON',
        answer: 2,
    },
    {
        question: 'The HTML <canvas> element is used to:',
        choice1: 'display databse records',
        choice2: 'manipulate data in mysql',
        choice3: 'create draggable elements',
        choice4: 'draw graphics',
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