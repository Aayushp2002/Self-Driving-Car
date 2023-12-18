class Car{ // create a car class
    constructor(x,y,width,height,controlType, maxSpeed=3){ // constructor takes in x,y,width,height
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        this.speed=0; // set the speed to 0
        this.acceleration=0.2; // set the acceleration to 0.1
        this.maxSpeed=maxSpeed; // set the max speed
        this.friction=0.05; // set the friction to 0.1
        this.angle=0; // set the angle to 0
        this.damaged=false; // set the damaged to false

        this.useBrain=controlType=="AI";

        if(controlType!="DUMMY"){
            this.sensor=new Sensor(this);
            this.brain=new NeuralNetwork(
                [this.sensor.rayCount,6,4]
            );
        }
        
        this.controls=new Controls(controlType); // create a new controls object

        this.image=new Image();
        this.image.src="car.png";
    }

    update(roadBorders,traffic){ // update the car
        if(!this.damaged){
            this.#move(); // move the car
            this.polygon=this.#createPolygon(); // create the polygon
            this.damaged=this.accessDamage(roadBorders,traffic); // check if the car is damaged
        }
        
        if(this.sensor){
            this.sensor.update(roadBorders,traffic); // update the sensor
            const offsets=this.sensor.readings.map(
                s=>s==null?0:1-s.offset
            );
            const outputs=NeuralNetwork.feedForward(offsets,this.brain);
            // console.log(outputs); // debug the outputs

            if(this.useBrain){
                this.controls.forward=outputs[0];
                this.controls.left=outputs[1];
                this.controls.right=outputs[2];
                this.controls.reverse=outputs[3];
            }
        }
    }

    accessDamage(roadBorders,traffic){ // check if the car is damaged
        for(let i=0;i<roadBorders.length;i++){
            if(polysIntersect(this.polygon,roadBorders[i])){
                return true;
            }
        }
        for(let i=0;i<traffic.length;i++){
            if(polysIntersect(this.polygon,traffic[i].polygon)){
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

    draw(ctx,color,drawSensor=false){
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(-this.angle);
        ctx.drawImage(
            this.image,
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        );
        ctx.restore();
    
        if(this.sensor && drawSensor){
            this.sensor.draw(ctx); // draw the sensor
        }
    }
    
}