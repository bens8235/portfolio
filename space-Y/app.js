// Reset the rocket ship - count down from 3 and then move up off the screen and onto the moon. 

function moveRocket () {
    reset();
    count();
    setTimeout(moveUp,5000)
    setTimeout(function(){
        rocket.classList.add("rocket-move");
        rocket.style.height = "10%";
        rocket.style.width = "5%";
        rocket.classList.remove("rocket")
        flag.style.visibility ="visible";
    },8000)
}

let counter = 2

// countdown from 3 to launch 

function count () {
    setTimeout(function() {
        if (counter < 1) {
            counter = "LAUNCH"
    }
        countdown.innerHTML = counter.toString()
        if (counter !== "LAUNCH"){
            counter --
            count();
        }
    },1000)
    
}

//move rocket up 

function moveUp () {
    countdown.style.visibility = "hidden";
    let sound = new Audio("rocket-sound.wav");
    sound.play();
    rocket.animate(
        [
            { transform: "translateY(-800px)" },
            
        ],
        {
            duration: 3000,
            iterations: 1,
        },
    )
}

//reset everything so can click to launch again 

function reset () {
    counter = 2
    flag.style.visibility ="hidden";
    rocket.classList.remove("rocket-move");
    rocket.style.height = "";
    rocket.style.width = "";
    rocket.classList.add("rocket")
    let countdown = document.querySelector("#countdown");
    countdown.innerHTML = "3"
    countdown.style.visibility = "visible";
}

const rocket = document.querySelector(".rocket");
const flag = document.querySelector(".flag");
const launch = document.querySelector("#launch");

launch.addEventListener("click", moveRocket);





