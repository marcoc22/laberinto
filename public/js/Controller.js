'use strict';


function clock() {
  timer.seconds++;
   if (timer.seconds >= 60){
      timer.seconds = 0;
      timer.minutes++;
    }            // Minutos
    if (timer.minutes >= 60){
        timer.minutes = 0;
         timer.hour++;
     }
   return addZero(timer.hour)+":"+addZero(timer.minutes)+":"+addZero(timer.seconds);
}
function addZero(s){ (s < 10) ? ("0" + s) : s; }  
function startClock(){ setInterval(() =>  clockInput.innerHTML = clock(), 1000) }
function postMsg(msg) {
          if (myWorker)
           myWorker.postMessage({msg : clock()});
}
function startWork(){
             setInterval(() => postMsg('main'), 1000);
          }
function fromEvent(e, f = x => x){ return Promise.resolve(f(e)); }

function  initView(){
    step2Buttons = [
        goBtn
    ];
    step3Buttons = [
        solveRunBtn,
        solveManBtn
    ];
}
function enableButtons(args,value){
  Array.prototype.slice.call(args).forEach( (btn) => { 
    btn.disabled=value; 
    return (value)?btn.className="button positive disabled":btn.className="button positive" ;
  });
}

function processKey(e){

  if (e.keyCode == 38) {//tecla arriba
    point.dy = -2.5;
  }

  if (e.keyCode == 40) {//tecla abajo
    point.dy = 2.5;

  }

  if (e.keyCode == 37) {//tecla izquierda
    point.dx = -2.5;
  }

  if (e.keyCode == 39) {//tecla derecha
    point.dx = 2.5;
  }

}
function processKeyUp(e){

  if (e.keyCode == 38) {//tecla arriba
    point.dy = 0;
  }

  if (e.keyCode == 40) {//tecla abajo
    point.dy = 0;

  }

  if (e.keyCode == 37) {//tecla izquierda
    point.dx = 0;
  }

  if (e.keyCode == 39) {//tecla derecha
    point.dx = 0;
  }

}

function init() {
    let width=rowsInput.value;//*
    let height=colsInput.value;//*
    tileSize = size;//tamaño de celda
    mazeWidth = width;
    mazeHeight = height;
    totalTiles = width * height;

    ctx = canvas.getContext('2d');
    if (!ctx) {
        throw (new Error('Error'));
    }

    canvas.width = width * size;
    canvas.height = height * size;

    maze = new Maze(width,height,[],{},true,false,false,null,0,0,null,false,false,[],false);
    maze.mice.push(new Mouse());
    populateGrid();
}
function rowsColsAction(){
    init(rowsInput.value, colsInput.value);
    enableButtons(step2Buttons,false);
    enableButtons(step3Buttons,true);
}
function nickBtnAction(){
  if(nickInput.value!=""){
    nickInput.style.boxShadow="#80a62d";
    nickInput.title="";
    $("#step0").delay(10).hide(600);
    $("#step1").delay(10).show(600);
  }else{
    nickInput.style.boxShadow="#e02a16";
    nickInput.title="Debe digitar un usuario";
  }
}
function preLoadLocal(){
    load();
    reinitialize();
}

function preLoad(){ (radioLocal.checked)? preLoadLocal() : recuperarServer() }
function preSave(){ (radioLocal.checked)? save() : guardarServer() }

function reinitialize(){
  quickCarve(maze.backTrack[0]);

    //grid[0][0] |= Walls.ENTRY;
    let width=maze.width;//*
    let height=maze.height;//*
    tileSize = maze.size;//tamaño de celda
    mazeWidth = width;
    mazeHeight = height;
    totalTiles = width * height;
    ctx = canvas.getContext('2d');

    if (!ctx) {
        throw (new Error('Error'));
    }
    canvas.width = width * size;
    canvas.height = height * size;
    update();
    
    if(maze.shouldManual){
     $("#playing").delay(10).show(600);
     $("#step0").delay(10).hide(600);
     $("#loadingSolution").show();
     $("#step3").show();    
      window.onkeydown=processKey;
      window.onkeyUp=processKeyUp;  
    }
   
}

function resetBacktrack(){ 
  maze.backTrack = []; 
  maze.backTrack.push(new Point(0, 0,0,0)); 
} 

function populateGrid() {
    maze.grid = [];
    for (var y = 0; y < mazeHeight; y++) {
        maze.grid[y] = [];
        for (var x = 0; x < mazeWidth; x++) {
            maze.grid[y].push(Walls.I);
        }
    }
}

function gridAt(x,y,value) { 
  (value) ? maze.grid[y][x] = value : undefined; 
  return maze.grid[y][x];
}

function inGridRange(x,y) { return (x >= 0 && x < mazeWidth && y >= 0 && y < mazeHeight) }

  
  