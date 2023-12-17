class Road{ // Road class
    constructor(x,width,laneCount=3){ // constructor takes in x,width,laneCount
        this.x=x;
        this.width=width;
        this.laneCount=laneCount; // set the lane count

        this.left=this.x-this.width/2;
        this.right=this.x+this.width/2;
        const infinity=1000000; // set infinity to 1000000
        this.top=-infinity; // set the top to negative infinity
        this.bottom=infinity; // set the bottom to infinity

        const topLeft={ x: this.left, y: this.top }; // top left corner
        const topRight={ x: this.right, y: this.top }; // top right corner
        const bottomLeft={x:this.left,y: this.bottom}; // bottom left corner
        const bottomRight={x:this.right,y:this.bottom}; // bottom right corner
        this.borders=[
            [topLeft,bottomLeft],
            [topRight,bottomRight]
        ];
    }

    getLaneCenter(laneIndex){ // get the center of the lane
        const laneWidth=this.width/this.laneCount; // get the width of the lane
        return this.left+laneWidth/2+Math.min(laneIndex,this.laneCount-1)*laneWidth; // return the center of the lane
    }

    draw(ctx){ // draw the road
        ctx.lineWidth=5;
        ctx.strokeStyle="white";

        for(let i=1;i<=this.laneCount-1;i++){ // for each lane
            const x=lerp( // linear interpolation to get the x value of the lane line
                this.left,
                this.right,
                i/this.laneCount
            );
            ctx.setLineDash([20, 20]);
            ctx.beginPath();
            ctx.moveTo(x,this.top);
            ctx.lineTo(x,this.bottom);
            ctx.stroke();
        }

        ctx.setLineDash([]);
        this.borders.forEach((border)=>{ // for each border
            ctx.beginPath();
            ctx.moveTo(border[0].x,border[0].y);
            ctx.lineTo(border[1].x,border[1].y);
            ctx.stroke();
        });
    }
}