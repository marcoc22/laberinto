


function carve(point) {
    let nextPoint;
    let direction;
    direction = point.directions.pop();
    maze.grid[point.y][point.x] |= Walls.VISITED;
    direction?carveDirectionAux(point,direction):carveDirectionAux2(point);
}

let carveDirectionAux = (point,direction) => {
    nextPoint = new Point(point.x + direction.x, point.y + direction.y,0,0);
    (inGridRange(nextPoint.x, nextPoint.y) && gridAt(nextPoint.x, nextPoint.y) === 0)?ingridRange(nexPoint,point):false;
}

let ingridRange = (nexPoint,point)  => {
    maze.grid[point.y][point.x] |= Walls[direction.key];
    maze.grid[nextPoint.y][nextPoint.x] |= OppositeWalls[direction.key];
    maze.backTrack.push(nextPoint);
}

let carveDirectionAux2 = (point) => {
    maze.grid[point.y][point.x] ^= Walls.VISITED;
    (!maze.depths.hasOwnProperty(maze.backTrack.length))?maze.depths[maze.backTrack.length] = []:false;
        maze.depths[maze.backTrack.length].push(point);
   (maze.backTrack.length > maze.longestDistance)?carveDirectionAux2Branch1:maze.backTrack.pop();
}

let carveDirectionAux2Branch1 = ()  => {
    maze.longestDistance = maze.backTrack.length;
    (maze.exitCell)?grid[maze.exitCell.y][maze.exitCell.x] ^= Walls.EXIT:false;
    maze.exitCell = maze.backTrack.pop();
    maze.grid[maze.exitCell.y][maze.exitCell.x] |= Walls.EXIT; 
}

function quickCarve(point) {
    let nextPoint;
    maze.pathDistance++;
    point.directions.map( direction => quickCarveAux(direction,nextPoint,point) ); //No se pudo sacar
    if (maze.pathDistance > maze.longestDistance) { //NO TOCAR O REVISAR AL FINAL
        maze.longestDistance = maze.pathDistance;
    (maze.exitCell)?maze.grid[maze.exitCell.y][maze.exitCell.x] ^= Walls.EXIT:false;
        maze.exitCell = point;
        maze.grid[maze.exitCell.y][maze.exitCell.x] |= Walls.EXIT;
    }
    (!maze.depths.hasOwnProperty(maze.pathDistance))?maze.depths[maze.pathDistance] = []:false;
    maze.depths[maze.pathDistance].push(point);
    maze.pathDistance--;
}


let quickCarveAux = (direction,nextPoint,point) => { //Ya esta listo
 nextPoint = new Point(point.x + direction.x, point.y + direction.y);
 (inGridRange(nextPoint.x, nextPoint.y) && gridAt(nextPoint.x, nextPoint.y) === 0)?quickCarveAux2(direction,nextPoint,point):false;
}

let quickCarveAux2 = (direction,nextPoint,point) => { //Ya esta listo
  maze.grid[point.y][point.x] |= Walls[direction.key];
  maze.grid[nextPoint.y][nextPoint.x] |= OppositeWalls[direction.key];
  quickCarve(nextPoint);  
}



function update() {
    maze.activeCell = null;
    (maze.backTrack.length && !maze.mazeCreated)?activeCellAux():false;
    maze.shouldSolve?solverMice():false;
    draw();
    updateFrame = raf(update.bind(this, true));
}

 let activeCellAux = () => {
 maze.activeCell = maze.backTrack[maze.backTrack.length - 1];
 carve(maze.activeCell);  
}

function solverMice(){
   maze.mice.map(mouse => randomMemoryWalk(mouse)); 
}



function  randomMemoryWalk(mouse) {
 (!mouse.solved)?ramdomMemoryWalkAux(mouse):window.dispatchEvent(onMazeCompleted); 
}

function ramdomMemoryWalkAux(mouse){ 
  let nextPos;
     
(mouse.pos.x === maze.exitCell.x && mouse.pos.y === maze.exitCell.y)?MouseSolvedTrue(mouse):undefined;
    
        let currentCell = gridAt(mouse.pos.x, mouse.pos.y);
        let possibleDirections = Array.of( currentCell , { key: 'N', value: !!( currentCell & Walls.N ) }, { key: 'S',value: !!(currentCell & Walls.S) }, { key: 'E', value: !!(currentCell & Walls.E) }, { key: 'W', value: !!(currentCell & Walls.W) }).filter(d => d.value);
        
        let surrounding = [];
        possibleDirections.map( d => possibleDirectionsAux(d,mouse,surrounding) );
          
    
        surrounding.sort( (a , b) => a.visited - b.visited);

        let nextDirection = surrounding[0];
        nextPos = new Point(mouse.pos.x + nextDirection.x, mouse.pos.y + nextDirection.y);
        let count = 0;
       
     
        while (count < surrounding.length && (!inGridRange(nextPos.x, nextPos.y))) { //FALTA 
            nextDirection = surrounding[count];
            nextPos = new Point(mouse.pos.x + nextDirection.x, mouse.pos.y + nextDirection.y);
            count++;
            index = (index + count) % choices.length;
        } //Hay que ver como se remplazar

         historyObject = {
            direction: nextDirection,
            pos: mouse.pos,
            key: createHistoryKey(nextPos)
        };
     
        mouse.previousDirection = mouse.direction; mouse.direction = nextDirection; mouse.history.push(historyObject); mouse.pos = nextPos;
        maze.grid[mouse.pos.y][mouse.pos.x] |= Walls.VISITED;   
}

let MouseSolvedTrue = (mouse) => {
    mouse.solved = true;
    return; 
}

function possibleDirectionsAux(d,mouse,surrounding){ //Ya estan 
    let p = SeekLookup[d.key];
    let n = new Point(mouse.pos.x + p.x, mouse.pos.y + p.y);
    (inGridRange(n.x, n.y))?possibleDirectionsAux2(p,n,mouse,surrounding):undefined;
}


let possibleDirectionsAux2 = (p,n,mouse,surrounding) => { //Ya esta listo
    p.visited = getMouseHistory(mouse, createHistoryKey(n)).length;
    surrounding.push(p);      
}

function createHistoryKey(pos) {  //Ya esta listo
    return pos.x + ':' + pos.y;
}

function getMouseHistory(mouse,key){  //Ya esta listo
  return mouse.history.filter( _ => _.key === key);
}





function checkForCollision() {  //FALTA MODULARLO 
  let imgData = ctx.getImageData(maze.face.x-1, maze.face.y-1, 15+2, 15+2);
  let pixels = imgData.data;


  let n=pixels.length;

  for (var i = 0; i < n; i += 4) { //Cambiar por reduce o por RANGE
    let red = pixels[i];
    let green = pixels[i+1];
    let blue = pixels[i+2];
    let alpha = pixels[i+3];

    // Look for black walls (which indicates a collision).
    if (red == 0 && green == 0 && blue == 0) {
      return true;
    }
      if (red == 128 && green == 128 && blue == 128) {
      return true;
    }
    if (red == 128 && green == 0 && blue == 0) {
        //console.log("oliva");
      window.dispatchEvent(onMazeManualCompleted);
    }
      //console.log(alpha);
  }
  // There was no collision.
  return false; 
}





function draw() {  //Esta listo
    ctx.clearRect(0, 0, 1000, 1000);
    (maze.mazeCreated && maze.shouldSolve && !maze.showDepths)?drawMice(ctx):false;
    maze.showDepths?showDepthsAux():false;
    maze.showMaze?showMazeAux(ctx):false;
    (maze.mazeCreated && maze.shouldManual && !maze.showDepths)?mazeManual(ctx):false;
}


let showDepthsAux = () => {  //Esta listo
    let keys = Object.keys(depths);
    keys.reduce( (a,b) => parseInt(a) - parseInt(b) );
    let colorStep = 1 / keys.length;
    keys.map( (key,i) => showDepthsAux2(key,i) );
}

let showDepthsAux2 = (key,i) => { //Esta listo 
   let cells = maze.depths[key];
   cells.map(cell => canvasChanges(cell,i));   
}

let canvasChanges = (cell,i) => { //Esta listo
    ctx.save();
    ctx.translate(cell.x * tileSize, cell.y * tileSize);
    ctx.beginPath();
    ctx.fillStyle = cs(colorStep * i).hex();
    ctx.rect(0, 0, tileSize, tileSize);
    ctx.fill();
    ctx.restore();  
}

function showMazeAux(){ //FALTA MODULARLO
        if(!maze.shouldSolve){
        ctx.fillStyle = "#FFFFFF";//aqui se asigna el color blanco
        ctx.fillRect (0,0,tileSize*rowsInput.value,tileSize*colsInput.value);//a todo el fondo se le coloca el color blanco
        }
        
 
        for (var y = 0; y < mazeHeight; y++) { //Cambiar con range por Range normal
            
            for (var x = 0; x < mazeWidth; x++) { //Cambiar con range por Range normal
                let cell = gridAt(x, y);
                
                ctx.save();
                ctx.translate(x * tileSize, y * tileSize);
                ctx.beginPath();
                ctx.strokeStyle = '#000000';
                (cell === 0)?showMazeAuxBranch1(ctx,cell):showMazeAuxBranch2(cell,Walls,ctx); 
                (maze.activeCell && x === maze.activeCell.x && y === maze.activeCell.y)?drawActive(ctx):undefined;
                ctx.stroke();
                ctx.restore();
            }
        }
    }


    

let showMazeAuxBranch1 = (ctx,cell) => {
 drawEastWall(ctx);
 drawSouthWall(ctx);
 drawUnvisited(ctx);   
}

let showMazeAuxBranch2 = (cell,Walls,ctx) => {
 (!(cell & Walls.S))?drawSouthWall(ctx):undefined;
 (!(cell & Walls.E))?drawEastWall(ctx):undefined;
 ((cell & Walls.ENTRY))?drawEntrance(ctx):undefined;
 (cell & Walls.EXIT)?drawExit(ctx):undefined;
}


function mazeManual(ctx){//No tocar
    maze.face.x += maze.face.dx;
    maze.face.y += maze.face.dy;
    if(checkForCollision()){
    maze.face.x -= maze.face.dx;
    maze.face.y -= maze.face.dy;
    maze.face.dx = 0;
    maze.face.dy = 0;
    }
    imgFace.crossOrigin = "Anonymous";
    ctx.drawImage(imgFace, maze.face.x,maze.face.y);
    }


let drawEastWall = (ctx) => { //Ya esta listo 
    ctx.moveTo(tileSize, 0);
    ctx.lineTo(tileSize, tileSize);
}

let drawSouthWall = (ctx) => { //Ya esta listo
    ctx.moveTo(0, tileSize);
    ctx.lineTo(tileSize, tileSize);
}

let drawExit  = (ctx) => { //Ya esta listo
    ctx.fillStyle = '#800000';
    ctx.fillRect(tileSize / 3, tileSize / 3 , tileSize /4, tileSize/4 );
}

let drawEntrance = (ctx) => { //Ya esta listo
    ctx.fillStyle = '#FFFF00';
    ctx.fillRect(tileSize / 3, tileSize / 3, tileSize / 4, tileSize / 4);
}

function drawActive(ctx) { //Ya esta listo
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = '#99ff99';
    ctx.fillRect(0, 0, tileSize, tileSize);
    ctx.restore();
}

function drawVisited(ctx) { //Ya esta listo
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = '#ff9999';
    ctx.fillRect(0, 0, tileSize, tileSize);
    ctx.restore();
}

function drawUnvisited(ctx) { //Ya esta listo
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = '#999';
    ctx.fillRect(0, 0, tileSize, tileSize);
    ctx.restore();
}

let drawMiceAux2 = (ctx,mouse,tileSize) => {
            ctx.save();

            ctx.fillStyle = mouse.color;
            ctx.strokeStyle = '#FFFF00';
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.translate(mouse.pos.x * tileSize, mouse.pos.y * tileSize);

            ctx.rect(0, 0, tileSize, tileSize);
            ctx.fill();
            ctx.stroke();
            ctx.restore();
}

function drawMice(ctx) {
   
    maze.mice.forEach(
        function (mouse) {
        
            var h;
            for (var i = 0; i < mouse.history.length; i++) {
                h = mouse.history[i].pos;
                ctx.save();
                ctx.globalAlpha = 0.15;
                ctx.translate(h.x * tileSize, h.y * tileSize);
                ctx.fillStyle = mouse.color;
                ctx.fillRect(0, 0, tileSize, tileSize);
                ctx.restore();

            }
        
        (!mouse.solved)?drawMiceAux2(ctx,mouse,tileSize):undefined;
        
    }

    );
}



