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
        this.damaged=false; // set the damaged to false


        this.sensor=new Sensor(this); // create a new sensor object
        this.controls=new Controls(); // create a new controls object
    }

    update(roadBorders){ // update the car
        if(!this.damaged){
            this.#move(); // move the car
            this.polygon=this.#createPolygon(); // create the polygon
            this.damaged=this.accessDamage(roadBorders); // check if the car is damaged
        }
        
        this.sensor.update(roadBorders); // update the sensor
    }

    accessDamage(roadBorders){ // check if the car is damaged
        for(let i=0;i<roadBorders.length;i++){
            if(polysIntersect(this.polygon,roadBorders[i])){
                return true;
            }
        }
        return false;
    }

    #createPolygon(){
        const points=[];
        const rad=Math.hypot(this.width,this.height)/2;
        const alpha=Math.atan2(this.width,this.height);
        points.push({
            x:this.x-Math.sin(this.angle-alpha)*rad,
            y:this.y-Math.cos(this.angle-alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(this.angle+alpha)*rad,
            y:this.y-Math.cos(this.angle+alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(Math.PI+this.angle-alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle-alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(Math.PI+this.angle+alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle+alpha)*rad
        });
        return points;
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

    draw(ctx){
        if(this.damaged){
            ctx.fillStyle='gray';
        }else{
            ctx.fillStyle='black';
        }
        if(!this.polygon) return; // Ensure the polygon exists
    
        ctx.save(); // Save the current state of the context
        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
        for(let i = 1; i < this.polygon.length; i++){
            ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
        }
        ctx.closePath(); // Close the path
        ctx.fill();
        ctx.restore(); // Restore the context state
    
        this.sensor.draw(ctx); // Draw the sensor
    }
    
}