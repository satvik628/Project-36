//Create variables here
var dog, happyDog, database, foodS, foodStock,bg , FeedDog , FeedDog;
var fedTime, lastFed ;
var foodObj;
var dogImage;

function preload()
{
	//load images here

  dogImage=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");
  bg=loadImage("images/room.jpg");

}

function setup() {

  database=firebase.database();
	createCanvas(1000, 500);
  

  foodObj=new Food();

   fill("blue");
  FeedDog=createButton("FeedDog");
  FeedDog.position(1200,50);
  
   AddMilk=createButton("AddMilk");
  AddMilk.position(1200,95);
  

  dog=createSprite(750,400,150,150);
  dog.addImage(dogImage);
  dog.scale=0.15;

  
}


function draw() {  
background(bg);

foodS=foodObj.getFoodStock();

 foodObj.display();
 
 AddMilk.mousePressed(()=>{

  foodS++;
  database.ref('/').update({
    Food:foodS
  })
    
});

FeedDog.mousePressed(()=>{
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })  

});

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });


   fill("black");
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 200,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 200,30);
   }


foodStock=database.ref('Food');
foodStock.on("value",readStock);


  drawSprites();

  //add styles here
  fill("red");
  stroke("red");
  strokeWeight(1);
  text("FOOD LEFT : "+ foodStock , 230,175);
 

}

function readStock(data){
  foodStock=data.val();
  foodObj.updateFoodStock(foodS);
  
}

function writeStock(x){

 if(x<=0){
   x=0
 }else{
   x-=0.25;
 }


  database.ref('/').update({
    Food:x
  })

  
}


