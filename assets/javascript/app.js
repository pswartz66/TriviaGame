
/* fetch trivia api for questions */

var queryURL = "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple";

var questions = [];
var answers = [];
var incorrectAnswers = [];

var calledAPI = false;


var correctAnswer = '';
var incorrectOne = '';
var incorrectTwo = '';
var incorrectThree = '';

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response);

    for (let i = 0; i < response.results.length; i++) {

        questions.push(response.results[i].question);

        var randomNum = Math.floor(Math.random() * 3);


        correctAnswer = response.results[i].correct_answer;
        incorrectOne = response.results[i].incorrect_answers[0];
        incorrectTwo = response.results[i].incorrect_answers[1];
        incorrectThree = response.results[i].incorrect_answers[2];


        var myArray = [correctAnswer, incorrectOne, incorrectTwo, incorrectThree];
        // change order of answers here:



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

    // console.log(myArray);

});



// console.log(questions);
// console.log(answers);




/* ------------------------------------ */

var answerCounter = 0;
var questionCounter = 0;
var questionCount = 10;

function generateQuestionAndAnswer() {

    // PUT THIS INSIDE A FUNCTION THAT GENERATES A QUESTION AND RANDOMIZES THE ANSWER ORDER
    $("#time-remaining").text("Time Remaining: " + count);


    $('#time-remaining').append('<thead></thead>');
    $('#time-remaining > thead').append('<tr></tr>');
    $('#time-remaining > thead > tr').addClass('question');
    $('#time-remaining > thead > tr:last-child').text(questions[questionCounter]);


    $('#time-remaining').append('<tbody></tbody>');
    $('#time-remaining > tbody:last-child').append('<br></br>');

    // -------------------------------------------------------------------------- //

    $('#time-remaining > tbody:last-child').append('<tr></tr>');
    $('#time-remaining > tbody > tr:last-child').attr('id', 'answer');
    $('#time-remaining > tbody > tr:last-child').text(answers[answerCounter]);
    console.log(answerCounter);

    $('#time-remaining > tbody:last-child').append('<tr></tr>');
    $('#time-remaining > tbody > tr:last-child').attr('id', 'answer');
    $('#time-remaining > tbody > tr:last-child').text(answers[answerCounter + 1]);

    $('#time-remaining > tbody:last-child').append('<tr></tr>');
    $('#time-remaining > tbody > tr').attr('id', 'answer');
    $('#time-remaining > tbody > tr:last-child').text(answers[answerCounter + 2]);

    $('#time-remaining > tbody:last-child').append('<tr></tr>');
    $('#time-remaining > tbody > tr').attr('id', 'answer');
    $('#time-remaining > tbody > tr:last-child').text(answers[answerCounter + 3]);


    // add 'answer' id to all tr tags in in tbody
    $('#time-remaining > tbody > tr').attr('id', 'answer');


    // if the correct answer is clicked then display the correct answer count
    $('#time-remaining > tbody > tr').on('click', function(){
        if ($(this).text() === answers[answerCounter]){

            // clear contents
            clearQuestionAndAnswer();
            
            // pause for 3 seconds and then display next question
            stop();

            correctCount+=1;

            $('#time-remaining').append('<div></div>')
            $('#time-remaining').text("CORRECT");
            $('#time-remaining').append('<p>');
            $('#time-remaining > p').text('Answered Correct: ' + correctCount);

            
            setTimeout(whilePausedCorrect, 3000);
            
        // else if an incorrect answer is clicked then display incorrect answer count
        } else if ($(this).text() !== answers[answerCounter]) {

            // clear contents
            clearQuestionAndAnswer();
            
            // pause for 3 seconds and then display next question
            stop();

            incorrectCount+=1;

            $('#time-remaining').append('<div></div>')
            $('#time-remaining').text("INCORRECT");
            $('#time-remaining').append('<p>');
            $('#time-remaining > p').text('Answered Incorrect: ' + incorrectCount);

            setTimeout(whilePausedInCorrect, 3000);
            
        }
        
        // else no answer selected display incorrect
        else {

            // clear contents
            clearQuestionAndAnswer();
            
            // pause for 3 seconds and then display next question
            stop();

            incorrectCount+=1;

            $('#time-remaining').append('<div></div>')
            $('#time-remaining').text("INCORRECT");
            $('#time-remaining').append('<p>');
            $('#time-remaining > p').text('Answered Incorrect: ' + incorrectCount);

            setTimeout(whilePausedInCorrect, 3000);


        }

    });
    

    // highlight the answers when the user hover's over them
    $('#time-remaining > tbody').on('mouseenter', '#answer', function () {
        $(this).css("background-color", "blue");
    }).on('mouseleave', '#answer', function () {
        $(this).css("background-color", "");
    });



};

var correctCount = 0;
function whilePausedCorrect() {

    $('#time-remaining > div:last-child').append("<p>");
    $('#time-remaining > div > p:last-child').text("Correct Answer: " + correctCount);

    answerCounter += 4;
    questionCounter += 1;
    start();

};

var incorrectCount = 0;
function whilePausedInCorrect() {

    $('#time-remaining > div:last-child').append("<p>");
    $('#time-remaining > div > p:last-child').text("Incorrect Answer: " + incorrectCount);

    answerCounter += 4;
    questionCounter += 1;
    start();

};


// function to clear the Q & A section
function clearQuestionAndAnswer() {

    $('#time-remaining > thead').empty();
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
    count = 5;
    // questionCounter += 1;
    intervalId = setInterval(countDown, 1000);

}

// decrement by 1 second for 20 seconds
function countDown() {

    if (count === -1) {
        stop();
        console.log("times up")

        


        // clear the question and answer field
        clearQuestionAndAnswer();

        // set count back to 5
        count = 5;


        // 4 answers for each question
        answerCounter += 4;

        // add 1 to count the next question
        questionCounter += 1;

        // generate the next question and list of answers
        generateQuestionAndAnswer();

        
        // restart the countdown
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

        $('#time-remaining').append('<br></br>');

        // add user score here below the game over text

        $('#time-remaining').append("<h2 class=correctAnswers></h2>");
        $('.correctAnswers').text("Answered Correctly: " + correctCount);

        

        $('#time-remaining').append("<h2 class=incorrectAnswers></h2>");
        $('.incorrectAnswers').text("Answered Incorrect: " + incorrectCount);

        $('#time-remaining').append("<h3 class=percentage></h3>");
        $('.percentage').text('Score: ' + ((correctCount / questionCount) * 100)  + '%');
        
        restartGame();
        
        

    }



}

// stop the timer
function stop() {

    // clear the time interval
    clearInterval(intervalId);



    // set start button click back to zero
    isStartClicked = false;

}


function restartGame() {
    $('#time-remaining').append("<button class=end-btn>Click to restart</button>");

    $('.end-btn').on('click', function(){
        answerCounter = 0;
        questionCounter = 0;
        questionCount = 10;

        clearQuestionAndAnswer();
        $('#time-remaining').empty();
        start();
    });

};
