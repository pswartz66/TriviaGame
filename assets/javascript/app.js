
/* fetch trivia api for questions */

var queryURL = "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple";

var questions = [];
var answers = [];
var incorrectAnswers = [];

var calledAPI = false;

var tempCorrect = [];


var minNum = 0;
var maxNum = 3;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response);

    
    

    for (let i = 0; i < response.results.length; i++) {

        // push each question into an array
        questions.push(response.results[i].question);


        answers.push(//response.results[i].correct_answer,
            response.results[i].incorrect_answers[0],
            response.results[i].incorrect_answers[1],
            response.results[i].incorrect_answers[2]
        );

        // dynamically generate a random number between 0 - 3, 4 - 7, 8 - 11 etc...
        var randomNum = Math.floor(Math.random() * (maxNum - minNum) + minNum);


        // put correct answer somehwere in the answer order of 0 - 3, 4 - 7, 8 - 11 etc...
        answers.splice(randomNum, 0, response.results[i].correct_answer)

        // counter variables to increment by 4 to change the min random num and max random num
        maxNum += 4;
        minNum += 4;

        // push correct answer number to temporary correct answer array
        tempCorrect.push(randomNum);
        

    }

    // used to check api call answers
    for (let i = 0; i < answers.length; i++) {
        
        //console.log(answers[i]);
            
    }

    calledAPI = true;
    

});




/* ------------------------------------ */

// initiate counter variables
var answerCounter = 0;
var questionCounter = 0;
var questionCount = 10;



function generateQuestionAndAnswer() {

    $('#time-remaining > tbody').empty();

    // similar counting mechanism to the api min and max numbers - see above
    var minNum2 = answerCounter;
    var maxNum2 = minNum2 + 4;

    // set correct answer to a variable that is matched to the question
    var myCorrectAnswer = tempCorrect[questionCounter];
    
    // temp counter variable
    var a = 0;

    for (var y = minNum2; y < maxNum2; y++) {

        if (y === myCorrectAnswer) {
            
            console.log(answers[myCorrectAnswer]);

        } else if (y !== myCorrectAnswer && a === 1) {
            var incorrectANS_ONE = y;
            console.log(answers[incorrectANS_ONE]);
            a = a + 1;
        } else if (y !== myCorrectAnswer && a === 2) {
            var incorrectANS_TWO = y;
            console.log(answers[incorrectANS_TWO]);
            a = a + 1;
        }
        else {
            var incorrectANS_THREE = y;
            console.log(answers[incorrectANS_THREE]);
            a = a + 1;
        }
  
    }

    console.log('---------------------------------');


    $("#time-remaining").text("Time Remaining: " + count);


    $('#time-remaining').append('<thead></thead>');
    $('#time-remaining > thead').append('<tr></tr>');
    $('#time-remaining > thead > tr').addClass('question');
    $('#time-remaining > thead > tr:last-child').text(questions[questionCounter]);


    $('#time-remaining').append('<tbody></tbody>');
    $('#time-remaining > tbody:last-child').append('<br></br>');

    // -------------------------------------------------------------------------- //

    if (questionCounter === 2 || 
        questionCounter === 7 || 
        questionCounter === 4 || 
        questionCounter === 9)
    {

    $('#time-remaining > tbody:last-child').append('<tr></tr>');
    $('#time-remaining > tbody > tr:last-child').attr('id', 'answer');
    $('#time-remaining > tbody > tr:last-child').text(answers[incorrectANS_TWO]);

    $('#time-remaining > tbody:last-child').append('<tr></tr>');
    $('#time-remaining > tbody > tr:last-child').attr('id', 'answer');
    $('#time-remaining > tbody > tr:last-child').text(answers[incorrectANS_ONE]);

    $('#time-remaining > tbody:last-child').append('<tr></tr>');
    $('#time-remaining > tbody > tr').attr('id', 'answer');
    $('#time-remaining > tbody > tr:last-child').text(answers[myCorrectAnswer]);

    $('#time-remaining > tbody:last-child').append('<tr></tr>');
    $('#time-remaining > tbody > tr').attr('id', 'answer');
    $('#time-remaining > tbody > tr:last-child').text(answers[incorrectANS_THREE]);


    // add 'answer' id to all tr tags in in tbody
    $('#time-remaining > tbody > tr').attr('id', 'answer');

    } else if (questionCounter === 0 || 
        questionCounter === 3 || 
        questionCounter === 6 || 
        questionCounter === 8)
    {

    $('#time-remaining > tbody:last-child').append('<tr></tr>');
    $('#time-remaining > tbody > tr:last-child').attr('id', 'answer');
    $('#time-remaining > tbody > tr:last-child').text(answers[myCorrectAnswer]);

    $('#time-remaining > tbody:last-child').append('<tr></tr>');
    $('#time-remaining > tbody > tr:last-child').attr('id', 'answer');
    $('#time-remaining > tbody > tr:last-child').text(answers[incorrectANS_ONE]);

    $('#time-remaining > tbody:last-child').append('<tr></tr>');
    $('#time-remaining > tbody > tr').attr('id', 'answer');
    $('#time-remaining > tbody > tr:last-child').text(answers[incorrectANS_TWO]);

    $('#time-remaining > tbody:last-child').append('<tr></tr>');
    $('#time-remaining > tbody > tr').attr('id', 'answer');
    $('#time-remaining > tbody > tr:last-child').text(answers[incorrectANS_THREE]);


    }

    else if (questionCounter === 1 || 
        questionCounter === 5)
    {
    
    $('#time-remaining > tbody:last-child').append('<tr></tr>');
    $('#time-remaining > tbody > tr:last-child').attr('id', 'answer');
    $('#time-remaining > tbody > tr:last-child').text(answers[incorrectANS_THREE]);

    $('#time-remaining > tbody:last-child').append('<tr></tr>');
    $('#time-remaining > tbody > tr:last-child').attr('id', 'answer');
    $('#time-remaining > tbody > tr:last-child').text(answers[incorrectANS_TWO]);

    $('#time-remaining > tbody:last-child').append('<tr></tr>');
    $('#time-remaining > tbody > tr').attr('id', 'answer');
    $('#time-remaining > tbody > tr:last-child').text(answers[incorrectANS_ONE]);

    $('#time-remaining > tbody:last-child').append('<tr></tr>');
    $('#time-remaining > tbody > tr').attr('id', 'answer');
    $('#time-remaining > tbody > tr:last-child').text(answers[myCorrectAnswer]);

    }


    // if the correct answer is clicked then display the correct answer count
    $('#time-remaining > tbody > tr').on('click', function(){
        if ($(this).text() === answers[myCorrectAnswer]){

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
        } else if ($(this).text() !== answers[myCorrectAnswer]) {

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

    // clear out question and answer section
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

        // on click reset counter vars back to initial state
        answerCounter = 0;
        questionCounter = 0;
        questionCount = 10;


        // reset users correct guesses and incorrect guesses
        correctCount = 0;
        incorrectCount = 0;


        // clear out question and answer section
        clearQuestionAndAnswer();

        // clear out entire time remaining area
        $('#time-remaining').empty();

        // call the start function to restart the game
        start();
    });

};
