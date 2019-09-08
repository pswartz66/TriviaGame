
/* fetch trivia api for questions */

var queryURL = "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple";

var questions = [];
var answers = [];
var incorrectAnswers = [];

var calledAPI = false;



$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(response);

    for (let i = 0; i < response.results.length; i++) {

        questions.push(response.results[i].question);
        
        var random = Math.floor(Math.random() * 3)

        var randNum = [0, 1, 2];

        answers.push(response.results[i].correct_answer,
                    response.results[i].incorrect_answers[0],
                    response.results[i].incorrect_answers[1],
                    response.results[i].incorrect_answers[2]
                    ); 
        
    }


    for (let i = 0; i < answers.length; i++) {
        console.log(answers[i]);

    }

    
    calledAPI = true;

});



console.log(questions);
console.log(answers);




/* ------------------------------------ */

var answerCounter = 0;
var questionCounter = 0;
var questionCount = 10;

function generateQuestionAndAnswer(){
     
    

    // PUT THIS INSIDE A FUNCTION THAT GENERATES A QUESTION AND RANDOMIZES THE ANSWER ORDER
    $("#time-remaining").text("Time Remaining: " + count);


    $('#time-remaining').append('<tbody></tbody>')
    $('#time-remaining > tbody:last-child').append('<tr></tr>');
    $('#time-remaining > tbody > tr').addClass('question');
    $('#time-remaining > tbody > tr:last-child').text(questions[questionCounter]);

    $('#time-remaining > tbody:last-child').append('<br></brr>');

    $('#time-remaining > tbody:last-child').append('<tr></tr>');
    $('#time-remaining > tbody > tr').attr('id', 'answer');
    $('#time-remaining > tbody > tr:last-child').text(answers[answerCounter]);

    $('#time-remaining > tbody:last-child').append('<tr></tr>');
    $('#time-remaining > tbody > tr').attr('id', 'answer');
    $('#time-remaining > tbody > tr:last-child').text(answers[answerCounter + 1]);

    $('#time-remaining > tbody:last-child').append('<tr></tr>');
    $('#time-remaining > tbody > tr').attr('id', 'answer');
    $('#time-remaining > tbody > tr:last-child').text(answers[answerCounter + 2]);

    $('#time-remaining > tbody:last-child').append('<tr></tr>');
    $('#time-remaining > tbody > tr').attr('id', 'answer');
    $('#time-remaining > tbody > tr:last-child').text(answers[answerCounter + 3]);



    /* $('#time-remaining > tbody > tr').hover(function(){
        $(this).css("background-color", "blue");
    }); */

    

};


// function to clear the Q & A section
function clearQuestionAndAnswer(){

    $('#time-remaining > tbody').empty();

}




// set isStartClicked to determine if the start button was clicked
var isStartClicked = false;

// counter variable per question
var count = 5;


// when start button is clicked run this code
$("#start-button").on("click", function () {

    isStartClicked = true;

    // when start button is clicked, hide it and begin counter
    $("#start-button").hide();

    start();

});




// function to begin the counting for the start of the first question
function start() {

    intervalId = setInterval(countDown, 1000);

}

// decrement by 1 second for 20 seconds
function countDown() {

    // if start button is clicked
    if (isStartClicked) {

        
        // call generate question and answer function
        generateQuestionAndAnswer();
        

        // decrement by 1
        count--;


    }
    else {

        // call generate question and answer function
        generateQuestionAndAnswer();
        

        // decrement by 1
        count--;

    }

    

    if (count === -1) {
        stop();
        console.log("times up")

        // log the users guess here


        // clear the question and answer field
        clearQuestionAndAnswer();

        // set count back to 5
        count = 5;


        answerCounter += 4;
        questionCounter += 1;
        generateQuestionAndAnswer();

        start();
        
        
    }

}

// stop the timer
function stop() {

    // clear the time interval
    clearInterval(intervalId);

    

    // set start button click back to zero
    isStartClicked = false;

}



