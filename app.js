// AJAX request for quiz questions
var url = "questions.json",
    allQuestions = [],
    request = new XMLHttpRequest();

request.open("GET", url);
request.onload = function() {
    if (request.status === 200) {
        allQuestions = JSON.parse(request.responseText);
        addQuestion(allQuestions);        
    } 
}; 

request.send(null); 

var currentQuestion = 0,
    nextButton = document.getElementById('next'),
    quiz = document.getElementById('quiz'),
    selection = document.getElementsByTagName('input'),
    quizContainer = document.getElementById('quiz-container'),
    resetButton = document.getElementById('reset'),
    correct = "",
    addToScore = 0,
    correctAnswers = 0,
    score = 0;

var getNextQuestion = function () {
    return currentQuestion += 1; 
}

function resetQuiz() {
    var thanks = document.getElementById('thanks');
    quizContainer.removeChild(thanks);
    resetButton.style.display = 'none';
    quiz.style.display = 'block';
    nextButton.disabled = true;
    currentQuestion = 0;
    score = 0;
    correctAnswers = 0;    
}

// Clear element class name
function clearGroupClass(className) {
var answer = document.querySelectorAll('.answer');
    for (var i = 0; i < answer.length; i += 1) {
        answer[i].classList.remove(className);
    }
}

// Display each particular question and its corresponding answers
function addQuestion(questions) {
    var current = questions[currentQuestion],
        question = current.question,
        answers = current.answers,
        questionHeading = document.getElementById('question-heading'),
        ask = document.getElementById('question'),
        answer = "",
        label = "",
        i = 0;
    
    // Disable next button 
    nextButton.disabled = true;
    
    // Display question heading
    questionHeading.innerHTML = "Question " + (currentQuestion + 1) + ":";
    
    // Display current question
    ask.innerHTML = question;
    
    //Display each answer and bind attributes
    for (i; i < answers.length; i += 1) {
        // Uncheck all buttons
        answer = document.getElementsByTagName('input')[i];
        answer.checked = false;
        
        // Change answers 
        label = document.getElementsByTagName('label')[i];
        label.innerHTML = answers[i];    
        answer.setAttribute('value', answers[i]);
        
        // Set correct answer index number
        correct = current.correctAnswer;
    }
}

// Bind click listner to each answer
for (var j = 0; j < selection.length; j += 1) {
    
    // When an anwer is clicked
    selection[j].addEventListener('click', function() {
        
        // Enable the next button
        nextButton.disabled = false;
        
        // Decide if the answer is correct and figure score
        if (this.getAttribute('value') === selection[correct].getAttribute('value')) {
            addToScore = 5;
        } else {
            addToScore = 0;
        }
        
        // Clear checked and unchecked classes from answers
        clearGroupClass('checked');
        clearGroupClass('unchecked');
        
       // Add checked class to the selected answer
        this.parentNode.classList.add('checked');  
        
        // Add unchecked class to other unselected answers
        for (var i = 0; i < selection.length; i += 1) {
            var choose = selection[i];
            if (!choose.parentNode.classList.contains('checked')) {
                choose.parentNode.classList.add('unchecked');
            }
        }
    });
}

// Submit answer and change to next question
// If at end of quiz give answer
nextButton.addEventListener('click', function(evt) {
    evt.preventDefault(); 
    
    // Add 1 to correct answers if the correct answer was selected
    if (addToScore === 5) {
        correctAnswers += 1;
    }
    score += addToScore;
    
    //
    if (currentQuestion === allQuestions.length - 1) {
        
        // Hide answers
        quiz.style.display = 'none';
        
        // Show congrats
        var thanks = document.createElement('h2');
        thanks.setAttribute('id', 'thanks');
        thanks.innerHTML = "Congratulations! You answered " + correctAnswers + " questions correctly. <br>Your score is " + score;
        quizContainer.appendChild(thanks);
        resetButton.style.display = 'block';
    } else {
        clearGroupClass('checked');
        clearGroupClass('unchecked');
        getNextQuestion();
        addQuestion(allQuestions);
    }    
});

reset.addEventListener('click', function() {
    resetQuiz();
    clearGroupClass('checked');
    clearGroupClass('unchecked');
    addQuestion(allQuestions);
});




