
/* fetch trivia api for questions */

var queryURL = "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple";

var questions = [];
var answers = [];

var triviaObj = {

}

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

    console.log(questions);
    console.log(answers);


    calledAPI = true;
});






// set isStartClicked to determine if the start button was clicked
var isStartClicked = false;

// counter variable per question
var count = 20;


// display start button
$("#start-button").on("click", function () {
    isStartClicked = true;

    // when start button is clicked, hide it and begin counter
    $("#start-button").hide();

    

});


// function to begin the counting for the start of the first question
function start() {

    intervalId = setInterval(countDown, 1000);

}

// decrement by 1 second for 20 seconds
function countDown() {

    // if start button is clicked
    if (isStartClicked) {

        count--;

        $("#time-remaining").text("Time Remaining: " + count);

    }


    if (count === 0) {
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



