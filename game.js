var buttonColours= ['red','blue','green','yellow'];
var gamePattern = [];
var userClickedPattern = [];
var gamestart=true;
var Level=0;
if(gamestart)
{
   if($(window).width()<1000)
    {
        $("body").append("<button class='start_button'>Click to start</button>");
       $(".start_button").on("click",nextSequence);
        gamestart=false;
    }
    else{
        $("h1").text("Press Any Key to Restart")
        $("body").on("keypress",nextSequence);
        gamestart=false;
    }
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
    if($(window).width()<1000)
    {
        $("h1").text("Game Over, Click On Start Button to restart") ;
    }
    else{
        $("h1").text("Game Over, Press a Key to restart") 
    }
    startOver();
    }
    if(levels+1===gamePattern.length)
    {
        userClickedPattern.length =0;
        setTimeout(nextSequence,1000);
    }

}


