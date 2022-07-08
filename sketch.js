var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player,player_image,player_animation;

var invisibleGround;
var backGround,bgImage;
var ground;
var car1,car2,car3,car4;

var obstacle;
var score=0;

var gameover;
var gameover_image,gameover_sound;

function preload() {

  player_image = loadAnimation("animation/image 1.png");
  bgImage = loadImage("bg image.jpg");
  car1 = loadImage("car1.png");
  car2 = loadImage("car2.png");
  car3 = loadImage("car3.png");
  car4 = loadImage("car4.png");
   
  animation = loadAnimation("animation/image 1.png","animation/image 2.png","animation/image 3.png","animation/image 4.png");

  
  gameover_image = loadImage("game over.png");
  gameover_sound = loadSound("gameover.mp3");

}
function setup() {

  createCanvas(900,500);

  
  ground = createSprite(500,300,20,20);
  ground.addImage("ground",bgImage);
  ground.scale = 2.0;

  if (ground.x < 400){
    ground.x = ground.width;
  }


  player = createSprite(100,450,20,20);
  player.addAnimation("playerrunning",animation);
  player.addAnimation("player",player_image);
  player.scale = 0.7 ;

  player.setCollider("rectangle",0,0,60,150);

  player.debug = false;


  invisibleGround = createSprite(300,450,600,10);
  invisibleGround.visible = false;

  gameover = createSprite(450,250,30,30);
  gameover.addImage("gameover",gameover_image);
  gameover.visible = false;

  carGroup = new Group();




}
 
function draw() {
background("white");


if(gameState === PLAY){

  score = score + Math.round(getFrameRate()/60);
  ground.velocityX = -6;

  if (ground.x < 400){
    ground.x = ground.width;
  }
  
  if(keyDown("space") && player.y>300){
    player.velocityY = -6;
  }

  player.velocityY = player.velocityY +0.3

  Car();

  if(player.isTouching(carGroup)){
    gameState = END;
  }

}
else if(gameState === END){

  ground.velocityX = 0;
  player.velocityY = 0;

 player.changeAnimation("player",player_image);

  gameover.visible = true;

  gameover_sound.play();

  carGroup.setVelocityXEach(0);

}


player.collide(invisibleGround);

drawSprites();

textSize(20);
text("score:"+ score, 800,30);


}

function Car() {

  if(frameCount % 170 === 0){
    
    var obstacle = createSprite(890,450,20,20);
    obstacle.velocityX = -5;
  
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(car1);
              break;
      case 2: obstacle.addImage(car2);
              break;
      case 3: obstacle.addImage(car3);
              break;
      case 4: obstacle.addImage(car4);
              break;
      default: break;        
  }
 
obstacle.scale = 0.5;

carGroup.add(obstacle);
}



}