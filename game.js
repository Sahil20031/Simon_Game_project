var buttonColours= ['red','blue','green','yellow'];
var gamePattern = [];
var userClickedPattern = [];
var gamestart=true;
var Level=0;
if(gamestart)
{
    $("body").on("dblclick",nextSequence);
    gameStart=false;
}
$(".btn").on("click",function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
function nextSequence(){
   var randomNumber= Math.floor((Math.random()*4));
   var randomChosenColour= buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);
   $("#"+randomChosenColour).fadeOut(100).fadeIn();
   playSound(randomChosenColour);
   $("h1").text("Level "+Level);
   Level++;
}
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed")
    },100);
}
function startOver()
{
 Level=0;
 gamePattern=[];
 userClickedPattern = [];
 gamestart = true;

}
function checkAnswer(levels)
{
    if(userClickedPattern[levels]===gamePattern[levels])
    {
        console.log("success");
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over")
    },200);  
    $("h1").text("Game Over, Press Any Key to Restart") 
    startOver();
    }
    if(levels+1===gamePattern.length)
    {
        userClickedPattern.length =0;
        setTimeout(nextSequence,1000);
    }

}
