var count = 0;
const nyp = trails.nyp.landmarks


if (localStorage.getItem('NYP Progress')) { // Progress exists
    var NYPPROGRESS = localStorage.getItem('NYP Progress');
    NYPPROGRESS = JSON.parse(NYPPROGRESS);
    console.log("PROGRESS",NYPPROGRESS);
    for(let i = 0; i < NYPPROGRESS.length; i++){
        if(NYPPROGRESS[i] == 1){
        count++;
    }
    }    
    if (nyp.length==count){
        document.getElementById("button_complete").innerHTML = "Complete";
    }
}
else {
    var progress = JSON.stringify([0, 0, 0, 0, 0, 0, 0, 0])
    console.log("PROGRESSS",progress);
    localStorage.setItem('NYP Progress', progress);
}