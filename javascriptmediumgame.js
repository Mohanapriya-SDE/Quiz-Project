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
        question: 'How does a WHILE loop start?',
        choice1: 'while i=1 to 10',
        choice2: 'while(i<10,i++)',
        choice3: 'while(i<=10)',
        choice4: 'while(i=1 to 10)',
        answer: 3,
    },
    {
        question: 'How does a FOR loop start?',
        choice1: 'for(i=0;i<=5;i++)',
        choice2: 'for(i<=5;i++)',
        choice3: 'for(i=1 to 5)',
        choice4: 'for(i=0;i<=5)',
        answer: 1,
    },
    {
        question: 'How can you add a comment in a JavaScript?',
        choice1: '<!--Comment-->',
        choice2: '//Comment',
        choice3: '<!--Comment>',
        choice4: '//* Comment *//',
        answer: 1,
    },
    {
        question: 'What is the correct way to write a JavaScript array?',
        choice1: 'var colors = (1:"red", 2:"green", 3:"blue")',
        choice2: 'var colors = ("red", "green", "blue")',
        choice3: 'var colors = ["red", "green", "blue"]',
        choice4: 'var colors = (1="red", 2="green", 3="blue")',
        answer: 3,
    },
    {
        question: 'How do you round the number 7.25, to the nearest integer?',
        choice1: 'Math.rnd(7.25)',
        choice2: 'Math.round(7.25)',
        choice3: 'round(7.25)',
        choice4: 'rnd(7.25)',
        answer: 2,
    },
    {
        question: 'How do you find the number with the highest value of x and y?',
        choice1: 'Math.max(x,y)',
        choice2: 'top(x,y)',
        choice3: 'Math.ceil(x,y)',
        choice4: 'ceil(x,y)',
        answer: 3,
    },
    {
        question: 'What is the correct JavaScript syntax for opening a new window called "w2" ?',
        choice1: 'w2=window.new("http://www.w3schools.com");',
        choice2: 'w2=new window("http://www.w3schools.com");',
        choice3: 'w2=open window("http://www.w3schools.com");',
        choice4: 'w2=window.open("http://www.w3schools.com");',
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