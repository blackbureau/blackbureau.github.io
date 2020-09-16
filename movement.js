var angle = 0;

var changeBackground = function () {
  
  angle = angle + .7;
  
  document.body.style.backgroundImage = "linear-gradient("+ angle + "deg, #f173fa, #7cfa73)"
  
  requestAnimationFrame(changeBackground)
}

changeBackground()
