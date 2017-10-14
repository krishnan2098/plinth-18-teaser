var logo = document.getElementById("logo");
var text = document.getElementById("text");
var footer = document.getElementById("footer");
var wrapper = document.getElementById("wrapper");

function show() {
  var el = document.getElementById("wrapper");
  el.style.opacity = 1;
};

function hide() {
  var el = document.getElementById("wrapper");
  el.style.opacity = 0;
}

function fadeIn(el, callback) {
  var tick = function() {
    el.style.opacity = +el.style.opacity + 0.01;

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
  var id = setInterval(frame, 5);
  function frame() {
    if (pos == 10) {
      clearInterval(id);
      if(callback){
        callback();
      }
    } else {
      pos--;
      elem.style.marginTop = pos + 'px';
    }
  }
}

function todo() {
  logo.style.opacity = 0;
  text.style.opacity = 0;
  footer.style.opacity = 0;
  wrapper.style.opacity = 1;

  fadeIn(logo, function(){
    move(logo, function(){
      fadeIn(text, function() {
        fadeIn(footer);
      });
    });
  });
}
