const carCanvas=document.getElementById("carCanvas"); // get the canvas element
carCanvas.width=200; // set canvas width to 200px
const networkCanvas=document.getElementById("networkCanvas"); // get the canvas element
networkCanvas.width=300; // set canvas width to 200px

const carCtx=carCanvas.getContext("2d"); // get the context of the canvas
const networkCtx=networkCanvas.getContext("2d"); // get the context of the canvas

const road=new Road(carCanvas.width/2,carCanvas.width*0.9); // create a new road object
const car=new Car(road.getLaneCenter(1),100,30,50,"AI"); // create a new car object
// car.draw(ctx); // draw the car
const traffic=[
    new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2)
];
animate();

function animate(time){ // animate the car
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    car.update(road.borders,traffic); // update the car
    carCanvas.height=window.innerHeight; // set canvas height to window height
    networkCanvas.height=window.innerHeight; // set canvas height to window height
    carCtx.save(); // save the context
    carCtx.translate(0,-car.y+carCanvas.height*(7/10)); // translate the context

    road.draw(carCtx); // draw the road
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(carCtx,"red");
    }
    car.draw(carCtx,"blue"); // draw the car
    carCtx.restore(); // restore the context

    networkCtx.lineDashOffset=-time/50; // set the line dash offset
    Visualizer.drawNetwork(networkCtx,car.brain);
    requestAnimationFrame(animate); // animate the car
}