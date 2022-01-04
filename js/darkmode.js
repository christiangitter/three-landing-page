let dayNight = document.querySelector('.dayNight')
let body = document.querySelector('body')

dayNight.onclick = function() {
    //add the class dark to the body    
    body.classList.toggle('dark')
    dayNight.classList.toggle('active')
    }