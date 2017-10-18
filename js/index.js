var logo = document.getElementById("logo");
var text = document.getElementById("text");
var footer = document.getElementById("footer");
var wrapper = document.getElementById("wrapper");
var icons = document.getElementById("icons")

function show() {
  wrapper.style.opacity = 1;
};

function hide() {
  wrapper.style.opacity = 0;
}

function fadeIn(el, callback) {
  var tick = function() {
    el.style.opacity = +el.style.opacity + 0.008;

    if (+ el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
    }
  };

  tick();
  if(callback) {
    callback();
  }
}

function move(elem, callback) {
  var pos = 140;
  var id = setInterval(frame, 1);
  function frame() {
    if (pos < 0) {
      clearInterval(id);
      if(callback){
        callback();
      }
    } else {
      pos-=3;
      elem.style.marginTop = pos + 'px';
    }
  }
}

function todo() {
  logo.style.opacity = 0;
  text.style.opacity = 0;
  footer.style.opacity = 0;
  wrapper.style.opacity = 1;
  if (window.innerWidth > window.innerHeight) {
    size = (window.innerWidth + window.innerHeight) / 7.5;
  }
  else if (window.innerWidth < window.innerHeight) {
    size = ((2 * window.innerWidth) + window.innerHeight) / 7.5;
  }
  wrapper.style.width = size +'px';
  icons.style.fontSize = size/9 +'px';

  fadeIn(logo, function(){
    move(logo, function(){
      fadeIn(text, function() {
        fadeIn(footer);
      });
    });
  });
}
