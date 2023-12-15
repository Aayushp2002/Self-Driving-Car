const canvas=document.getElementById("myCanvas"); // get the canvas element

canvas.width=200; // set canvas width to 200px

const ctx=canvas.getContext("2d"); // get the context of the canvas
const car=new Car(100,100,30,50); // create a new car object
car.draw(ctx); // draw the car
animate();

function animate(){ // animate the car
    car.update(); // update the car
    canvas.height=window.innerHeight; // set canvas height to window height
    car.draw(ctx); // draw the car
    requestAnimationFrame(animate); // animate the car
}