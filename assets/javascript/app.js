
/* fetch trivia api for questions */

var queryURL = "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple";

var questions = [];
var answers = [];
var incorrectAnswers = [];
// var API_results = [];

var calledAPI = false;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(response);

    for (let i = 0; i < response.results.length; i++) {

        questions.push(response.results[i].question);
        
        answers.push(response.results[i].correct_answer);

        
        
    }

    for (let j = 0; response.results[j].incorrect_answers.length; j++){
        incorrectAnswers.push(response.results[j].incorrect_answers[0]);
        incorrectAnswers.push(response.results[j].incorrect_answers[1]);
        incorrectAnswers.push(response.results[j].incorrect_answers[2]);
        
    }

    /* API_results.push(response.results[0]);
    API_results.push(response.results[1]);
    API_results.push(response.results[2]);
    API_results.push(response.results[3]);
    API_results.push(response.results[4]);
    API_results.push(response.results[5]);
    API_results.push(response.results[6]);
    API_results.push(response.results[7]);
    API_results.push(response.results[8]);
    API_results.push(response.results[9]);
    API_results.push(response.results[10]); */

    calledAPI = true;
});

console.log(questions);
console.log(answers);
console.log(incorrectAnswers);


/* ------------------------------------ */


function generateQuestionAndAnswer(){

    // PUT THIS INSIDE A FUNCTION THAT GENERATES A QUESTION AND RANDOMIZES THE ANSWER ORDER
    $("#time-remaining").text("Time Remaining: " + count);


    $('#time-remaining').append('<tbody></tbody>')
    $('#time-remaining > tbody:last-child').append('<tr></tr>');
    $('#time-remaining > tbody > tr:last-child').text(questions[0]);

    $('#time-remaining > tbody:last-child').append('<br></brr>');

    $('#time-remaining > tbody:last-child').append('<tr></tr>');
    $('#time-remaining > tbody > tr:last-child').text(answers[0]);

    $('#time-remaining > tbody:last-child').append('<tr></tr>');
    $('#time-remaining > tbody > tr:last-child').text(incorrectAnswers[0]);

    $('#time-remaining > tbody:last-child').append('<tr></tr>');
    $('#time-remaining > tbody > tr:last-child').text(incorrectAnswers[1]);

    $('#time-remaining > tbody:last-child').append('<tr></tr>');
    $('#time-remaining > tbody > tr:last-child').text(incorrectAnswers[2]);

};



// set isStartClicked to determine if the start button was clicked
var isStartClicked = false;

// counter variable per question
var count = 20;


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


    if (count === -1) {
        stop();
        console.log("times up")
        
    }

}

// stop the timer
function stop() {

    // clear the time interval
    clearInterval(intervalId);

    // set start button click back to zero
    isStartClicked = false;

}



