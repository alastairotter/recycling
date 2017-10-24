// defaults/start values ----------------------------------

var totalMoney = 0, 
    cansCollected = 0,
    cansPerBag = 5,
    bagsCollected = 0,
    buyBackPrice = 0.50,
    totalCans = 0,
    buyBackPriceTimer = 0;

var loop;


// time lapse
var timeLapse = 0; 


// Load game vars -----------------------------------------

console.log(cansPerBag); 


window.onload = function () {
    if (localStorage.getItem("saveGame") !== null) {
        load();    
    }
    else { 
        setDefaults();
    }
    updateButtons();
    start();
}



function start() {
    
    loop = setInterval( function () { 
        housekeeping();       
        }, 10);
}


function housekeeping() { 
    prices();
    updateButtons(); 
    save();
    timeLapse++;
    updateTime();
}

function updateTime() { 
    document.getElementById("time-lapse").innerHTML = timeLapse;
    
}






function reset() { 
    
    clearInterval(loop);
    
    localStorage.removeItem("saveGame");
    
    setDefaults(); 
}

function setDefaults() { 
    
    var saveGame = {
            totalMoney: 0, 
            timeLapse: 0,
            cansCollected: 0, 
            cansPerBag: 5, 
            bagsCollected: 0,
            buyBackPrice: 0.50,
            totalCans: 0,
            buyBackPriceTimer: 0
        }
    
    localStorage.setItem("saveGame",JSON.stringify(saveGame));
    
    setTimeout( function () {
        load();
        start();
    })
    
        
        
}


function save() { 
    
    var saveGame = { 
        totalMoney: totalMoney, 
        timeLapse: timeLapse,
        cansCollected: cansCollected, 
        cansPerBag: cansPerBag, 
        bagsCollected: bagsCollected,
        buyBackPrice: buyBackPrice,
        totalCans: totalCans,
        buyBackPriceTimer: buyBackPriceTimer
    }
    

    localStorage.setItem("saveGame",JSON.stringify(saveGame));
    
     
}




function load() { 
    
    var loadGame = JSON.parse(localStorage.getItem("saveGame"));
    console.log(loadGame);
    
    totalMoney = loadGame.totalMoney, 
    timeLapse = loadGame.timeLapse,
    cansCollected = loadGame.cansCollected,
    cansPerBag = loadGame.cansPerBag,
    bagsCollected = loadGame.bagsCollected,
    buyBackPrice = loadGame.buyBackPrice,
    totalCans = loadGame.totalCans,
    buyBackPriceTimer = loadGame.buyBackPriceTimer;
    
    
//    totalMoney = +totalMoney;
//    totalMoney = +totalMoney.toFixed(2);
//    console.log(totalMoney.toFixed(2));
    
    // load fields
    document.getElementById("cans-collected").innerHTML = cansCollected;
    document.getElementById("bags-collected").innerHTML = bagsCollected;
    document.getElementById("buyBackPrice").innerHTML = buyBackPrice;
    document.getElementById("totalMoney").innerHTML = totalMoney;
    document.getElementById("totalCans").innerHTML = totalCans;
    
    


}


function updateButtons() { 

    if(bagsCollected === 0) { 
            document.getElementById("sellCans").className = "disabled";
        }
    else { 
        document.getElementById("sellCans").className = "enabled";
    }
}



function collectCans() { 
    
    cansCollected++;
    
        
    if(cansCollected === cansPerBag) { 
        bagsCollected++; 
        cansCollected = 0; 
        updateButtons();
    }
        
    document.getElementById("cans-collected").innerHTML = cansCollected;
    document.getElementById("bags-collected").innerHTML = bagsCollected;
    
}


function randomInt(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}



function prices() {
    
    
    buyBackPriceTimer--; 
    document.getElementById("timer1").innerHTML = buyBackPriceTimer;
    if(buyBackPriceTimer <= 0) { 
        
        buyBackPriceTimer = randomInt(500, 2500);
        buyBackPrice = randomInt(40,80) / 100;
        buyBackPrice = buyBackPrice.toFixed(2);
        document.getElementById("buyBackPrice").innerHTML = buyBackPrice;
    }
    
}


function sellCans() { 
    
    console.log("Total cans: " + totalCans);
    console.log("Bags: " + bagsCollected);
    
    totalCans = totalCans + (bagsCollected * cansPerBag);
    totalMoney = totalMoney + bagsCollected * buyBackPrice; 
    
    bagsCollected = 0;
    
    document.getElementById("bags-collected").innerHTML = bagsCollected;
    document.getElementById("totalMoney").innerHTML = totalMoney.toFixed(2);
    document.getElementById("buyBackPrice").innerHTML = buyBackPrice;
    document.getElementById("totalCans").innerHTML = totalCans;
    updateButtons();
    
    
    

}


