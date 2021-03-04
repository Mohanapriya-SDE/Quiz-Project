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
        question: 'Which class provides a responsive fixed width container?',
        choice1: '.container-fluid',
        choice2: '.container-fixed',
        choice3: '.container',
        choice4: 'none of the above',
        answer: 2,
    },
    {
        question: 'Which class provides a full width container, spanning the entire width of the viewport?',
        choice1: '.container-fluid',
        choice2: '.container-fixed',
        choice3: '.container',
        choice4: 'none of the above',
        answer: 1,
    },
    {
        question: 'The Bootstrap grid system is based on how many columns?',
        choice1: '12',
        choice2: '8',
        choice3: '4',
        choice4: '2',
        answer: 1,
    },
    {
        question: 'Which class adds zebra-stripes to a table?',
        choice1: '.table-zero',
        choice2: '.table-bordered',
        choice3: '.even and .odd',
        choice4: '.table-stripped',
        answer: 4,
    },
    {
        question: 'Which class shapes an image to a circle?',
        choice1: '.img-rounded',
        choice2: '.img-circle',
        choice3: '.img-round',
        choice4: '.img-thumbnail',
        answer: 2,
    },
    {
        question: 'Which class is used to create a big box for calling extra attention?',
        choice1: '.jumbotron',
        choice2: '.container',
        choice3: '.bogbox',
        answer: 1,
    },
    {
        question: 'Which class provides a rounded corner to an image',
        choice1: '.img-rounded',
        choice2: '.img-circle',
        choice3: '.img-round',
        choice4: '.img-thumbnail',
        answer: 1,
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