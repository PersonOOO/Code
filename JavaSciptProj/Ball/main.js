let canvas = document.getElementById("canvas");

let context = canvas.getContext("2d");


var window_height = window.innerHeight;
var window_width = window.innerWidth;

canvas.width = window_width;
canvas.height = window_height;
canvas.style.background = "#e8dcca";


class Circle{

    constructor(xpos, ypos, radius, color, speed){

        this.xpos = xpos;
        this.ypos = ypos;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
    }

    draw(context){
        context.beginPath();
        //context.fillStyle = 'black';
        context.arc(this.xpos, this.ypos, this.radius, 0, Math.PI * 2 , false);
        context.fill();
        context.closePath();
    }

    update(){
        this.draw(context);
    }
}

let allCircles = [];

let createCircle = function(circle){
    circle.draw(context);
}

for(var i =0; i < 1; i++){
    let my_circle = new Circle(100, 100 + 100 * i/2, 20, "black");
    allCircles.push(my_circle);
    createCircle(allCircles[i]);
}

