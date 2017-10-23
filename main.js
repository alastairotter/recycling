// defaults/start values ----------------------------------

var totalMoney = 0, 
    cansCollected = 0,
    cansPerBag = 5,
    bagsCollected = 0,
    buyBackPrice = 0.50;


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
            
        prices();
        updateButtons(); 
        save();
        timeLapse++;
        
        
    }, 1000);
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
        buyBackPrice: buyBackPrice
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
    buyBackPrice = loadGame.buyBackPrice;
    
    // load fields
    document.getElementById("cans-collected").innerHTML = cansCollected;
    document.getElementById("bags-collected").innerHTML = bagsCollected;
    document.getElementById("buyBackPrice").innerHTML = buyBackPrice;
    document.getElementById("totalMoney").innerHTML = totalMoney;
    
    


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
    document.getElementById("buyBackPrice").innerHTML = buyBackPrice;
    }

    
}


function sellCans() { 
    
    totalMoney = totalMoney + bagsCollected * buyBackPrice; 
    bagsCollected = 0;
    document.getElementById("bags-collected").innerHTML = bagsCollected;
    document.getElementById("totalMoney").innerHTML = totalMoney;
    document.getElementById("buyBackPrice").innerHTML = buyBackPrice;
    updateButtons();
    
    
    

}


