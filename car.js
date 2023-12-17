class Car{ // create a car class
    constructor(x,y,width,height){ // constructor takes in x,y,width,height
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        this.speed=0; // set the speed to 0
        this.acceleration=0.2; // set the acceleration to 0.1
        this.maxSpeed=3; // set the max speed to 5
        this.friction=0.05; // set the friction to 0.1
        this.angle=0; // set the angle to 0


        this.sensor=new Sensor(this); // create a new sensor object
        this.controls=new Controls(); // create a new controls object
    }

    update(roadBorders){ // update the car
        this.#move(); // move the car
        this.sensor.update(roadBorders); // update the sensor
    }

    #move(){ // move the car
        if(this.controls.forward){ // if the up key is pressed
            this.speed+=this.acceleration; // increase the speed
        }
        if(this.controls.reverse){ // if the down key is pressed
            this.speed-=this.acceleration; // decrease the speed
        }
        if(this.speed>this.maxSpeed){ // if the speed is greater than the max speed
            this.speed=this.maxSpeed; // set the speed to the max speed
        }
        if(this.speed<-this.maxSpeed/2){ // if the speed is less than the negative max speed
            this.speed=-this.maxSpeed/2; // set the speed to the negative max speed
        }

        if(this.speed>0){ // if the speed is greater than 0
            this.speed-=this.friction; // decrease the speed
        }
        if(this.speed<0){ // if the speed is less than 0
            this.speed+=this.friction; // increase the speed
        }
        if(Math.abs(this.speed)<this.friction){ // if the absolute value of the speed is less than the friction
            this.speed=0;
        }

        if(this.speed!=0){
            const flip=this.speed>0?1:-1;

            if(this.controls.left){ // if the left key is pressed
                this.angle+=0.03*flip; // rotate the car
            }
            if(this.controls.right){ // if the right key is pressed
                this.angle-=0.03*flip; // rotate the car
            }
        }
        this.x-=this.speed*Math.sin(this.angle); // move the car

        this.y-=this.speed*Math.cos(this.angle); // move the car
    }

    draw(ctx){ // draw the car
        ctx.save(); // save the context
        ctx.translate(this.x,this.y); // translate the context
        ctx.rotate(-this.angle); // rotate the context
        ctx.beginPath(); // begin drawing
        ctx.rect( // draw a rectangle
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        );
        ctx.fill(); // fill the rectangle
        ctx.restore(); // restore the context
        this.sensor.draw(ctx); // draw the sensor
    }
}