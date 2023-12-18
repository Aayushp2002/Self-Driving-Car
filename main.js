const canvas=document.getElementById("myCanvas"); // get the canvas element

canvas.width=200; // set canvas width to 200px

const ctx=canvas.getContext("2d"); // get the context of the canvas
const road=new Road(canvas.width/2,canvas.width*0.9); // create a new road object
const car=new Car(road.getLaneCenter(1),100,30,50,"AI"); // create a new car object
// car.draw(ctx); // draw the car
const traffic=[
    new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2)
];
animate();

function animate(){ // animate the car
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    car.update(road.borders,traffic); // update the car
    canvas.height=window.innerHeight; // set canvas height to window height
    ctx.save(); // save the context
    ctx.translate(0,-car.y+canvas.height*(7/10)); // translate the context

    road.draw(ctx); // draw the road
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(ctx,"red");
    }
    car.draw(ctx,"blue"); // draw the car
    ctx.restore(); // restore the context
    requestAnimationFrame(animate); // animate the car
}