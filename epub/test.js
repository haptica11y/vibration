var curVibe = 0;
var tmint;

function initGraph() {

    document.body.addEventListener("touchmove", buzzPos, false);
    document.body.addEventListener("touchend", buzzStop, false);

    tmint = window.setInterval(buzzTime, 100);
}

function buzzTime() {
    window.navigator.vibrate(curVibe);
}

function buzzPos(event) {

    event.preventDefault();

    e = document.elementFromPoint(event.touches.item(0).clientX, event.touches.item(0).clientY);
  
    curVibe = 0;

    if (e.id == "f1") { window.navigator.vibrate(75); curVibe = 75; }
    if (e.id == "li") { window.navigator.vibrate(75); curVibe = 75; }

}

function buzzStop() {

    event.preventDefault();

    window.navigator.vibrate(0);
    curVibe = 0;
}

