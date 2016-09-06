/*
Proyecto 1: Laberinto

Integrantes: 
Nombre: Marco Tulio Canales Mesén ID:402250724
Nombre: Alfonso Gerardo González Orozco ID:402210937
Nombre: David Antonio Chacón Abarca ID:116240217
Nombre: José Ignacio Ávalos Bonilla ID:207300601

*/
class Mouse{
	constructor(){
		this.pos = new Point(0, 0, 0, 0);
		this.direction = null;
        this.history = [];
        this.solved = false;
        this.color = '#FFFF00';
        //this.solver = randomMemoryWalk;
	}
}

