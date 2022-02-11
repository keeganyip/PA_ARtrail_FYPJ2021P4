var count = 0;
const nyptrail = trails.nyp.landmarks
const chinatowntrail = trails.chinatown.landmarks;

trail = localStorage.getItem('Trail');
if (trail == 'Chinatown') {
    var progress = localStorage.getItem('Chinatown Progress');
    progress = JSON.parse(progress);
    console.log(progress)
    for (let i = 0; i < progress.length; i++) {
        if (progress[i] == 1) {
            count++;
        }
    }
    if (chinatowntrail.length == count) {
        var buttoncomplete = document.getElementById("button_complete")
        buttoncomplete.innerHTML = "Complete Trail";
        buttoncomplete.parentElement.href = '../../congratsPageCT.html'
        console.log(buttoncomplete.parentElement);
    }
}
if (trail == 'NYP') {
if (localStorage.getItem('NYP Progress')) { // Progress exists
    var NYPPROGRESS = localStorage.getItem('NYP Progress');
    NYPPROGRESS = JSON.parse(NYPPROGRESS);
    console.log("PROGRESS", NYPPROGRESS);
    for (let i = 0; i < NYPPROGRESS.length; i++) {
        if (NYPPROGRESS[i] == 1) {
            count++;
        }
    }
    if (nyptrail.length == count) {
        document.getElementById("button_complete").innerHTML = "Complete Trail";
    }
} else {
    var progress = JSON.stringify([0, 0, 0, 0, 0, 0, 0, 0])
    console.log("PROGRESSS", progress);
    localStorage.setItem('NYP Progress', progress);
}
}