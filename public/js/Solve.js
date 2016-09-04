
const imgFace = document.getElementById("face");

function carve(point) {
    let nextPoint;
    let direction;
    direction = point.directions.pop();
    maze.grid[point.y][point.x] |= Walls.VISITED;
    direction?carveDirectionAux(point):carveDirectionAux2(point);
}

function carveDirectionAux(point){
    nextPoint = new Point(point.x + direction.x, point.y + direction.y,0,0);
    (inGridRange(nextPoint.x, nextPoint.y) && gridAt(nextPoint.x, nextPoint.y) === 0)?ingridRange(nexPoint,point):false;
}

function ingridRange(nexPoint,point){
    maze.grid[point.y][point.x] |= Walls[direction.key];
    maze.grid[nextPoint.y][nextPoint.x] |= OppositeWalls[direction.key];
    maze.backTrack.push(nextPoint);
}

function carveDirectionAux2(point){
    maze.grid[point.y][point.x] ^= Walls.VISITED;
    (!maze.depths.hasOwnProperty(maze.backTrack.length))?maze.depths[maze.backTrack.length] = []:false;
        maze.depths[maze.backTrack.length].push(point);
   (maze.backTrack.length > maze.longestDistance)?carveDirectionAux2Branch1:maze.backTrack.pop();
}

function carveDirectionAux2Branch1(){
    maze.longestDistance = maze.backTrack.length;
    (maze.exitCell)?grid[maze.exitCell.y][maze.exitCell.x] ^= Walls.EXIT:false;
    maze.exitCell = maze.backTrack.pop();
    maze.grid[maze.exitCell.y][maze.exitCell.x] |= Walls.EXIT; 
}

function quickCarve(point) {
    let nextPoint;
    maze.pathDistance++;
    point.directions.map( direction => quickCarveAux(direction,nextPoint,point) );
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

function quickCarveAux(direction,nextPoint,point) { //Ya esta listo
 nextPoint = new Point(point.x + direction.x, point.y + direction.y);
 (inGridRange(nextPoint.x, nextPoint.y) && gridAt(nextPoint.x, nextPoint.y) === 0)?quickCarveAux2(direction,nextPoint,point):false;
}

function quickCarveAux2(direction,nextPoint,point){ //Ya esta listo
  maze.grid[point.y][point.x] |= Walls[direction.key];
  maze.grid[nextPoint.y][nextPoint.x] |= OppositeWalls[direction.key];
  quickCarve(nextPoint);  
}

function update() {
    maze.activeCell = null;
    (maze.backTrack.length && !maze.mazeCreated)?activeCellAux():false;
    (maze.shouldSolve ||  maze.shouldManual)?solverMice():false;
    draw();
    updateFrame = raf(update.bind(this, true));
}

function activeCellAux(){
 maze.activeCell = maze.backTrack[maze.backTrack.length - 1];
 carve(maze.activeCell);  
}

function solverMice(){
   (maze.shouldSolve)?maze.mice.map(mouse => randomMemoryWalk(mouse)):maze.mice.map(mouse => manualMemoryWalk(mouse));
}



function  randomMemoryWalk(mouse) {
 (!mouse.solved)?ramdomMemoryWalkAux(mouse):window.dispatchEvent(onMazeCompleted); 
}
function  manualMemoryWalk(mouse) {
 (!mouse.solved)?manualMemoryWalkAux(mouse):window.dispatchEvent(onMazeCompleted); 
}
function manualMemoryWalkAux(mouse){ //FALTA MODULARLO MUCHO MÁS
  let nextPos;
     
if(mouse.pos.x === maze.exitCell.x && mouse.pos.y === maze.exitCell.y){
     mouse.solved = true;
    return; 
}
        let currentCell = gridAt(mouse.pos.x, mouse.pos.y);
        let possibleDirections = Array.of( currentCell , { key: 'N', value: !!( currentCell & Walls.N ) }, { key: 'S',value: !!(currentCell & Walls.S) }, { key: 'E', value: !!(currentCell & Walls.E) }, { key: 'W', value: !!(currentCell & Walls.W) }).filter(d => d.value);
        
        let surrounding = [];
        possibleDirections.map( d => possibleDirectionsAux(d,mouse,surrounding) );
          
    
        surrounding.sort( (a , b) => a.visited - b.visited);

        let nextDirection = surrounding[0];
        //nextPos = new Point(mouse.pos.x + nextDirection.x, mouse.pos.y + nextDirection.y);
        nextPos = new Point(mouse.pos.x + point.dx, mouse.pos.y + point.dy,0,0);
        let count = 0;
       
     
        while (count < surrounding.length && (!inGridRange(nextPos.x, nextPos.y))) {
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

function ramdomMemoryWalkAux(mouse){ //FALTA MODULARLO MUCHO MÁS
  let nextPos;
     
if(mouse.pos.x === maze.exitCell.x && mouse.pos.y === maze.exitCell.y){
     mouse.solved = true;
    return; 
}
        let currentCell = gridAt(mouse.pos.x, mouse.pos.y);
        let possibleDirections = Array.of( currentCell , { key: 'N', value: !!( currentCell & Walls.N ) }, { key: 'S',value: !!(currentCell & Walls.S) }, { key: 'E', value: !!(currentCell & Walls.E) }, { key: 'W', value: !!(currentCell & Walls.W) }).filter(d => d.value);
        
        let surrounding = [];
        possibleDirections.map( d => possibleDirectionsAux(d,mouse,surrounding) );
          
    
        surrounding.sort( (a , b) => a.visited - b.visited);

        let nextDirection = surrounding[0];
        nextPos = new Point(mouse.pos.x + nextDirection.x, mouse.pos.y + nextDirection.y);
        let count = 0;
       
     
        while (count < surrounding.length && (!inGridRange(nextPos.x, nextPos.y))) {
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


function possibleDirectionsAux(d,mouse,surrounding){ //Ya estan 
    let p = SeekLookup[d.key];
    let n = new Point(mouse.pos.x + p.x, mouse.pos.y + p.y);
    (inGridRange(n.x, n.y))?possibleDirectionsAux2(p,n,mouse,surrounding):false;
}


function possibleDirectionsAux2(p,n,mouse,surrounding){ //Ya esta listo
    p.visited = getMouseHistory(mouse, createHistoryKey(n)).length;
    surrounding.push(p);      
}

function createHistoryKey(pos) {  //Ya esta listo
    return pos.x + ':' + pos.y;
}

function getMouseHistory(mouse,key){  //Ya esta listo
  return mouse.history.filter(h => h.key === key);
}

/*function randomDirection(exclusions) {  //Ya esta listo
    let ds = SeekDirections.slice(0);
    (exclusions)?randomDirectionAux(exclusions):false;
    return tool.shuffle(ds)[0];
}


function randomDirectionAux(exclusions){   //Ya esta listo
 exclusions.map(exclusion => delete ds[exclusion]); //Cambiar a range
}*/



function checkForCollision() {  //FALTA MODULARLO 
  let imgData = ctx.getImageData(point.x-1, point.y-1, 15+2, 15+2);
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
    //(maze.mazeCreated && maze.shouldManual && !maze.showDepths)?mazeManual(ctx):false;
}


function showDepthsAux(){  //Esta listo
    let keys = Object.keys(depths);
    keys.reduce( (a,b) => parseInt(a) - parseInt(b) );
    let colorStep = 1 / keys.length;
    keys.map( (key,i) => showDepthsAux2(key,i) );
}

function showDepthsAux2(key,i){ //Esta listo 
   let cells = maze.depths[key];
   cells.map(cell => canvasChanges(cell,i));   
}

function canvasChanges(cell,i){ //Esta listo
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
        for (var y = 0; y < mazeHeight; y++) { //Cambiar con range para Matrices 
            
            for (var x = 0; x < mazeWidth; x++) { //Cambiar con range para Matrices 
                let cell = gridAt(x, y);
                
                ctx.save();
                ctx.translate(x * tileSize, y * tileSize);
                ctx.beginPath();
                ctx.strokeStyle = '#000000';
                if (cell === 0) {
                    drawEastWall(ctx);
                    drawSouthWall(ctx);
                    drawUnvisited(ctx);
                } else {
                    if (!(cell & Walls.S)) {
                        drawSouthWall(ctx);
                    }
                    if (!(cell & Walls.E)) {
                        drawEastWall(ctx);
                    }
                    if ((cell & Walls.ENTRY)) {
                        drawEntrance(ctx);
                    }
                    if (cell & Walls.EXIT) {
                        drawExit(ctx);
                    }
                }
                if (maze.activeCell && x === maze.activeCell.x && y === maze.activeCell.y) {
                    drawActive(ctx);
                } else if ((cell & Walls.VISITED)) {
                    //drawVisited(ctx);
                }
                
                ctx.stroke();
                ctx.restore();
            }
        }
    }


function mazeManual(ctx){//No tocar
    point.x += point.dx;
    point.y += point.dy;
    if(checkForCollision()){
    point.x -= point.dx;
    point.y -= point.dy;
    point.dx = 0;
    point.dy = 0;
    }
    imgFace.crossOrigin = "Anonymous";
    ctx.drawImage(imgFace, point.x,point.y);
    }



function drawEastWall(ctx) { //Ya esta listo 
    ctx.moveTo(tileSize, 0);
    ctx.lineTo(tileSize, tileSize);
}

function drawSouthWall(ctx) { //Ya esta listo
    ctx.moveTo(0, tileSize);
    ctx.lineTo(tileSize, tileSize);
}

function drawExit(ctx) { //Ya esta listo
    ctx.fillStyle = '#800000';
    ctx.fillRect(tileSize / 3, tileSize / 3 , tileSize /4, tileSize/4 );
}

function drawEntrance(ctx) { //Ya esta listo
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

/*
function drawMice(ctx) { //Ya esta listo
 maze.mice.map(  (mouse) => drawMiceAux(ctx,mouse) ); 
 }

function drawMiceAux(ctx,mouse){ //Ya esta listo
mouse.history.map( h => changeCanvasMice(h,ctx,mouse) ); //Realiza los cambios en en el contexto del Canvas para dibujar el recorrido
}

function changeCanvasMice(h,ctx,mouse){ //Ya esta listo
    (!mouse.solved)?drawMiceAux2(ctx,mouse,tileSize):undefined; //LLama a drawMiceAux2 en caso de que aun no haya encontrado la salida
    ctx.save();
    ctx.globalAlpha = 0.15;
    ctx.translate(h.x * tileSize, h.y * tileSize);
    ctx.fillStyle = mouse.color;
    ctx.fillRect(0, 0, tileSize, tileSize);
    ctx.restore();
}

function drawMiceAux2(ctx,mouse,tileSize){ //Ya esta listo
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
}*/

