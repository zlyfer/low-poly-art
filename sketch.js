var rings = [];
var colors = [
  'rgb(244, 67, 54)',
  'rgb(63, 81, 181)',
  'rgb(205, 220, 57)',
  'rgb(76, 175, 80)',
  'rgb(255, 152, 0)',
  'rgb(255, 87, 34)',
  'rgb(0, 150, 136)',
  'rgb(3, 169, 244)',
  'rgb(103, 58, 183)',
  'rgb(156, 39, 176)',
  'rgb(233, 30, 99)'
];
var ringindex = 0;
var showstart = true;
var wait = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  translate(width / 2, height / 2);
  frameRate(60);

  if (showstart) {
    if (wait < 300) {
      push();
      textSize(32);
      textAlign(CENTER);
      strokeWeight(5);
      text('Photosensitive Epilepsy Warning: Flashing Colors!', 0, -height / 3);
      text('Please close this website if you start to feel sick.', 0, -height / 3 + 32);
      pop();
    }
    if (wait > 300 && wait < 600) {
      push();
      textSize(32);
      textAlign(CENTER);
      strokeWeight(5);
      text('Press R to refresh manually.', 0, -height / 3);
      pop();
    }
    if (wait > 600 && wait < 900) {
      push();
      textSize(32);
      textAlign(CENTER);
      strokeWeight(5);
      text('Stare at the point.', 0, -height / 3);
      stroke(0);
      strokeWeight(20);
      point(0, 0);
      pop();
    }
    if (wait == 900) {
      showstart = false;
    }
    wait++;
  } else {
    init();
    for (let i = rings.length - 1; i >= 0; i--) {
      drawcircle(rings[i]);
    }
  }
}

function init() {
  if (rings.length < width / 25) {
    console.log(rings.length);
    if (rings.length == 0) {
      rings.push(gencircle(false));
    } else {
      rings.push(gencircle(rings[rings.length - 1]));
    }
  } else {
    rings[ringindex].color = random(colors);
    ringindex++;
    if (ringindex == rings.length) {
      ringindex = 0;
    }
  }
}

function gencircle(child) {
  let ring = {
    shape: [],
    color: random(colors)
  };
  let ri = 0;
  for (let i = 0; i < TAU; i += TAU / 90) {
    push();

    let length;
    if (child) {
      length = round(random(child.shape[ri].l + 10, child.shape[ri].l + 20));
    } else {
      length = round(random(10, 20));
    }

    let vector = p5.Vector.fromAngle(i).mult(length);
    ring.shape.push({
      x: vector.x,
      y: vector.y,
      l: length
    });
    pop();

    ri++;
  }
  return ring;
}

function drawcircle(ring) {
  push();
  fill(ring.color);
  stroke(0);
  strokeWeight(1);

  beginShape();
  ring.shape.forEach(s => {
    vertex(s.x, s.y);
  });
  endShape(CLOSE);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  console.log(keyCode);
  if (keyCode == 82) {
    ringindex = 0;
    showstart = true;
    wait = 0;
    rings = [];
  }
}