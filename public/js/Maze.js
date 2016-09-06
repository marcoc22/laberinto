/*
Proyecto 1: Laberinto

Integrantes: 
Nombre: Marco Tulio Canales Mesén ID:402250724
Nombre: Alfonso Gerardo González Orozco ID:402210937
Nombre: David Antonio Chacón Abarca ID:116240217
Nombre: José Ignacio Ávalos Bonilla ID:207300601

*/
class Maze{
	constructor(width,height,mice,depths,showMaze,showDepth,
		mazeCreated,activeCell,longestDistance,pathDistance,
		exitCell,shouldSolve,shouldManual,backTrack,grid,solving,face){

		this.size=30;
		this.width=width;
		this.height=height;
		this.mice=mice;
		this.depths=depths;
		this.showMaze=showMaze;
		this.showDepths = showDepth;
   		this.mazeCreated = mazeCreated;
    	this.activeCell = activeCell;
    	this.longestDistance = longestDistance;
    	this.pathDistance = pathDistance;
    	this.exitCell = exitCell;
    	this.shouldSolve = shouldSolve;
    	this.shouldManual=shouldManual;
    	this.backTrack = backTrack;
    	this.grid = grid;
    	this.solving = solving;
        this.face = face;
	}
}

 