
var monkey , monkeyImg;
var banana ,bananaImg;
var obstacle, stoneImg;
var FoodGroup, stoneGroup;
var score,ground,groundImg;
var invisibleGrouund;
var score=2;     
var score1=0;
var PLAY=1;
var END=0;
var gameState=PLAY;
var gameOverImg,gameOver;
var clapSound,overSound;
var night,nightImg;
var good,goodImg;
var restart,restartImg;
var note,noteImg;

function preload(){
  
 monkeyImg =loadAnimation
 ("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  gameOverImg=loadImage("over.jpg");
  bananaImg = loadImage("banana.png");
  stoneImg = loadImage("obstacle.png");
  grassImg=loadImage("22.png");
  clapSound=loadSound("clap.wav");
  overSound=loadSound("sound.wav");
  nightImg=loadImage("night.jpg");
  goodImg=loadImage("download.jpg");
  restartImg=loadImage("restart.png");
  noteImg=loadImage("TEXT.png");
}



function setup() {
  
  createCanvas(600,600);
  
  ground=createSprite(300,270,20,20);
  ground.addImage("grass",grassImg);
  ground.scale=1.8;
  ground.velocityX=-4;    
  
  night=createSprite(300,280,20,20)
  night.addImage("night",nightImg);
  night.scale=2;
  night.visible=false;
  night.velocityX=-4;
  
  good=createSprite(300,110,20,20)
  good.addImage("new",goodImg);
  good.scale=2;
  good.velocityX=-4;
  good.visible=false;
  
  monkey=createSprite(100,390,20,20);
  monkey.addAnimation("monkey",monkeyImg)
  monkey.scale=0.2;
  
  gameOver=createSprite(300,295,20,20)
  gameOver.addImage("over",gameOverImg)
  gameOver.scale=0.8;
  gameOver.visible=false;
  
  restart=createSprite(300,550,20,20)
  restart.addImage("res",restartImg);
  restart.scale=0.3;
  restart.visible=false;
  
  note=createSprite(300,100,20,20)
  note.addImage("text",noteImg);
  note.visible=false;
  
  invisibleGround=createSprite(300,460,600,5)
  invisibleGround.visible=false;
  
  bananaGroup=new Group();
  stoneGroup=new Group();  
 
}


function draw() {
  
  
  
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(invisibleGround);
  
  //gameState=PLAY
  if(gameState===PLAY){
    
  
  if(keyDown("space") && monkey.y>=200){
    monkey.velocityY=-16;
  }
    
    if(ground.x<0){
    ground.x=ground.width/2;
  }
    
  
    restart.visible=false;
    
    
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    score1=score1+2;
    clapSound.play();
    monkey.scale=0.2;
  }
    
    if(score1>15){
      monkey.scale=0.3;
      night.visible=true;
      if(night.x<0){
        night.x=night.width/2;
      }
    } 
    
    if(score1>35){
      monkey.scale=0.4;
      good.visible=true;
    
        if(good.x<0){
        good.x=good.width/2;
        monkey.visible=true;
      }
    } 
    
  if(score<1){
     gameState=END;
     overSound.play();
  }  
  
    
    if(monkey.isTouching(stoneGroup)){
     score=score-1;
      stoneGroup.destroyEach();
      monkey.scale=0.1;
    }
    
  
   
    

    food();
  obstacle();
    
  }else if(gameState===END){
     monkey.velocityY=0;
     stoneGroup.setLifetimeEach(0);     
     stoneGroup.setVelocityXEach(0);
     bananaGroup.setLifetimeEach(0);
     bananaGroup.setVelocityXEach(0);    
     ground.velocityX=0;
     note.visible=true;
     gameOver.visible=true;
     restart.visible=true;
     if(mousePressedOver(restart)) {
      reset();
    }     
   }
  
  
  drawSprites();
  
//score
   stroke("black")
   textSize(20);
   fill("black");

   text("Survival Time:"+score,400,40);      

   text("Score:"+score1,100,40);
}

function obstacle(){
  if(frameCount % 300===0){
 var stone=createSprite(600,420,20,20); 
   stone.addImage(stoneImg);
   stone.velocityX=-(6+3*score1/10);
   stone.scale=0.2;
   stone.lifetime=100;
   stoneGroup.add(stone);
    
  }   
 }


function reset(){
  
  gameState=PLAY;
  note.visible=false;
  restart.visible=false;
  gameOver.visible=false;
  monkey.scale=0.2;
  score=2;
  score1=0;
  ground.velocityX=-4;
  night.visible=false;
  good.visible=false;
  
}

function food(){
  
  if(frameCount % 80 === 0) {
  var banana=createSprite(600,300,20,20);
  banana.y=Math.round(random(110,180))
  banana.velocityX=-(6 + 3 * score1/5);
  banana.addImage("food",bananaImg);
  banana.scale=0.1;
  banana.lifetime=100;
  bananaGroup.add(banana);
  }  
 }




