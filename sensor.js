class Sensor{ // Sensor class
    constructor(car){ // constructor takes in a car object
        this.car=car;
        this.rayCount=5;
        this.rayLength=150;
        this.raySpread=Math.PI/2;
 
        this.rays=[];
        this.readings=[]; // create an array of readings for each ray in the array of rays 

    }

    update(roadBorders){ // update the sensor
        this.#castRays(); // cast the rays
        this.readings=[]; // reset the readings
        for(let i=0;i<this.rays.length;i++){ // for each ray in the array of rays
            this.readings.push(this.#getReading(this.rays[i],roadBorders)); // add the reading to the array of readings
        }
    }

    #getReading(ray,roadBorders){ // get the reading
        let touches=[]; // create an array of touches
        for(let i=0;i<roadBorders.length;i++){ // for each border in the array of borders
            const touch=getIntersection(ray[0],ray[1],roadBorders[i][0],roadBorders[i][1]); // get the intersection of the ray and the border
            if(touch){ // if there is an intersection
                touches.push(touch); // add the intersection to the array of touches
            }
        }
        if(touches.length==0){ // if there are no intersections
            return null; // return the ray length
        }else{
            const offsets=touches.map(e=>e.offset); // get the offsets of the touches
            const minOffset=Math.min(...offsets); // get the minimum offset
            return touches.find(e=>e.offset==minOffset); // return the touch with the minimum offset
        }
    }

    #castRays(){ // cast the rays
        this.rays=[]; // reset the rays
        for(let i=0;i<this.rayCount;i++){ // for each ray in the ray count 
            const rayAngle=lerp( // get the ray angle
                this.raySpread/2, // start at the ray spread divided by 2
                -this.raySpread/2, // end at the negative ray spread divided by 2
                this.rayCount==1?0.5:i/(this.rayCount-1) // if there is only one ray, set the t value to 0.5, otherwise set the t value to the current ray divided by the ray count minus 1
            )+this.car.angle; // add the car angle to the ray angle
            const start={x:this.car.x,y:this.car.y}; // get the start of the ray
            const end={ // get the end of the ray
                x:this.car.x- // get the x value of the end of the ray
                    Math.sin(rayAngle)*this.rayLength, // get the x value of the end of the ray
                y:this.car.y- // get the y value of the end of the ray
                    Math.cos(rayAngle)*this.rayLength // get the y value of the end of the ray
            };
            this.rays.push([start,end]); // add the ray to the array of rays

        }
    }

    draw(ctx){
        for(let i = 0; i < this.rays.length; i++){
            let end = this.readings[i] ? this.readings[i] : this.rays[i][1];
    
            ctx.beginPath();
            ctx.lineWidth = 2;
    
            // Change color based on whether there's a reading
            if(this.readings[i]) {
                // If there's a reading, draw the ray in black
                ctx.strokeStyle = "black";
            } else {
                // If there's no reading, draw the ray in red
                ctx.strokeStyle = "red";
            }
    
            ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
        }
    }
    

}
