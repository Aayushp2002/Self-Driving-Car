class Sensor{
    constructor(car){
        this.car=car;
        this.rayCount=5;
        this.rayLength=150;
        this.raySpread=Math.PI/2;

        this.rays=[];
        this.readings=[];
    }

    update(roadBorders,traffic){
        this.#castRays();
        this.readings=[];
        for(let i=0;i<this.rays.length;i++){
            const reading = this.#getReading(this.rays[i], roadBorders, traffic);
            this.readings.push(reading);
        }
        // console.log('Readings:', this.readings); // Debugging log

        
    }

    #getReading(ray, roadBorders, traffic){
        let touches = [];
        for (let i = 0; i < roadBorders.length; i++) {
            const touch = getIntersection(ray[0], ray[1], roadBorders[i][0], roadBorders[i][1]);
            // console.log(`Ray Start: (${ray[0].x}, ${ray[0].y}), Ray End: (${ray[1].x}, ${ray[1].y}), Border Start: (${roadBorders[i][0].x}, ${roadBorders[i][0].y}), Border End: (${roadBorders[i][1].x}, ${roadBorders[i][1].y}), Intersection: ${touch ? `(${touch.x}, ${touch.y})` : 'null'}`);
            if (touch) {
                touches.push(touch);
            }
        }
        for(let i=0;i<traffic.length;i++){
            const poly=traffic[i].polygon;
            for(let j=0;j<poly.length;j++){
                const value=getIntersection(
                    ray[0],
                    ray[1],
                    poly[j],
                    poly[(j+1)%poly.length]
                );
                if(value){
                    touches.push(value);
                }
            }
        }
        if (touches.length == 0) {
            return null;
        } else {
            const offsets = touches.map(e => e.offset);
            const minOffset = Math.min(...offsets);
            return touches.find(e => e.offset == minOffset);
        }
    }
    
    

    #castRays(){
        this.rays=[];
        for(let i=0;i<this.rayCount;i++){
            const rayAngle=lerp(this.raySpread/2,-this.raySpread/2, this.rayCount==1?0.5:i/(this.rayCount-1))+this.car.angle;
            const start={x:this.car.x,y:this.car.y};
            const end={
                x:this.car.x-
                    Math.sin(rayAngle)*this.rayLength,
                y:this.car.y-
                    Math.cos(rayAngle)*this.rayLength
            };
            this.rays.push([start,end]);
            // console.log(`Ray ${i}: Start(${start.x}, ${start.y}), End(${end.x}, ${end.y})`); // Log ray coordinates for debugging
        }
    }

    draw(ctx){
        for(let i = 0; i < this.rayCount; i++){
            if (!this.rays[i] || !this.rays[i][0] || !this.rays[i][1]) {
                // Skip this iteration if the ray data is incomplete
                continue;
            }
            let end = this.readings[i] ? this.readings[i] : this.rays[i][1];
            // Draw the part of the ray up to the reading in yellow
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "yellow";
            ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();

            // If there is a reading, draw the remaining part of the ray in black
            if (this.readings[i]) {
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = "black";
                ctx.moveTo(end.x, end.y);
                ctx.lineTo(this.rays[i][1].x, this.rays[i][1].y);
                ctx.stroke();
            }
        }
    }
    
    

    
}