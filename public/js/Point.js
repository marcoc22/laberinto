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
