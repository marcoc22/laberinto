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

