var logoEl = document.querySelector('.logo-animation');
var logoEl1 = document.querySelector('.logo-animation-1');
var pathEls = document.querySelectorAll('.logo-animation path:not(.icon-curve)');
var innerWidth = window.outerWidth;
var maxWidth = 1200;
var logoScale = innerWidth <= maxWidth ? innerWidth / maxWidth : 1;
var logoTimeline = anime.timeline();

logoEl.style.webkitTransform = 'translateY(50px) scale('+logoScale+')';
logoEl.style.MozTransform = 'translateY(50px) scale('+logoScale+')';
logoEl.style.OTransform = 'translateY(50px) scale('+logoScale+')';
logoEl.style.transform = 'translateY(50px) scale('+logoScale+')';

logoEl1.style.webkitTransform = 'translateY(50px) scale('+logoScale+')';
logoEl1.style.MozTransform = 'translateY(50px) scale('+logoScale+')';
logoEl1.style.OTransform = 'translateY(50px) scale('+logoScale+')';
logoEl1.style.transform = 'translateY(50px) scale('+logoScale+')';

for (var i = 0; i < pathEls.length; i++) {
  var el = pathEls[i];
  el.setAttribute('stroke-dashoffset', anime.setDashoffset(el));
}

logoTimeline

  .add({
  targets: '.fill.in',
  strokeDashoffset: {
    value: [anime.setDashoffset, 0],
    duration: 1000,
    delay: function(el, i, t) { return ( i * 100 ); },
    easing: 'easeOutQuart'
  },
  stroke: {
    value: ['#FFF', function(el) { return anime.getValue(el.parentNode, 'stroke') } ],
    duration: 1000,
    delay: 0,
    easing: 'easeInQuad'
  },
  opacity: {
    value: 0,
    duration: 1,
    delay: function(el, i, t) { return 1900 + ( i * 80 ); },
  },
  offset: 0
})
  .add({
  targets: '.fill.out',
  strokeDashoffset: [
    { value: [anime.setDashoffset, anime.setDashoffset],
      duration: 1890 },
    {
      value: [0, anime.setDashoffset],
      duration: 1000,
      delay: function(el, i) { return (i * 80); },
      easing: 'easeInQuart'
    }
  ],
  complete: function(anim) {
    removeDom();
    removeDom1();
    setCanvasSize();
    setBG();
    init();
    loop();
  },
  offset: 0
});
