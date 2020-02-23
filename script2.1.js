var mass, mass1, mass2, mass3, particles;
var k, damping;
var t, dt, tend;
var holder;
var Fext;
var x, y, r;

// Define global variables for real world coordinates
var xwmin = 0;
var ywmin = 0;
var xwmax = 0;
var ywmax = 0;

// Define global variables for canvas coordinate
var xcmin = 0;
var ycmin = 0;
var xcmax = 0;
var ycmax = 0;

// Define figure
var currentFigure = "";
var figureBackground = "white";

// Define array for plot
var N = 100;
var iN = 0;
var data_t = new Array();
var data_x = new Array();
var data_x2 = new Array();
var data_x3 = new Array();

var ta1 = document.getElementById("ta1");

init();
draw();

function generateFromTextarea(){
	var dataTa = ta1.value.split("\n");
	var arrayData = new Array();
	for(var i=0; i < dataTa.length - 1; i++){
		var dsplit = dataTa[i].split("\t");
		var pvar = parseFloat(dsplit[2]);
		arrayData.push(pvar);
	}
	return arrayData;
}

function init() {
	// Initialize drawing properties
	setWorldCoordinates(0, 0, 10, 10);
	setCanvasCoordinates("canvas");
	
	// Ambil data textarea
	ta1.innerHTML = "m\t=\t10\n";
	ta1.innerHTML += "r\t=\t10\n";
	ta1.innerHTML += "Fext\t=\t10\n";
	ta1.innerHTML += "k\t=\t35\n";
	ta1.innerHTML += "c\t=\t5\n";
	ta1.innerHTML += "t\t=\t0\n";
	ta1.innerHTML += "dt\t=\t0.1\n";
	ta1.innerHTML += "t akhir\t=\t58\n";
	
	var dataArray = generateFromTextarea();
	console.log(dataArray);
	
	// INITIAL SETTINGS of physical properties
	mass = dataArray[0];
	r = dataArray[1];
	Fext = - 10;

	particles = [
					
					{x : 5, y : 7.0, vx : 0, vy : 0},
					{x : 5, y : 6.0, vx : 0, vy : 0},
					{x : 5, y : 5.0, vx : 0, vy : 0},
					{x : 5, y : 4.0, vx : 0, vy : 0},
					{x : 5, y : 3.0, vx : 0, vy : 0}
					
				];
	
	for(var i=0; i<particles.length; i++){
		data_x[i] = new Array();
	}
	
	k = 35;
	damping = 5;	
	
	t = 0;
	dt = 0.1;
	tend = 58;
	holder = {x : 5, y : 9.0};
}

function animate() {
	if(t < tend) {
		requestAnimationFrame(animate);  // request next timestep
	}
    update();  //update simulation to advance in time
	clear();
    draw();  //draw the simulation state
	data();
	
	if(t >= tend) {
		plot();
	}
}

function data() {
	var ta2 = document.getElementById("textarea2");
	var data = ta2.value;
	data += t + ",";
	for(var i=0; i<particles.length; i++){
		data += particles[i].y + ",";
	}
	data += "\n";
	ta2.value = data;
}

function update(){
	var FP = new Array();
	var FR = new Array();
	for(var i=0; i<particles.length; i++){
		var r;
		if(i==0){
			r = -k*(particles[i].y - holder.y);
			FP.push(r);
		} else {
			r = -k*(particles[i].y - particles[i-1].y);
			FP.push(r);
		}
		r = damping * particles[i].vy;
		FR.push(r);
	}
	 
	 var F = new Array();
	 
	 for(var i=0; i < particles.length; i++){
		 var r;
		 if(i==0){
			 r = FP[i] - FR[i] - FP[i+1] + FR[i+1];
		 } else if (i==particles.length-1){
			 r = FP[i] - FR[i] - FP[i-1] + FR[i-1] + FP[i] + Fext - FR[i];
		 } else {
			 r = FP[i] - FR[i] - FP[i-1] + FR[i-1] - FP[i+1] + FR[i+1] + FP[i] - FR[i];
		 }
		 F.push(r);
	 }
	 
	var a = new Array();
	for(var i=0; i < particles.length; i++){
		a.push(F[i]/mass);
		
	}
         
	for(var i=0; i < particles.length; i++){
		particles[i].vy = particles[i].vy + a[i] * dt;
	}
	    
	for(var i=0; i < particles.length; i++){
		particles[i].y = particles[i].y + particles[i].vy * dt;
	}
		 
	data_t[iN] = t;
	for(var i=0; i < particles.length; i++){
		var r = parseFloat(particles[i].y.toFixed(3));
		data_x[i].push(r);
	}
	
	iN++;
	t = t + dt;
	console.log(t);
}

function clear(){
	var canvas = document.getElementById("canvas");
	var c = canvas.getContext("2d");
	c.background = "white";
	c.clearRect(0,0, canvas.width, canvas. height);
	c.stroke();
}

function draw(){
	var xx = transX(x);
	var yy = transY(y);
	
	var canvas = document.getElementById("canvas");
	canvas.style.border="1px black solid";
	var c = canvas.getContext("2d");
	
	//holder
    c.fillstyle = "black";
	var holderWidth = 20;
	var holderHeight = 10;
   	c.rect(transX(holder.x) - holderWidth / 2, transY(holder.y) - holderHeight / 2 , holderWidth, holderHeight);
	c.stroke();
	c.fill();
	 
	for(var i=0; i < particles.length; i++){
		if(i==0){
			c.strokeStyle = "black";
			c.beginPath();
			c.moveTo(transX(holder.x), transY(holder.y));
			c.lineTo(transX(particles[i].x), transY(particles[i].y));
			c.closePath();
			c.stroke();
			
			c.fillStyle = "rgb(183,0,"+i*50+")";
			c.beginPath();
			c.arc(transX(particles[i].x), transY(particles[i].y), r, 0, Math.PI * 2);
			c.closePath();
			c.fill();
		} else {
			c.strokeStyle = "black";
			c.beginPath();
			c.moveTo(transX(particles[i-1].x), transY(particles[i-1].y));
			c.lineTo(transX(particles[i].x), transY(particles[i].y));
			c.closePath();
			c.stroke();
			 
			c.fillStyle = "rgb(183,0,"+i*50+")";
			c.beginPath();
			c.arc(transX(particles[i].x), transY(particles[i].y), r, 0, Math.PI * 2);
			c.closePath();
			c.fill();
		}
	}
}

// Set real world coordinates
function setWorldCoordinates(xmin, ymin, xmax, ymax) {
	xwmin = xmin;
	ywmin = ymin;
	xwmax = xmax;
	ywmax = ymax;	
}

// Set canvas coordinates
function setCanvasCoordinates(canvas) {
	currentFigure = canvas;
	var c = document.getElementById(canvas);	
	xcmin = 0;
	ycmin = c.height;
	xcmax = c.width;
	ycmax = 0;
}

// Transform x
function transX(x) {
	var xx = (x - xwmin) / (xwmax - xwmin) * (xcmax - xcmin);
	xx += xcmin;
	var X = parseInt(xx);
	return X;
}

// Transform y
function transY(y) {
	var yy = (y - ywmin) / (ywmax - ywmin) * (ycmax - ycmin);
	yy += ycmin;
	var Y = parseInt(yy);
	//console.log(Y);
	return Y;
}

function clearCurrentFigure() {
	var canvas = document.getElementById(currentFigure);
	var c = canvas.getContext("2d");
	c.fillStyle = figureBackground;
	c.fillRect(xcmin, ycmax, xcmax, ycmin);
}