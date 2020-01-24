/* quiz app
-be able to start quiz
-keep track of score and questions number at the top of the page
-move through questions one at a time
-can't skip questions
-receive feedback on whether the ? is right or wrong
-move to the next question
-recieve overall score at the end of the quiz
-be able to restart the quiz


generateQuizQuestion()
 -event listener for start/next question button
 - displays a question / answers with radio buttons
 - creates a submit answer button

questionChecker()
 - event listener for submit button
 - checks to see if answer is right
 - calls display results function

questionNumber() 
 -updates the qnumber variable and updates the number in the DOM

scoreKeeper()
-keeps track of score

displayResults()
-if else statement renders a right answer or wrong answer page
-renders a next question button

startQuiz()
-resets score and question number
-displays the first question

handleQuizApp()
will call all of the functions once the page loads
*/

STORE = [
    { question: "What are the three primary colors?",
    answer: ["red, yellow, blue", "red, orange, blue", "green, orange, purple", "orange, blue, green" ],
    correctAnswer:"red, yellow, blue"
    },
    { question: "What are the three secondary colors?",
    answer: ["green, blue, purple", "green, orange, purple", "red, yellow, blue", "red, yellow, purple"],
    correctAnswer:"green, orange, purple"
    },
    { question: "What are analagous colors?",
    answer: ["colors directly opposite each other on the color wheel", "one color, escept different shades", "any three colors that are by side on the color wheel", "black and white"],
    correctAnswer: "any three colors that are by side on the color wheel"
    },
    { question: "Warm colors are:",
    answer: ["red, orange, yellow", "blue, green purple", "red, green, blue", "orange, purple, yellow"],
    correctAnswer: "red, orange, yellow"
    },
    { question: "Tint refers to:",
    answer: ["when you add white to a hue", "when you add black to a hue", "when you mix colors together", "when you add a primary color to an existing hue"],
    correctAnswer: "when you add white to a hue"
    }
]
/* sets initial values to zero for the question number and score */

let qNumber = 0;
let score = 0;

/* event listener for start quiz button. Hides the start page and calls the function generateQuizQuestion */
function startQuiz() {
    $('main').on('click', '#button-start', function(event){
        $('.start-quiz').hide();
        generateQuizQuestion();
    });
}

/* begins displaying quiz questions from the STORE array until the very last question has been displayed, then calls the displayResults function */
function generateQuizQuestion() {
    if (qNumber < STORE.length) {
    let question =$(`<form class ="js-quiz-form" action ="/some-server" method = "post">
    <legend class = "question">${STORE[qNumber].question}</legend>`);
    let answers = STORE[qNumber].answer.map(function(answerValue, answerIndex){
        return `<label class="answer-option"><input type="radio" name="answer" tabindex="${answerIndex+1}" value="${answerValue}" required>${answerValue}</label><br>`;
    });
    let button = $(`<button type="submit" id ="button-submit">Submit</button></form>`)
    $('.js-quiz').append(question);
    $('.js-quiz-form').append(answers, button);
    questionNumber();
} else {
    displayResults();
}

}

/* event listener for the submit button. Then checks to see if the answer selected is correct */
function questionChecker(){
    $('main').on('click','#button-submit', function (event){
        event.preventDefault();
        let selectedAnswer= $("input[name=answer]:checked").val();
        console.log(selectedAnswer);
        if (selectedAnswer === STORE[qNumber].correctAnswer) {
            rightAnswer();
        } else {
                wrongAnswer();
            }
    });
}

/* updates the question number and displays it at the top of the page */
function questionNumber(){
    $('header').find('#question-number').text(qNumber+1);
}

/* keeps score of correct answers and displays at the top of the page */
function scoreKeeper(){
    score++;
    $('header').find('#score').text(`${score}/5`);

}

/* displays the page for when the answer is right, updates score accordingly */
function rightAnswer() {
    console.log('rightAnswer ran');
    $('.js-quiz-form').hide();
    $('.js-answer').append(`<h2>You're Right!</h2>
    <img src="img/right-answer.jpg" alt="abstract painting" id="right-answer"/>
    <p>Great Job.</p>
    <button type="button" id ="button-next">Next Question</button>`).show();
    scoreKeeper();
}

/* displays page for when the answer is wrong and displays the correct answer */
function wrongAnswer() {
    $('.js-quiz-form').hide();
    $('.js-answer').append(`<h2>That answer is not quite right...</h2>
        <img src="img/wrong-answer.jpg" alt="child with paint all over face" id="wrong-answer"/>
        <h3>The correct answer is:</h3>
        <P><span class="correct-answer">${STORE[qNumber].correctAnswer}</span></P>
        <button type="button" id ="button-next">Next Question</button>`).show();
}

/* event listener for the next question button, calls the generateQuizQuestion function to display the next question */
function nextQuestion() {
    $('main').on('click','#button-next', function(event) {
        $('.js-answer').empty();
        $('.js-quiz-form').empty();
        qNumber++;
        generateQuizQuestion();
        $('js-quiz-form').show();
    });
}

/* displays the final percentage score and total number of correct answers */
function displayResults(){
    console.log("`displayResults` ran");
    let finalScore = (score/5)*100;
    $('.js-answer').append(`<h2>Quiz Results</h2>
    <img id="paint-bucket" alt="red paint bucket" src = "img/paint-bucket.jpg"/>
    <h3>${finalScore}%</h3>
    <p>You got <span class="right-answers">${score} </span>out of 5 questions right.</p>
    <button type="button" id ="button-restart">Restart Quiz</button>`)
}

function handleQuizApp(){
    startQuiz();
    questionChecker();
    nextQuestion();
}

/* calls the handleQuizApp to activate functions with event listeners */
$(handleQuizApp);