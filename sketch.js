var dog, happyDog, database, foodS, foodStock;
var feed,addFood;
var fedTime, lastFed;
var foodObj;
var dogImg,happyDogImg;
var frameCountNow = 0;
var gameState = "hungry";
var gameStateRef;
var milk, input, name;
var bedroomIMG, gardenIMG, washroomIMG,sleepIMG,runIMG;


function preload(){
	dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
  bedroomIMG  = loadImage("images/Bed_Room.png");
  gardenIMG   = loadImage("images/Garden.png");
  washroomIMG = loadImage("images/Wash_Room.png");
  sleepIMG    = loadImage("images/Lazy.png");
  runIMG      = loadImage("images/running.png");
}

function setup() {
  createCanvas(1000, 500);
  database = firebase.database();
  
   foodStock = database.ref("Food");
   foodStock.on("value", readStock);

   foodObj =new Food();

   dog = createSprite(800,200,10,60);
   dog.addAnimation("saddog",dogImg);
   dog.addAnimation("happy",happyDogImg);
   dog.addAnimation("sleeping",sleepIMG);
   dog.addAnimation("run",runIMG);
   dog.scale = 0.3;
   
   getGameState();

   feed = createButton("Feed the Dog");
   feed.position(700,95);
   feed.mousePressed(feedDog);

   addFood = createButton("Add Food");
   addFood.position(800,95);
   addFood.mousePressed(addFoodS);

   input = createInput("Pet name");
   input.position(950,120);
 
   button = createButton("Confirm");
   button.position(1000,145);
   button.mousePressed(createName);

}


function draw() {  
  background("green");
  currentTime = hour();
  
  fedTime = database.ref("FeedTime");

  fedTime.on("value",function(data){
       lastFed = data.val();
  })

  if(currentTime === lastFed + 1){
    gameState = "playing";
    updateGameState();
    foodObj.garden();
  }
  else if(currentTime === lastFed + 2){
    gameState = "sleeping";
    updateGameState();
    foodObj.bedroom();
  }
  else if(currentTime > lastFed + 2 && currentTime <= lastFed + 4){
    gameState = "bathing";
    updateGameState();
    foodObj.washroom();
  }
  else {
    gameState = "hungry";
    updateGameState();
    foodObj.display();
  }

  foodObj.getFoodStock();
  getGameState();


  if(gameState === "hungry"){
    feed.show();
    addFood.show();
    dog.addAnimation("hungry",dogImg);
  }
  else {
    feed.hide();
    addFood.hide();
    dog.remove();
  }



  drawSprites();


  textSize(32);
  fill("red");
  textSize(20);
  text("Last fed: "+lastFed+":00",300,95);
  text("Time since last fed: "+(currentTime - lastFed),300,125);
  }



function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref("/").update({
    Food:x
  });
}



function feedDog(){
  foodObj.deductFood();
  foodObj.updateFoodStock();
  dog.changeAnimation("happy", happyDogImg);
  gameState = "happy";
  updateGameState();
}

function addFoodS(){
  foodS ++;
  database.ref('/').update({
  Food: foodS
  })
}
  async function hour(){
    var site = await fetch("http://worldtimeapi.org/api/timezone/America/New_York");
    var siteJSON = await site.json();
    var datetime = siteJSON.datetime;
    var hourTime = datetime.slice(11,13);
    return hourTime;
  }
  
  function createName(){
    input.hide();
    button.hide();
  
    name = input.value();
    var greeting = createElement('h3');
    greeting.html("Pet's name: "+name);
    greeting.position(width/2+850,height/2+200);
  }
  
  function getGameState(){

    gameStateRef = database.ref('gameState');
    gameStateRef.on("value",function(data){
      gameState = data.val();
    });

  }
  
  function updateGameState(){
    database.ref('/').update({
      gameState: gameState
    })
  }

