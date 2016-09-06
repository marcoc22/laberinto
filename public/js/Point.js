/*
Proyecto 1: Laberinto

Integrantes: 
Nombre: Marco Tulio Canales Mesén ID:402250724
Nombre: Alfonso Gerardo González Orozco ID:402210937
Nombre: David Antonio Chacón Abarca ID:116240217
Nombre: José Ignacio Ávalos Bonilla ID:207300601

*/
class Point {
  constructor(x,y,dx,dy){
    this.x=x;
    this.y=y;
    this.dx=dx;
    this.dy=dy;
    this.directions=tool.shuffle(SeekDirections.slice(0));
  }
  toString() {
            return '(' + this.x + ', ' + this.y + ')';
        }
  /*module.exports = {
  Point : Point	
		}*/
}
