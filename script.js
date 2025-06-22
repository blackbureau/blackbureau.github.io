/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console

$("body").on("mousemove", function () {
  $("header").html("new future");
  $("body").css("background-color", "pink");
  //$("div.nothing").html("metaphorically speaking it's training wildernisses")
  $("div.mind").html("a constellation of objects");

  //$("div.nothing").fadeToggle(1000)
  //  $("div.mind").fadeToggle(2000)
  $("span").fadeToggle(4000);
});


var count = 0;
var text = ["trashy scenes", "nothing and everything", "the mind doing backflips"];

setInterval(function () {
  
  count = count + 1;
  
  var something = text[count]; 
  
}, 3000)

