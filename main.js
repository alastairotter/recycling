// defaults/start values ----------------------------------

var totalMoney = 0, 
    cansCollected = 0,
    cansPerBag = 5,
    bagsCollected = 0,
    buyBackPrice = 0.50,
    totalCans = 0;


// time lapse
var timeLapse = 0; 


// Load game vars -----------------------------------------

console.log(cansPerBag); 


window.onload = function () {
    if (localStorage.getItem("saveGame") !== null) {
        load();    
    }
    updateButtons();
    start();
}



function start() {
    
    setInterval( function () { 
    housekeeping();       
        
        
        
    }, 500);
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
    localStorage.removeItem("saveGame");
    location.reload();
  
}


function save() { 
    
    var saveGame = { 
        totalMoney: totalMoney, 
        timeLapse: timeLapse,
        cansCollected: cansCollected, 
        cansPerBag: cansPerBag, 
        bagsCollected: bagsCollected,
        buyBackPrice: buyBackPrice,
        totalCans: totalCans
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
    totalCans = loadGame.totalCans;
    
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
    totalCans++;
        
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
    
    var check = randomInt(0,100);
    if(check < 10) { 
    buyBackPrice = randomInt(40,80) / 100;
    buyBackPrice = buyBackPrice.toFixed(2);
    document.getElementById("buyBackPrice").innerHTML = buyBackPrice;
    }

    
}


function sellCans() { 
    
    totalMoney = totalMoney + bagsCollected * buyBackPrice; 
    bagsCollected = 0;
    totalCans = totalCans + bagsCollected * cansPerBag;
    
    document.getElementById("bags-collected").innerHTML = bagsCollected;
    document.getElementById("totalMoney").innerHTML = totalMoney.toFixed(2);
    document.getElementById("buyBackPrice").innerHTML = buyBackPrice;
    document.getElementById("totalCans").innerHTML = totalCans;
    updateButtons();
    
    
    

}


