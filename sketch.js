var trex;
var trex_running;
var groundImage;
var ground;
var invisibleGround;
var cloudImage;
var obstacleImage1;
var obstacleImage2;
var obstacleImage3;
var obstacleImage4;
var obstacleImage5;
var obstacleImage6;
var obstaclesGroup;
var cloudGroup;
var gameState = "play";
var score=0;
var collideImage;
var restartImage;
var restart;
var gameOverIMAGE;
var gameOver;
function preload() {

  //the images loaded into RAM are assigned to the variable trex_running
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");

  groundImage = loadImage("ground2.png");

  cloudImage = loadImage("cloud.png");

  obstacleImage1 = loadImage("obstacle1.png");

  obstacleImage2 = loadImage("obstacle2.png");

  obstacleImage3 = loadImage("obstacle3.png");

  obstacleImage4 = loadImage("obstacle4.png");

  obstacleImage5 = loadImage("obstacle5.png");

  obstacleImage6 = loadImage("obstacle6.png");
  
  collideImage = loadAnimation("trex_collided.png");
  
  restartImage= loadImage("restart.png");
  
  gameOverIMAGE = loadImage("gameOver.png");
  
  

}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(50, 180, 10, 10);
  
  restart = createSprite(300,50,20,20);
  restart.scale = 0.5;
  restart.visible= false;
  
  gameOver = createSprite(300,100,20,20);
  gameOver.scale = 0.5;
  gameOver.visible=false;

  trex.scale = 0.5;

  //assign the animation to the trex sprite
  trex.addAnimation("trex", trex_running);
  
  trex.addAnimation("collided", collideImage);
  
  // adding gameOver and restart function to game
  
  restart.addImage("restart", restartImage);
  gameOver.addImage("gameOver", gameOverIMAGE);

  
  ground = createSprite(300, 190, 600, 20);
  ground.addImage(groundImage);

  //create a ground sprite
  ground.x = ground.width / 2;
  ground.velocityX = -6;

  // create invisible ground
  invisibleGround = createSprite(300, 195, 600, 5);
  invisibleGround.visible = false;

  obstaclesGroup = new Group();
  cloudGroup = new Group();

}

function draw() {
  background(180);

  if(gameState == "play"){
  
    if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
     
     if (keyDown("space") && trex.y >= 168) {
    trex.velocityY = -13 ;
  }

  //add gravity
  trex.velocityY = trex.velocityY + 0.8;
    
  score=score+World.frameRate/60;
  score=Math.round(score);
    
    
  spawnClouds();

  spawnObstacles();
  
  if(trex.isTouching(obstaclesGroup)){
    gameState="end";
 }

}
   //end of gameState play
  
if(gameState == "end"){
  
  cloudGroup.setVelocityXEach(0);
  obstaclesGroup.setVelocityXEach(0);
  cloudGroup.setLifetimeEach(-1);
  obstaclesGroup.setLifetimeEach(-1);
  
  trex.changeAnimation("collided", collideImage);
  ground.velocityX=0;
  
  restart.visible=true;
  gameOver.visible = true;
}
  
  if(mousePressedOver(restart)) {
    reset();
  }

  // display score
  text("Score: "+ score,520,20)
        
  trex.collide(invisibleGround);

  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds

  if (World.frameCount % 100 === 0) {
    var cloud = createSprite(600, 190, 40, 10);
    cloud.y = Math.round(random(100, 120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;

    //assign lifetime to the variable
    t = 600 / 3;
    cloud.lifetime = t;

    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    cloudGroup.add(cloud);
  }

}

function spawnObstacles() {
  if (World.frameCount % 100 === 0) {
    var obstacle = createSprite(600, 170, 10, 40);
    obstacle.velocityX = -3;

    //generate random obstacles
    var rand = Math.round(random(1, 6));
    if (rand == 1) {
      obstacle.addImage(obstacleImage1);
    }

    if (rand == 2) {
      obstacle.addImage(obstacleImage2);
    }

    if (rand == 3) {
      obstacle.addImage(obstacleImage3);
    }

    if (rand == 4) {
      obstacle.addImage(obstacleImage4);
    }

    if (rand == 5) {
      obstacle.addImage(obstacleImage5);
    }

    if (rand == 6) {
      obstacle.addImage(obstacleImage6);
    }

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.43;

    t = 600 / 3;
    obstacle.lifetime = t;
    
    obstaclesGroup.add(obstacle);
}
}

   function reset(){
     score=0;
  gameState="play";
  restart.visible=false;
  gameOver.visible=false;
  obstaclesGroup.destroyEach();
  cloudGroup.destroyEach();
  trex.changeAnimation("trex", trex_running);
}