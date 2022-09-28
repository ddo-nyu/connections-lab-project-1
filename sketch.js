function setup() {
    createCanvas(window.outerWidth, window.outerHeight);
    background('black');
    noStroke();
    circle(window.outerWidth/2, window.outerHeight/2, 500, 500);
    fill('red');
    filter(BLUR, 10);
}

function draw() {

}