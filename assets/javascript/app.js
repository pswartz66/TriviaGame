
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
        
        answers.push(response.results[i].correct_answer); 
        
    }

    for (let j = 0; j < 10; j++){

        incorrectAnswers.push(response.results[j].incorrect_answers[0]);
        
        incorrectAnswers.push(response.results[j].incorrect_answers[1]);
        
        incorrectAnswers.push(response.results[j].incorrect_answers[2]);
        
    }
    

    calledAPI = true;

});

console.log(questions);
console.log(answers);
console.log(incorrectAnswers);

// map 4 answers per question into it's own array
// will allow for easier answer array randomization
var mappedAnswers = [];
var x = 3;

console.log(questions.length)

for (var k = 0; k < questions.length; k++) {
    // 0 - 0, 1, 2
    // 1 - 3, 4, 5 
    // 2 - 6, 7, 8


    console.log(questions[k]);

    /* mappedAnswers.push(answers[p])
    
    x += 3;

    console.log(mappedAnswers); */
};


/* ------------------------------------ */


function generateQuestionAndAnswer(){


    // PUT THIS INSIDE A FUNCTION THAT GENERATES A QUESTION AND RANDOMIZES THE ANSWER ORDER
    $("#time-remaining").text("Time Remaining: " + count);



    $('#time-remaining').append('<tbody></tbody>')
    $('#time-remaining > tbody:last-child').append('<tr></tr>');
    $('#time-remaining > tbody > tr').addClass('question');
    $('#time-remaining > tbody > tr:last-child').text(questions[0]);

    $('#time-remaining > tbody:last-child').append('<br></brr>');

    $('#time-remaining > tbody:last-child').append('<tr></tr>');
    $('#time-remaining > tbody > tr').attr('id', 'answer');
    $('#time-remaining > tbody > tr:last-child').text(answers[0]);

    $('#time-remaining > tbody:last-child').append('<tr></tr>');
    $('#time-remaining > tbody > tr').attr('id', 'answer');
    $('#time-remaining > tbody > tr:last-child').text(incorrectAnswers[0]);

    $('#time-remaining > tbody:last-child').append('<tr></tr>');
    $('#time-remaining > tbody > tr').attr('id', 'answer');
    $('#time-remaining > tbody > tr:last-child').text(incorrectAnswers[1]);

    $('#time-remaining > tbody:last-child').append('<tr></tr>');
    $('#time-remaining > tbody > tr').attr('id', 'answer');
    $('#time-remaining > tbody > tr:last-child').text(incorrectAnswers[2]);



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


    if (count === -1) {
        stop();
        console.log("times up")

        // log the users guess here


        


        // clear the question and answer field
        // clearQuestionAndAnswer();
        
    }

}

// stop the timer
function stop() {

    // clear the time interval
    clearInterval(intervalId);

    // set start button click back to zero
    isStartClicked = false;

}



