function show() {
  var el = document.getElementById("wrapper");
  el.style.opacity = 1;
};

function hide() {
  var el = document.getElementById("wrapper");
  el.style.opacity = 0;
}

function fadeIn(el) {

  var tick = function() {
    el.style.opacity = +el.style.opacity + 0.01;


    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
    }
  };

  tick();
}


function move(elem) {
  var pos = 140;
  var id = setInterval(frame, 5);
  function frame() {
    if (pos == 10) {
      clearInterval(id);
    } else {
      pos--;
      elem.style.marginTop = pos + 'px';
    }
  }
}

function todo() {
  var logo = document.getElementById("logo");
  logo.style.opacity = 0;
  var text = document.getElementById("text");
  text.style.opacity = 0;
  var footer = document.getElementById("footer");
  footer.style.opacity = 0;
  var wrapper = document.getElementById("wrapper");
  wrapper.style.opacity = 1;

  fadeIn(logo);
  move(logo);
  fadeIn(text);
  fadeIn(footer);
}
