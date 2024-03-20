
let counter = 0;
let idle= [];
let victory = [];
let attack = [];
let slime;
let hurt = [];
let idleframes = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20"];
let victframes = ["28","29","30","31","32","33","34","35","36"];
let frame = 0;
let sframe = 0;
let mode = 0;
let loX, loY, speedX, speedY, srot, soX, soY;
let timer;

function setup(frame) {
  createCanvas(500,500);
  background(20);
  fill(255);
  angleMode(DEGREES);
  loX = 50;
  loY = 180;
  soX = 280;
  soY = 280;
  timer = 0;
  sframe = 0;
  speedX = random(10,20);
  speedY = random(10,20);
  srot=0;
    for (let i = 0; i < 20; i++) {
        idle[i] = loadImage("assets/idle/idle_"+idleframes[i]+".png");
    }
    for (let i = 0; i < 9; i++) {
        victory[i] = loadImage("assets/victory/levelcomplete_"+victframes[i]+".png");
    }
    for (let i = 0; i < 5; i++) {
        attack[i] = loadImage("assets/attack/attack_"+idleframes[i]+".png");
    }
    for (let i = 0; i < 4; i++) {
        hurt[i] = loadImage("assets/hurt/hurt_"+idleframes[i]+".png");
    }
    slime = loadImage("assets/slime_00.png");
}

function draw() {
  background(255);
  
  //if(timer < 60){
  //    mode = 0;
  //}
    if(mode != 0 && mode!=2) {
        timer += 1;
    }
  if (timer > 59 && timer < 80 && mode != 1) {
      frame = 1;
      mode = 1;
  }
  else if(timer > 40 && mode != 2){
      frame = 0;
      mode = 2;
  }
    switch(mode) {
        case 0 :
            frame += 1;
            if (frame > 19) {
                frame = 0;
            }
            peppinoidle(50, 180)
            break;
        case 1 :
            frame += 1;
            if(loX < 180) {
                loX += 20;
            }
            
            peppinoattack(loX, 180);
            break;
        case 2 :
            if (frame < 8) {
                frame += 1;
            }
            soX += speedX;
            soY += speedY;
            if(soX > 420 || soX < 10){
                speedX = -speedX;
            }
            if(soY > 430 || soY < 10){
                speedY = -speedY;
            }
            peppinovictory(170, 180)
            break;
        
    }
   
}

function peppinoidle(loX,loY){
    
    image(idle[frame],loX,loY, 200, 200);
    slimeidle(280, 315);
}
function peppinovictory(loX,loY){

    image(victory[frame],loX,loY, 200, 200);
    slimehurt(soX, soY);
}
function peppinoattack(loX,loY){
    if (frame > 0 && frame < 5) {
        image(attack[0],loX,loY, 200, 200);
        slimeidle(280, 315);
    }
    else if (frame > 4 && frame < 15) {
        image(attack[1],loX,loY, 200, 200);
        slimeidle(280, 315);
    }
    else if (frame > 14 && frame < 25) {
        image(attack[2],loX,loY, 200, 200);
        slimehurt(235, 180);
        
    }
    else if (frame > 24) {
        image(attack[3],loX,loY, 200, 200);
        slimehurt(soX,soY);
        if(soX < 420) {
            soX += 20;
        }
    }
}

function slimeidle(loX, loY){
    image(slime,loX,loY, 100, 60);
}
function slimehurt(sosX, sosY){
    sframe += 1;
    if (sframe > 1){
        sframe = 0;
    }
    srot += 1;
    image(hurt[sframe],sosX,sosY, 100, 60);
}

function keyPressed(){
    if(mode == 0){
        mode = 1;
        frame = 1;
    }else if(mode != 0){
        frame = 1;
        mode = 0;
    }
}