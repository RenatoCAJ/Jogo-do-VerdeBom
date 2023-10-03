let score = 0;
let maxScore = 20;
let balls = [];
let speed = 1;

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
  textSize(24);
  frameRate(60);
}

function draw() {
  background(220);

  if (score >= maxScore) {
    fill(0);
    text("Você atingiu a pontuação máxima!", width / 2, height / 2);
    noLoop();
  } else {
    // Cria novas bolinhas de forma aleatória
    if (frameCount % (60 / speed) == 0) {
      let ball = new Ball();
      balls.push(ball);
    }
// ...
for (let i = balls.length - 1; i >= 0; i--) {
  balls[i].update();
  balls[i].display();

  if (balls[i].contains(mouseX, mouseY)) {
    if (balls[i].type === "green") {
      score++;
    } else if (balls[i].type === "black") {
      if (score > 0) {
        score--; // Perde um ponto apenas se a pontuação for maior que zero
      }
    }
    balls.splice(i, 1);
  }

 // if (balls[i].y > height) {
   // balls.splice(i, 1);
  //}
}
// ...


    fill(0); // Define a cor do texto como preto
    text("Pontuação: " + score + " / " + maxScore, width / 2, 30);

    if (score < 5) {
      speed = 1;
    } else if (score < 10) {
      speed = 2;
    } else if (score < 15) {
      speed = 3;
    } else {
      speed = 4;
    }
  }
}


class Ball {
  constructor() {
    this.x = random(width);
    this.y = 0;
    this.diameter = 30;
    this.speed = random(1, 3) * speed;
    this.type = random() < 0.7 ? "green" : "black";
  }

  contains(x, y) {
    let d = dist(x, y, this.x, this.y);
    return d < this.diameter / 2;
  }

  update() {
    this.y += this.speed;
  }

  display() {
    noStroke();
    if (this.type === "green") {
      fill(0, 255, 0);
    } else {
      fill(0);
    }
    ellipse(this.x, this.y, this.diameter);
  }
}

function mousePressed() {
  if (score >= maxScore) {
    // Reseta o jogo se o jogador atingir a pontuação máxima
    score = 0;
    balls = [];
    speed = 1;
    loop();
  }
}