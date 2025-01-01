/*Problem: Design Simon Game.
Solution:  1. User presses a or A and game begins.
              All of coding begins only when a or A is pressed, else the page remains in original condition.
           2. (Level increases.)
              Variable level stores the value of current level.
           3. Heading changes to level number.
           3. (A pattern blinks.
              The pattern is random sequence of buttons.)
              A sequence of button is stored (one button out of four is choosen and stored (pushed) in the sequence array variable).
              The lenght of sequence array is equal to level of game as in each level increase one new button number is pushed into the sequence.
              The button sequence blinks. One button blinks followed by next button and so on.
              The sequence is number and the buttons to be blinked are named red,blue,etc. Sp,
              a switch statement is to be used the case of number to corresponding color of button to be blinked.
              The blibk would have animation and sound.
           4. User presses(enters) the button sequence.
              The entered sequence is stored in an array.
                if the sequence entered is same as the blink pattern, then go to '2'
                else game-over.
                     in game over the whole screen anmiates to red color once for short time.
                     and heading changes to Game Over, press any key to restart
                     and level changes to 0
                     pressing any key goes to '2'. 
*/
        
var sequenceOfGame = [];
var sequenceUserEntered = [];
var buttonColor;
//initially level at 0
var level = 0;
var started = false;
var lastElementIndex;
var check;
var game_over = false;

function animate(buttonColor){
    $("#" + buttonColor).addClass("pressed");
    setTimeout(function () {
      $("#" + buttonColor).removeClass("pressed");
    }, 100);        
}

function sound(buttonColor){
    var audio = new Audio("sounds/"+buttonColor+".mp3");
    audio.play();
}

function blinkButton(buttonColor){
    animate(buttonColor);
    sound(buttonColor);
}

function blink(i){
    //blinks next button in sequence
    switch(sequenceOfGame[i]){
        case 1: blinkButton("green"); break;
        case 2: blinkButton("red"); break;
        case 3: blinkButton("yellow"); break;
        case 4: blinkButton("blue"); break;
        default: console.log("Button number out of range.");
    }
}

function checkSequence(i){
    if(sequenceOfGame[i]==sequenceUserEntered[i]) return true;
    else return false;
}

function gameOver(){
    $("h1").text("Game over, press any key to restart.")
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },300);
    level = 0;
    sequenceOfGame = [];
    sequenceUserEntered = [];
    game_over = true;
}

function game_fate(check){
    if(check==false) gameOver();
    else if(lastElementIndex==level-1){lastElementIndex=0; sequenceUserEntered=[]; setTimeout(function () {game();},1000);}
    else if (level==10) {$("h1").text("You won"); started = false;}
}


function game(){
    //increasing the level number
    level++;
    //Changing the heading to level number                 
    $("h1").text("Level " + level);
    //choosing one of the four buttons
    var buttonNumber = Math.floor(Math.random()*4+1);
    //increasing the sequence
    sequenceOfGame.push(buttonNumber);
    setTimeout(function () {
        blink(level-1);           //blink next button
    },1000);
}

//start of game
$(document).keydown(function (event){
    if(started==false)
        if(event.key == "a" || event.key == "A"){started = true; game();}
});

//create user entered sequence
$(".btn").click(function () {
    switch(this.id){
        case "green": sequenceUserEntered.push(1); blinkButton("green"); break;
        case "red": sequenceUserEntered.push(2); blinkButton("red"); break;
        case "yellow": sequenceUserEntered.push(3); blinkButton("yellow"); break;
        case "blue": sequenceUserEntered.push(4); blinkButton("blue"); break;
        default: console.log("this.id is giving wrong output")
    }
    if(started==true){
        lastElementIndex = sequenceUserEntered.length-1;
        check = checkSequence(lastElementIndex);
        game_fate(check);
    }
});

$(document).keydown(function (){ if(game_over==true){game_over=false; game();}})