$(document).on("mousemove",function(e){$("div.box").css("left",e.pageX),$("div.box").css("top",e.pageY)});
var angle=0,changeBackground=function(){angle+=.1,document.body.style.backgroundImage="linear-gradient("+angle+"deg, #040b26,#f6e0ff)",requestAnimationFrame(changeBackground)};changeBackground();
