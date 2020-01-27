const foreground = "#68B1FF";
const background = "#FCFCFC";
var canvas;
var parent;
var ctx;
var particles;
var lastwidth;
var lastheight;

function startDraw() {
    canvas = document.getElementById("back_canvas");
    parent = document.getElementById("background");
    ctx = canvas.getContext("2d");
    const fps = 120;
    const delay = 1000/fps;
    setInterval(draw, delay);
    
    
    lastwidth = canvas.width;
    lastheight = canvas.height;
    
    load();
}

function load(){
    var speed = 20;
    particles = new Array();
    for (var i = 0; i < 300; i++) {
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height, (Math.random() - 0.5)* speed / 60, (Math.random() - 0.5) * speed / 60));
    }
}

function draw(){
    var minRadius = 20;
    var maxRadius = 70;
    var size = 5;
    updateCanvas();
    
    //ctx.strokeStyle = "#000000";
    //ctx.strokeRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = background;
    ctx.rect(0,0,canvas.width,canvas.height);
    ctx.fill();
    
    ctx.lineWidth = 3;
    ctx.fillStyle = foreground;
    ctx.strokeStyle = foreground;
    particles.forEach(function(item, index, array){
        item.x += item.dx;
        item.y += item.dy;
        
        ctx.beginPath();
        ctx.arc(item.x, item.y, size, 0, Math.PI * 2);
        ctx.fill();
        
        for(var other of particles){
            if(item != other){
                var rx = item.x - other.x;
                var ry = item.y - other.y;
                var radius = Math.sqrt(rx * rx + ry * ry);
                var opacity;
                if(radius < maxRadius){
                    
                    if (radius < minRadius){
                        opacity = 0;
                    } else {
                        opacity = 1 - ((radius - minRadius) / (maxRadius - minRadius));
                    }
                    
                    //ctx.strokeStyle = "rgba(81, 122, 88, " + opacity + ")";
                    ctx.strokeStyle = "rgba(104, 177, 255, " + opacity + ")";
                    ctx.beginPath();
                    ctx.moveTo(item.x, item.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.stroke();
                }
            }
        }
        
        limit(item, "x", -maxRadius, canvas.width + maxRadius);
        limit(item, "y", -maxRadius, canvas.height + maxRadius);
        
    });
    /*ctx.lineWidth = 1;
    ctx.lin
    ctx.strokeStyle = "rgb(0,255,0)";
    ctx.beginPath();
    ctx.moveTo(0,canvas.height / 2);
    for (var i = 0; i < canvas.width; i++){
        ctx.lineTo(i, Math.sin((i + new Date().getTime() / 10) / 10) * 30 + canvas.height / 2);
    }
    ctx.stroke();*/
}

function limit(item, property,  bot, top){
    if (item[property] > top){
        item[property] = bot;
    } else if (item[property] < bot){
        item[property] = top;
    }
}


function Particle(x, y, dx, dy){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
}


function updateCanvas(){
    //canvas.width = document.body.clientWidth;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
    //ctx.fillStyle = backgroundColor;
    
    if(lastheight != canvas.height || lastwidth != canvas.width){
        lastwidth = canvas.width;
        lastheight = canvas.height;
        
        load();
    }
}