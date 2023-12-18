const carCanvas=document.getElementById("carCanvas"); // get the canvas element
carCanvas.width=200; // set canvas width to 200px
const networkCanvas=document.getElementById("networkCanvas"); // get the canvas element
networkCanvas.width=300; // set canvas width to 200px

const carCtx=carCanvas.getContext("2d"); // get the context of the canvas
const networkCtx=networkCanvas.getContext("2d"); // get the context of the canvas

const road=new Road(carCanvas.width/2,carCanvas.width*0.9); // create a new road object
const N=1; // number of cars
const cars=generateCars(N);
let bestCar=cars[0]; // set the best car to the first car
if(localStorage.getItem("bestBrain")){
    for(let i=0;i<cars.length;i++){
        cars[i].brain=JSON.parse(
            localStorage.getItem("bestBrain"));
        if(i!=0){
            NeuralNetwork.mutate(cars[i].brain,0.2);
        }
    }
}
// car.draw(ctx); // draw the car
const traffic=[
    new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0),-300,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(2),-300,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(1),-500,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0),-700,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(2),-700,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(1),-900,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0),-1100,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(2),-1100,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(1),-1300,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0),-1500,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(2),-1500,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(1),-1700,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0),-1900,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(2),-1900,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(1),-2100,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0),-2300,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(2),-2300,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(1),-2500,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0),-2700,30,50,"DUMMY",2),
];
animate();

function save(){
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain));
}

function discard(){
    localStorage.removeItem("bestBrain");
}

function generateCars(N){
    const cars=[];
    for(let i=1;i<=N;i++){
        cars.push(new Car(road.getLaneCenter(1),100,30,50,"AI"));
    }
    return cars;
}

function animate(time){ // animate the car
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    for(let i=0;i<cars.length;i++){
        cars[i].update(road.borders,traffic);
    }
    bestCar=cars.find(
        c=>c.y==Math.min(
            ...cars.map(c=>c.y)
        ));
    carCanvas.height=window.innerHeight; // set canvas height to window height
    networkCanvas.height=window.innerHeight; // set canvas height to window height
    carCtx.save(); // save the context
    carCtx.translate(0,-bestCar.y+carCanvas.height*(7/10)); // translate the context

    road.draw(carCtx); // draw the road
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(carCtx,"red");
    }
    carCtx.globalAlpha=0.2;
    for(let i=0;i<cars.length;i++){
        cars[i].draw(carCtx,"blue");
    }
    carCtx.globalAlpha=1;
    bestCar.draw(carCtx,"blue",true);
    carCtx.restore(); // restore the context

    networkCtx.lineDashOffset=-time/50; // set the line dash offset
    Visualizer.drawNetwork(networkCtx,bestCar.brain);
    requestAnimationFrame(animate); // animate the car
}