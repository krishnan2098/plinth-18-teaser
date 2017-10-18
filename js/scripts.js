function removeDom(){
  var loaderElement = document.getElementById("loader");
  loaderElement.parentNode.removeChild(loaderElement);
}

function removeDom1(){
  var loaderElement = document.getElementById("loader-1");
  loaderElement.parentNode.removeChild(loaderElement);
}

window.requestAnimFrame = (function() {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };
})();

var C = document.getElementById("C");
var ctx = C.getContext("2d");

var num = 2000; //you can change the number of stars here
var added_mass = 0; //number of stars eaten :D
var holeRadius = 30;
var radiusLimit = (C.width + C.height) / 6;
var hole_volume = 0;
var G = .013; //represents the constant of gravity in the system
var tap = ('ontouchstart' in window || navigator.msMaxTouchPoints)
  ? 'touchstart'
  : 'mousedown';
var flag = 0;

var R = [];
var star = function(x, y, r, volume, color, angle, orbitRadius, angularSpeed, randomSpeed0, acceleration, type, pointerX, pointerY) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.volume = volume;
  this.color = color;
  this.angle = angle;
  this.orbitRadius = orbitRadius;
  this.angularSpeed = angularSpeed;
  this.randomSpeed0 = randomSpeed0;
  this.acceleration = acceleration;
  this.type = type;
  this.pointerX = pointerX;
  this.pointerY = pointerY;
};

function makeStar(new_star) {
  var x,
    y,
    r,
    volume,
    color,
    angle,
    orbitRadius,
    angularSpeed,
    randomSpeed0,
    acceleration;

  x = C.width / 2;
  y = C.height / 2;
  r = Math.random() * 2 + .5;
  volume = (4 / 3) * Math.PI * Math.pow(r, 3);
  color = "rgba(255,255,255,1)";
  angle = Math.random() * (2 * Math.PI);

  if (new_star == 0) {
    orbitRadius = (Math.random() * (C.width + C.height)) / 3;
  } else {
    orbitRadius = Math.sqrt((C.width / 2 - C.width) * (C.width / 2 - C.width) + (C.height / 2 - C.height) * (C.height / 2 - C.height)) + Math.random() * 200;
  }

  angularSpeed = .3 * Math.random() * (Math.PI / orbitRadius);
  randomSpeed0 = Math.random() * (Math.PI / (10 * orbitRadius));
  acceleration = 0;

  R.push(new star(x, y, r, volume, color, angle, orbitRadius, angularSpeed, randomSpeed0, acceleration, 0, 0, 0));
}

function init() {
  for (var i = 0; i < num; i++) {
    makeStar(0);
  }
}

function setCanvasSize() {
  C.width = window.innerWidth;
  C.height = window.innerHeight;

  radiusLimit = (C.width + C.height) / 10;
}

function setBG() {
  ctx.fillStyle = "rgba(20,20,24,.2)";
  ctx.fillRect(0, 0, C.width, C.height);
}

function drawCenter() {
  ctx.fillStyle = "#111";
  ctx.shadowColor = "#fff";
  ctx.shadowBlur = .2 * holeRadius;

  ctx.beginPath();
  ctx.arc(C.width / 2, C.height / 2, holeRadius, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();

  ctx.shadowColor = "none";
  ctx.shadowBlur = 0;

  if (holeRadius <= radiusLimit) {
    holeRadius = 2 * Math.sqrt(added_mass / Math.PI) + 30;
  } else if (holeRadius > radiusLimit && flag == 0) {
    flag = 1;
    todo();
  }

}

function updateStar(i) {
  var star = R[i];

  star.x = C.width / 2 + Math.cos(star.angle) * star.orbitRadius;
  star.y = C.height / 2 + Math.sin(star.angle) * star.orbitRadius;

  star.angle += star.angularSpeed;

  star.acceleration = G * (star.r * hole_volume) / Math.pow(Math.abs(star.orbitRadius), 2) + 0.1;

  star.color = "rgba(255," + Math.round(255 * ((Math.abs(star.orbitRadius) - holeRadius) / 200)) + "," + Math.round(255 * ((Math.abs(star.orbitRadius) - holeRadius) / 200)) + ",1)";

  if (Math.abs(star.orbitRadius) >= holeRadius) {
    if (star.orbitRadius >= 0) {
      star.orbitRadius -= star.acceleration;
    } else {
      star.orbitRadius += star.acceleration
    }

  } else {
    added_mass += 20 * star.r;

    R.splice(i, 1);
    makeStar(1);

  }
}

function isVisible(star) {
  if (star.x > C.width || star.x + star.r < 0 || star.y > C.height || star.y + star.r < 0)
    return false;

  return true;
}

function drawStar(star) {
  ctx.fillStyle = star.color;

  ctx.beginPath();
  ctx.fillRect(star.x, star.y, star.r, star.r);
  ctx.fill();
}

function loop() {
  setBG();
  var star;

  hole_volume = (3 / 4) * Math.PI * Math.pow(holeRadius, 3);
  for (var i = 0; i < R.length; i++) {
    star = R[i];
    if (isVisible(star))
      drawStar(star);

    updateStar(i);
  }

  drawCenter();
  requestAnimFrame(loop);
}

window.addEventListener("resize", function() {
  setCanvasSize();
});

//setCanvasSize();
//setBG();
//init();
//loop();

// code for the click animations

function makeTouchStar(new_star, pointerX, pointerY) {
  var x,
    y,
    r,
    volume,
    color,
    angle,
    orbitRadius,
    angularSpeed,
    randomSpeed0,
    acceleration;

  distanceX = pointerX - C.width / 2;
  distanceY = pointerY - C.height / 2;
  x = C.width / 2;
  y = C.height / 2;
  r = Math.random() * 2 + .5;
  volume = (4 / 3) * Math.PI * Math.pow(r, 3);
  color = "rgba(255,255,255,1)";

  angle = Math.atan(distanceY / distanceX);
  orbitRadius = distanceX / Math.cos(angle);

  angularSpeed = Math.random() * (Math.PI / orbitRadius);
  randomSpeed0 = Math.random() * (Math.PI / (10 * orbitRadius));
  acceleration = 0;
  R.push(new star(x, y, r, volume, color, angle, orbitRadius, angularSpeed, randomSpeed0, acceleration, 1, pointerX, pointerY));
}

window.addEventListener(tap, function(e) {
  var limit = 200 * Math.random() + 50;
  for (var i = 0; i < limit; i++) {
    makeTouchStar(0, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY);
  }
}, false);
