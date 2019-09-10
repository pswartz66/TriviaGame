
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
    // console.log(response);

    for (let i = 0; i < response.results.length; i++) {

        questions.push(response.results[i].question);
        
        var randomNum = Math.floor(Math.random() * 3);

        var randomNumers = [0, 1, 2];


        answers.push(response.results[i].correct_answer,
                    response.results[i].incorrect_answers[0],
                    response.results[i].incorrect_answers[1],
                    response.results[i].incorrect_answers[2]
                    ); 
        
    }


    for (let i = 0; i < answers.length; i++) {
        // console.log(answers[i]);

    }

    
    calledAPI = true;

});



// console.log(questions);
// console.log(answers);




/* ------------------------------------ */

var answerCounter = 0;
var questionCounter = 0;
var questionCount = 10;

function generateQuestionAndAnswer(){
     
    // PUT THIS INSIDE A FUNCTION THAT GENERATES A QUESTION AND RANDOMIZES THE ANSWER ORDER
    $("#time-remaining").text("Time Remaining: " + count);


    $('#time-remaining').append('<thead></thead>');
    $('#time-remaining > thead').append('<tr></tr>');
    $('#time-remaining > thead > tr').addClass('question');
    $('#time-remaining > thead > tr:last-child').text(questions[questionCounter]);


    $('#time-remaining').append('<tbody></tbody>');
    $('#time-remaining > tbody:last-child').append('<br></brr>');

    // -------------------------------------------------------------------------- //


    $('#time-remaining > tbody:last-child').append('<tr></tr>');
    $('#time-remaining > tbody > tr:last-child').attr('id', 'answer');
    $('#time-remaining > tbody > tr:last-child').text(answers[answerCounter]);

    $('#time-remaining > tbody:last-child').append('<tr></tr>');
    $('#time-remaining > tbody > tr:last-child').attr('id', 'answer');
    $('#time-remaining > tbody > tr:last-child').text(answers[answerCounter + 1]);

    $('#time-remaining > tbody:last-child').append('<tr></tr>');
    $('#time-remaining > tbody > tr').attr('id', 'answer');
    $('#time-remaining > tbody > tr:last-child').text(answers[answerCounter + 2]);

    $('#time-remaining > tbody:last-child').append('<tr></tr>');
    $('#time-remaining > tbody > tr').attr('id', 'answer');
    $('#time-remaining > tbody > tr:last-child').text(answers[answerCounter + 3]);





    $('#time-remaining > tbody').on('mouseenter', '#answer', function(){
        $(this).css("background-color", "blue");
    }).on('mouseleave', '#answer', function(){
        $(this).css("background-color", "");
    });

    /* $("tr").on("click", function(){

        console.log("you clicked");
    
    }) */
    
/*  $('#time-remaining > tbody > tr:nth-child(1)').attr('id', 'answerOne');
    $('#time-remaining > tbody > tr:nth-child(2)').attr('id', 'answerTwo');
    $('#time-remaining > tbody > tr:nth-child(3)').attr('id', 'answerThree');
    $('#time-remaining > tbody > tr:nth-child(4)').attr('id', 'answerFour');
 */


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

    
    if (questionCounter === questionCount) {
        stop();
        $("#time-remaining").text("GAME OVER!");

        // add user score here below the game over text


    }

    

}

// stop the timer
function stop() {

    // clear the time interval
    clearInterval(intervalId);

    

    // set start button click back to zero
    isStartClicked = false;

}



