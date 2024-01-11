// getting elements from HTML and setting variables needed in script

//Regarding gems:

const gem = document.getElementById("gem"); // gem image
const gems = document.getElementsByClassName("gems"); //4 gems in middle of big gem
let counter = document.getElementById("gem-count"); //number of gems in HTML
let count = 0; //Initial gem count
let gemThiefCount = 0; //Initial number of gem thief

const gemsGroup1 = document.getElementsByClassName("group1"); //first group of gems to pop out of thief on click
const gemsGroup2 = document.getElementsByClassName("group2"); //second group of gems to pop out of thief on click
const gemsGroup3 = document.getElementsByClassName("group3"); //third group of gems to pop out of thief on click

let countStep = 1; // number gems will go up when clicking gem

const gemMovement = [
  { transform: "translateY(-80px)" }, //Setting array of animation on 4 gems to move them
  { transform: "translateY(80px)" },
  { transform: "translateX(-80px)" },
  { transform: "translateX(80px)" },
];

const gemTiming = {
  //setting timing for 4 gem animation
  duration: 300,
  iterations: 1,
};

// Getting hold of gemthief images

const gemThief1 = document.getElementById("gemthief1");
const gemThief2 = document.getElementById("gemthief2");
const gemThief3 = document.getElementById("gemthief3");

//animation for thiefs to move accross screen

const gemThiefMovementMinus = [{ transform: "translateX(-1200px" }];

//timing for thief animation

const gemThiefTiming = {
  duration: 8000,
  iterations: 1,
};

//Regarding pick-axes:

const pick = document.getElementById("pick"); //Initial pick
const pickAxes = document.getElementsByClassName("pick-axe"); //all pick axes images
let pickaxeCount = 1; //How many pickaxes user has

const pickSpin = [{ transform: "rotate(-90deg)" }]; //Setting rotation for pick

const pickTiming = {
  //setting timer for pick animation
  duration: 300,
  iterations: 1,
};

//Regarding miners:

const miners = document.getElementsByClassName("miner"); //all miner images
let minerCount = 0; //starting number of miners

//Regarding mining-carts:

const carts = document.getElementsByClassName("cart"); //all cart images
let cartCount = 0; //starting number of carts
//Regarding upgrades:

let upgrade1Cost = document.getElementById("upgrade1-cost"); //cost of upgrade1 in HTML
let upgrade1Amount = 20; //starting cost of upgrade 1
const upgrade1 = document.getElementById("upgrade1"); //Upgrade 1 button

let upgrade2Cost = document.getElementById("upgrade2-cost");
let upgrade2Amount = 100;
const upgrade2 = document.getElementById("upgrade2");

let upgrade3Cost = document.getElementById("upgrade3-cost");
let upgrade3Amount = 300;
const upgrade3 = document.getElementById("upgrade3");

//Regarding Timer

const seconds = document.getElementById("seconds"); //00 in html
const minutes = document.getElementById("minutes"); //00 in html

let secondCounter = 0;
let minuteCounter = 0;

//Gems per second HTML to use later.

let gemsPerSecondHTML = document.getElementById("gps");

//Reset button

const reset = document.getElementById("reset");

//Timer function to be used in Setinterval function later

function timer() {
  secondCounter++;
  if (secondCounter < 10) {
    seconds.innerHTML = "0" + secondCounter.toString();
  } else if (secondCounter % 60 === 0) {
    minuteCounter++;
    secondCounter = 0;
    seconds.innerHTML = "0" + secondCounter.toString();
    if (minuteCounter < 10) {
      minutes.innerHTML = "0" + minuteCounter.toString();
    } else {
      minutes.innerHTML = minuteCounter;
    }
  } else {
    seconds.innerHTML = secondCounter;
  }
}

//Will be used in setinterval function later for the computer to check if upgrade can
//be purchased and then activating button.

function purchaseButton(upgrade, amount) {
  if (count >= amount) {
    upgrade.classList.add("purchase");
  } else {
    upgrade.classList.remove("purchase");
  }
}

//updating local storage function

function updateLocalStorage() {
  myObj = {
    count: count,
    countStep: countStep,
    minerCount: minerCount,
    cartCount: cartCount,
    pickaxeCount: pickaxeCount,
    upgrade1Amount: upgrade1Amount,
    upgrade2Amount: upgrade2Amount,
    upgrade3Amount: upgrade3Amount,
  };
  localStorage.setItem("myObj", JSON.stringify(myObj));
}

//function to load storage on refresh/page load

function getLocalStorage() {
  if (JSON.parse(localStorage.getItem("myObj")) !== null) {
    const obj = JSON.parse(localStorage.getItem("myObj"));
    count = obj.count;
    countStep = obj.countStep;
    minerCount = obj.minerCount;
    cartCount = obj.cartCount;
    pickaxeCount = obj.pickaxeCount;
    upgrade1Amount = obj.upgrade1Amount;
    upgrade2Amount = obj.upgrade2Amount;
    upgrade3Amount = obj.upgrade3Amount;
    for (let i = 1; i < pickaxeCount; i++) {
      pickAxes[pickAxes.length - pickaxeCount - i].style.visibility = "visible";
    }
    for (let i = 0; i < minerCount; i++) {
      miners[miners.length - minerCount - i].style.visibility = "visible";
    }
    for (let i = 0; i < cartCount; i++) {
      carts[carts.length - cartCount].style.visibility = "visible";
    }
  }
}

//function to reset game

function resetScreen() {
  if (count >= 2000) {
    setTimeout(function () {
      document.querySelector("#you-win h2").style.visibility = "hidden";
    }, 5000);
  }
  for (let i = 0; i < pickAxes.length; i++) {
    pickAxes[i].style.visibility = "hidden";
  }
  for (let i = 0; i < miners.length; i++) {
    miners[i].style.visibility = "hidden";
  }
  for (let i = 0; i < carts.length; i++) {
    carts[i].style.visibility = "hidden";
  }

  localStorage.clear();
  count = 0;
  countStep = 1;
  minerCount = 0;
  cartCount = 0;
  pickaxeCount = 1;
  minerCount = 0;
  upgrade1Amount = 20;
  upgrade2Amount = 100;
  upgrade3Amount = 300;
  secondCounter = 0;
  minuteCounter = 0;
}

//function to make gem thief images/text visible and keep track of count for logic

function gemThief(id) {
  gemThiefCount++;
  id.style.visibility = "visible";
  document.getElementById("flashing").style.visibility = "visible";
  document.getElementById("click").style.visibility = "visible";
}

//function to control gem moving animation

function gemMove(array) {
  for (let i = 0; i < array.length; i++) {
    array[i].style.visibility = "visible";
  }
  for (let i = 0; i < array.length; i++) {
    array[i].animate(gemMovement[i], gemTiming);
  }
  setTimeout(function () {
    for (let i = 0; i < array.length; i++) {
      array[i].style.visibility = "hidden";
    }
  }, 200);
}

//reset screen when clicking reset

reset.addEventListener("click", resetScreen);

//clicking gem

gem.addEventListener("click", function () {
  count += countStep;
  counter.innerHTML = count;
  pick.animate(pickSpin, pickTiming);
  for (let picks of pickAxes) {
    picks.animate(pickSpin, pickTiming);
  }
  let sound = new Audio("pickaxe.mp3");
  sound.play();
  gemMove(gems);
  updateLocalStorage();
});

//buying upgrades

upgrade1.addEventListener("click", function () {
  if (count >= upgrade1Amount) {
    let b1 = new Audio("buy.mp3");
    b1.play();
    pickAxes[pickAxes.length - pickaxeCount].style.visibility = "visible";
    countStep++;
    count -= upgrade1Amount;
    counter.innerHTML = count;
    upgrade1Amount = Math.floor(upgrade1Amount * 1.5);
    upgrade1Cost.innerHTML = upgrade1Amount;
    pickaxeCount++;
    updateLocalStorage();
  }
});

upgrade2.addEventListener("click", function () {
  if (count >= upgrade2Amount) {
    let b2 = new Audio("buy.mp3");
    b2.play();
    minerCount++;
    miners[miners.length - minerCount].style.visibility = "visible";
    count -= upgrade2Amount;
    counter.innerHTML = count;
    upgrade2Amount = Math.floor(upgrade2Amount * 1.5);
    upgrade2Cost.innerHTML = upgrade2Amount;
    updateLocalStorage();
  }
});

upgrade3.addEventListener("click", function () {
  if (count >= upgrade3Amount) {
    let b3 = new Audio("buy.mp3");
    b3.play();
    cartCount++;
    carts[carts.length - cartCount].style.visibility = "visible";
    count -= upgrade3Amount;
    counter.innerHTML = count;
    upgrade3Amount = Math.floor(upgrade3Amount * 1.5);
    upgrade3Cost.innerHTML = upgrade3Amount;
    updateLocalStorage();
  }
});

//Gems go up depending on how many miners (other upgrades). Timer also increases.
//Also activate thiefs on 500, 1000 & 1500 gems. Also control end game.

const perSecond = setInterval(function () {
  count += 4 * minerCount;
  count += 16 * cartCount;
  counter.innerHTML = count;
  upgrade1Cost.innerHTML = upgrade1Amount;
  upgrade2Cost.innerHTML = upgrade2Amount;
  upgrade3Cost.innerHTML = upgrade3Amount;
  timer();
  updateLocalStorage();
  if (count > 500 && gemThiefCount === 0) {
    gemThief(gemThief1);
  }
  if (count > 1000 && gemThiefCount === 2) {
    gemThief(gemThief2);
  }
  if (count > 1500 && gemThiefCount === 4) {
    gemThief(gemThief3);
  }
  if (gemThiefCount === 1) {
    let thiefBox = document.getElementById("thief");
    thiefBox.animate(gemThiefMovementMinus, gemThiefTiming);
    count -= 30;
    gemThief1.addEventListener("click", function () {
      let s1 = new Audio("decide.mp3");
      s1.play();
      gemMove(gemsGroup1);
      gemThief1.style.visibility = "hidden";
      document.getElementById("flashing").style.visibility = "hidden";
      document.getElementById("click").style.visibility = "hidden";
      gemThiefCount = 2;
    });
  }
  if (gemThiefCount === 3) {
    let thiefBox = document.getElementById("thief");
    thiefBox.animate(gemThiefMovementMinus, gemThiefTiming);
    count -= 30;
    gemThief2.addEventListener("click", function () {
      let s2 = new Audio("decide.mp3");
      s2.play();
      gemMove(gemsGroup2);
      gemThief2.style.visibility = "hidden";
      document.getElementById("flashing").style.visibility = "hidden";
      document.getElementById("click").style.visibility = "hidden";
      gemThiefCount = 4;
    });
  }
  if (gemThiefCount === 5) {
    let thiefBox = document.getElementById("thief");
    thiefBox.animate(gemThiefMovementMinus, gemThiefTiming);
    count -= 30;
    gemThief3.addEventListener("click", function () {
      let s3 = new Audio("decide.mp3");
      s3.play();
      gemMove(gemsGroup3);
      gemThief3.style.visibility = "hidden";
      document.getElementById("flashing").style.visibility = "hidden";
      document.getElementById("click").style.visibility = "hidden";
      gemThiefCount = 6;
    });
  }
  if (count >= 2000) {
    document.getElementById("gems-2000").style.visibility = "hidden";
    const win = document.createElement("h2");
    win.innerText = `You win with ${count} gems with a time of ${minuteCounter} minutes & ${secondCounter} seconds!`;
    document.getElementById("you-win").appendChild(win);
    const refresh = document.createElement("h2");
    refresh.innerText = "Refresh if you want to play again";
    document.getElementById("you-win").appendChild(refresh);
    resetScreen();
    counter.innerHTML = count;
    clearInterval(perSecond);
  }
}, 1000);

// Checking if can afford upgrade then activating button

const perDeciSecond = setInterval(function () {
  purchaseButton(upgrade1, upgrade1Amount);
  purchaseButton(upgrade2, upgrade2Amount);
  purchaseButton(upgrade3, upgrade3Amount);
  let gemsPerSecond = 16 * cartCount + 4 * minerCount;
  gemsPerSecondHTML.innerHTML = gemsPerSecond;
  updateLocalStorage();
}, 100);

getLocalStorage();
