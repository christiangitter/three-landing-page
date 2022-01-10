var i = 0;

function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 20);
    function frame() {
      if (width >= 85) {
        clearInterval(id);
        i = 0;
      } else {
        if(width >=80) {
          elem.style.backgroundColor = 'palevioletred';
        }
        else {
          elem.style.backgroundColor = 'rgb(122, 202, 122)';
        }
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}

move();