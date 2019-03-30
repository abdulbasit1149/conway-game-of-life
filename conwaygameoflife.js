$(document).ready(function(){
	
document.body.onmousedown = function() { return false; } //so page is unselectable

	//Canvas stuff
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	var mx, my;

	var pause = false;
	
	var grid=[]; // background grid
	var sizeX = 40;// number of column of background grid
	var sizeY = 40;//number of rows of background grid


	var StartRequiredCells =0;		
	var DeadCell = 0;
	var AliveCell = 0;


	var controlAliveDeadCount = true;
	var stopgrowth = false; 

	
	/////////////////////////////////
	////////////////////////////////
	////////	GAME INIT
	///////	Runs this code right away, as soon as the page loads.
	//////	Use this code to get everything in order before your game starts 
	//////////////////////////////
	/////////////////////////////
	function init()
	{
	//////////
	////STATE VARIABLES
	
	
		for(var i = 0; i < sizeX;i++){
			grid[i]=[];
			for(var j = 0; j < sizeY ;j++){
				grid[i][j] =2; 
			}
		}

		
	

			for(var i =0; i <3;i++){
				for(var j = 0; j < 3; j++){
					grid[19+i][19+j] =1+Math.floor(Math.random()*2);
					grid[20][20] =1;
					
				}
			}
	

/*
	grid[19][19] =1;
	grid[19][20] =1;
	grid[19][21] =1;
	grid[20][20] =1;
	grid[18][20] =1;
*/
	for(l = 0;l < sizeX; l++){
		for(k = 0;k < sizeY; k++){
			if(grid[l][k] == 1)StartRequiredCells++;
		}
	}
	
	if(StartRequiredCells < 4 )init();
	console.log("Starting Living Cells:  "+StartRequiredCells);
	
		

	
	//////////////////////
	///GAME ENGINE START
	//	This starts your game/program
	//	"paint is the piece of code that runs over and over again, so put all the stuff you want to draw in here
	//	"60" sets how fast things should go
	//	Once you choose a good speed for your program, you will never need to update this file ever again.

	if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(paint,120);
	}

	init();	
StartRequiredCells=0;
//////////////////////////////////////////////////////////////////
if(pause == false){
//////

	
	
function growcell(l,k){
	console.log("Life created");
	for(var a =0;a<3;a++ ){
		for(var d = 0; d < 3; d++){
			if (grid[(l-1)+a][(k-1)+d] ==2){
				grid[(l-1)+a][(k-1)+d] = 1+Math.floor(Math.random()*2);
							} 
		}
	}
	

} 
function killcell(l,k){
		console.log("Cell is dead");
		grid[l][k]=2; // dead
		
}

function StoreDeadAlive(DeadCell,AliveCell){
	console.log("Dead:  "+DeadCell);
	console.log("Alive: "+AliveCell);
	//kill command
	//live command
	//reproduce command

if(stopgrowth == false){	
	if(AliveCell-1 == 3)growcell(l,k);
}	
	if(StartRequiredCells > 7 ){
		if(AliveCell-1 < 2 || AliveCell-1 > 3)killcell(l,k);
	}
	
		
	return controlAliveDeadCount = false;
}

function CheckAreaCell(l,k){
	for(var x =0; x< 3; x++){
		for(var y =0; y< 3; y++){
			if(grid[(l-1+x)][(k-1)+y] == 2)DeadCell++;
			if(grid[(l-1+x)][(k-1)+y] == 1)AliveCell++;
				
		
		}
	}
	if(controlAliveDeadCount == true)StoreDeadAlive(DeadCell,AliveCell);

	DeadCell = 0;
	AliveCell = 0;
	controlAliveDeadCount = true;
		
}
function Gameloop(){
	
	for(l = 0;l < sizeX; l++){
		for(k = 0;k < sizeY; k++){
			if( l > 2 && l < sizeX-2){
				if(k > 2 && k < sizeY-2){
					if(grid[l][k] == 1){
						console.log("X: "+l,"Y: "+k);
						CheckAreaCell(l,k);	
					}
				}
			}
		}
	}
	for(r = 0;r < sizeX; r++){
		for(t = 0;t < sizeY; t++){
			if(grid[r][t] == 1)StartRequiredCells++;
		}
	}
	
}
		console.log("After growing and Killing: "+StartRequiredCells);
	
}
///////////////////////////////////////////////////////////////////


	///////////////////////////////////////////////////////
	//////////////////////////////////////////////////////
	////////	Main Game Engine
	////////////////////////////////////////////////////
	///////////////////////////////////////////////////
	function paint()
	{
		
		ctx.fillStyle = 'black';
		ctx.fillRect(0,0, w, h);	
	
		for(var i = 0; i < sizeX;i++){
			for(var j = 0; j < sizeY ;j++){
				if(grid[i][j] == 2)ctx.fillStyle='grey'; // colour of grid
				if (grid[i][j] == 1)ctx.fillStyle = 'yellow'; // backup, just in case
			
				else ctx.fillStyle='grey';
				ctx.fillRect(2+i*15,2+j*15,12,12);	
			
				
			}
		}
		for(var q = 0;q < 40;q++){
			ctx.fillStyle = 'white';
				ctx.fillText(0+q,4+q*15,11);
				ctx.fillText(0+q,4,11+q*15);
		}
		
        if(pause == false)Gameloop();
  


	

	}////////////////////////////////////////////////////////////////////////////////END PAINT/ GAME ENGINE
	

	
	
	////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////
	/////	MOUSE LISTENER 
	//////////////////////////////////////////////////////
	/////////////////////////////////////////////////////
	





	/////////////////
	// Mouse Click
	///////////////
	canvas.addEventListener('click', function (evt){
		
		
	      
	}, false);

	
	

	canvas.addEventListener ('mouseout', function(){pause = true;}, false);
	canvas.addEventListener ('mouseover', function(){pause = false;}, false);

      	canvas.addEventListener('mousemove', function(evt) {
        	var mousePos = getMousePos(canvas, evt);

		mx = mousePos.x;
		my = mousePos.y;

      	}, false);


	function getMousePos(canvas, evt) 
	{
	        var rect = canvas.getBoundingClientRect();
        	return {
          		x: evt.clientX - rect.left,
          		y: evt.clientY - rect.top
        		};
      	}
      

	///////////////////////////////////
	//////////////////////////////////
	////////	KEY BOARD INPUT
	////////////////////////////////


	

	window.addEventListener('keydown', function(evt){
		var key = evt.keyCode;
		
	//p 80
	//r 82
	//1 49
	//2 50
	//3 51
	if(key == 80)pause = true;// p
	if(key == 82)pause = false; // r

	}, false);




})