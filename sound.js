// for(let i = 0; i<document.querySelectorAll(".testpress").length; i++) {}

document.querySelector(".testpress").addEventListener("click", function(){
  alert("I'm crushing hard on Alfie")
})


document.querySelector(".testpress2").addEventListener("click", function(){
document.querySelector("body").style.backgroundColor = "pink";
})


// // SOUND BUTTON

// document.querySelector("button").addEventListener("click", handleClick)

// function handleClick() {
//   var audio = new Audio("https://cdn.glitch.com/6474022d-556c-412f-acb3-b07df7d49bfd%2Fdumplings%20x.mp3?v=1610714032526");
  
//   audio.play();
// audio.preventDefault();
// }

function togglePlay() {
  var myAudio = document.getElementById("myAudio");
  return myAudio.paused ? myAudio.play() : myAudio.pause();
};

// the green button disappears and the second alert appears

// $("#new").toggle(function(){
//   alert("love alfie");
// },
//     function() {
//   alert("delish mr enoch");
// });



// var music = new Audio();
// function playMusic(file) {
//     music.pause();
//     music = new Audio(file);
//     music.play();
// }



//     function play() {
      
//     var audio = document.getElementById('audio');
//         if (audio.pause()) {
//             audio.play();
//             $('#play').removeClass('glyphicon-play-circle')
//             $('#play').addClass('glyphicon-pause')
//         }else{
//             audio.pause();
//             audio.currentTime = 0
//             $('#play').addClass('glyphicon-play-circle')
//             $('#play').removeClass('glyphicon-pause')
//         }
//     }

// function voiceOn (){
//   document.querySelector("button").addEventListener("click", handleClick)

// function handleClick() {
//   var audio = new Audio("https://cdn.glitch.com/6474022d-556c-412f-acb3-b07df7d49bfd%2Fdumplings%20x.mp3?v=1610714032526");
//   audio.play();
//   $(this).on("click", voiceOff);
// }
    
// }

// function voiceOff(){
  
//     document.querySelector("button").addEventListener("click", handleClick1)

// function handleClick1() {
//   var audio = new Audio("https://cdn.glitch.com/6474022d-556c-412f-acb3-b07df7d49bfd%2Fdumplings%20x.mp3?v=1610714032526");
//   audio.pause();
  
//   $(this).on("click", voiceOn);
// }
// }
  
// $("button").on("click", voiceOn)



// $(".two").on("click", function(eve){
//   $("body").css("background-color", "black");
  
// });



// BUTTONNNNNNN CLICK TO YELLOW, CLICK AGAIN IT BECOMES BLACK!!!!!
function firstcol () {
  
  $("body").css("background-color", "white");
  $(this).on("click", secondCol);
}

function secondCol () {

  $("body").css("background-color", "black");
  $(this).on("click", firstcol);
}

$(".two").on("click", firstcol)


document.querySelector("button").addEventListener("click", handleClick)

function handleClick() {
  var audio = new Audio("https://cdn.glitch.com/6474022d-556c-412f-acb3-b07df7d49bfd%2Fdumplings%20x.mp3?v=1610714032526");
  
  audio.play();

}
