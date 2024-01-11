# gem-clicker

About the game:

The objective of the game is to get to 2000 gems as fast as possible. You can hover over the upgrades with your mouse to find out what they do. Game has sound so make sure your computer is not on mute. 

User stories:

As a user, I can visit the page and see my current number of gems. As a user, I can click the giant gem and increase my number of gems by 1 per pickaxe. As a user, I can spend gems to buy upgrades. As a user I would like the gems to go up per second depepdning on which upgrade I buy. As a user I would like a timer to see how fast I can collect gems. As a user I would like animation when I click on the gem. As a user I would like the option to save the data when I refresh/close the screen and reset the game. As a user I would like it to be visual and see the upgrades I am purchasing. 

Tried putting all the code for the 3 upgrade event listeners inside the below function with 4 parameters but didn't work so reverted:

// Function will be used when clicking on upgrade in event listeners

function purchaseUpgrade(upgradeamount, upgrade, upgradecount, upgradecost) {
  if (count >= upgradeamount) {
    upgrade[upgrade.length - upgradecount].style.visibility = "visible";
    if (upgradeamount == upgrade1Amount) {
      countStep++;
    }
    count -= upgradeamount;
    counter.innerHTML = count;
    upgradeamount = Math.floor(upgradeamount * 1.5);
    upgradecost.innerHTML = upgradeamount;
    upgradecount++;
  }
}


