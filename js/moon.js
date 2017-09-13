// var button = document.getElementsByTagName('button')[0],
//     Moon = document.getElementsByClassName("Moon")[0];

// button.onclick = function() {
  
//   Moon.classList.toggle("white-moon");
  
//   if (Moon.classList.contains("white-moon")) {
//       button.classList.add("blood-button");
//       button.textContent = "Blood Moon"
//       } else {
//         button.classList.remove("blood-button");
//       button.textContent = "White Moon"
//       }
// }

// Moon.streamTo(Moon , 1000 /*delay*/ );

$(document).ready(function(){
  var n=0;

  $('#moon').click(function(){

    if(n%2==0){
      $('#moon').addClass('crimson-moon');
      n++;

    }else{

      $('#moon').removeClass('crimson-moon');
      n++;
      
    }
  }); 

});