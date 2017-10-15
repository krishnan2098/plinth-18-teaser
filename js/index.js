var logo = document.getElementById("logo");
var text = document.getElementById("text");
var footer = document.getElementById("footer");
var wrapper = document.getElementById("wrapper");

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
  var id = setInterval(frame, 5);
  function frame() {
    if (pos == 0) {
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

  size = (window.innerWidth + window.innerHeight) / 7.5;
  console.log(size);
  wrapper.style.width = size +'px';

  fadeIn(logo, function(){
    move(logo, function(){
      fadeIn(text, function() {
        fadeIn(footer);
      });
    });
  });
}
