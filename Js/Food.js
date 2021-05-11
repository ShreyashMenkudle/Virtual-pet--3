class Food{
    constructor(){
        this.foodStock=15;
        this.lastFed;
        this.image=loadImage("images/Milk.png");
    }

    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }

    getFedTime(lastFed){
        this.lastFed = lastFed;
    }

    deductFood(){
        if(this.foodStock > 0){
            this.foodStock = this.foodStock-1;
        }
        
    }

    addFood(){
        if(this.foodStock <= 19){
            this.foodStock++;
        }
    }
    
    getFoodStock(){
        return this.foodStock;
    }

    bedroom(){
        background(bedroomIMG,width,height);
        dog.changeAnimation("sleeping",sleepIMG);
    }
    
    garden(){
        background(gardenIMG,width,height);
        dog.changeAnimation("run",runIMG);
    }
    
    washroom(){
        background(washroomIMG,width,height);
    }
    
display(){
   var x=80;
   var y=100;

   imageMode(CENTER);
   image(this.image,720,220,70,70);

   if (this.foodStock != 0){

    for(var i=0;i<this.foodStock; i++){
        if ( i%10 == 0){
               x= 80;
               y= y+50;
    }
        image(this.image,x,y,50,50);
        x = x+30;
   }

}
}
}