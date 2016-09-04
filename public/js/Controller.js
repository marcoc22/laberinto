'use strict';
/*function shuffle(array) {
    var counter = array.length,temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}*/
bindView = ()=>{
    step2Buttons = [
        goBtn
    ];
    step3Buttons = [
        solveRunBtn,
        solveManBtn
    ];

}
enableButtons = (args,value) => Array.prototype.slice.call(args).forEach( (btn) => { 
    btn.disabled=value; 
    return (value)?btn.className="button positive disabled":btn.className="button positive" ;
} );

processKey = e => {

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
processKeyUp = e => {

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

processKeyNew = e => {

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

bindView();
enableButtons(step3Buttons,true);

// create maze event listener
window.addEventListener('onMazeCompleted', function () {

    get("playAgain").innerHTML="has ganado automatico";
    //document.location="#tallModal";

});
window.addEventListener('onMazeManualCompleted', function () {
    get("playAgain").innerHTML="has ganado manual";

});



solveRunBtn.addEventListener('click', function () {
    maze.shouldSolve = true;
    enableButtons(step2Buttons,true);
    enableButtons(step3Buttons,true);
});
solveManBtn.addEventListener('click', function () {
    //shouldSolve = true;
    /*var imgFace = new Image();
  imgFace.src = 'face.png';
  imgFace.onload = function(){
    ctx.drawImage(imgFace, 100,100);
  }*/
    //ctx.clearRect(0,0,canvas.width,canvas.height)
    point.x=8,point.y=4,point.dx=0,point.dy=0;
    maze.shouldManual=true;
    enableButtons(step2Buttons,true);
    enableButtons(step3Buttons,true);
    canvas.setAttribute("autofocus","true");
    window.onkeydown=processKey;
    window.onkeyup=processKeyUp;
    document.querySelector('canvas').autofocus = true;

});


goBtn.addEventListener('click', function () {
    
    
    init(rowsInput.value, colsInput.value);
    
    enableButtons(step2Buttons,true);
    enableButtons(step3Buttons,true);
    resetBacktrack();
    quickCarve(maze.backTrack[0]);
    enableButtons(step3Buttons,false);
    maze.mazeCreated = true;
    maze.grid[0][0] |= Walls.ENTRY;
    
    $("#step1").delay(10).hide(600);
    $("#step2").delay(10).show(600);
});
colsInput.addEventListener('change',function(){
    init(rowsInput.value, colsInput.value);
    enableButtons(step2Buttons,false);
    enableButtons(step3Buttons,true);
});
rowsInput.addEventListener('change',function(){
    init(rowsInput.value, colsInput.value);
    enableButtons(step2Buttons,false);
    enableButtons(step3Buttons,true);
});
nickBtn.addEventListener('click',function(){
    if(nickInput.value!=""){
        $("#step0").delay(10).hide(600);
    $("#step1").delay(10).show(600);
    }else{
        nickInput.title="Debe ingresar un nombre de usuario";
    }
    
});
loadBtn.addEventListener('click', function () {
    preLoad();
});
saveBtn.addEventListener('click', function () {
    save();
});

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
function preLoad(){
    load();
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

}

resetBacktrack = () => { maze.backTrack = []; maze.backTrack.push(new Point(0, 0,0,0)); } //mejorar aun, es imperativo todavia

function populateGrid() {
    maze.grid = [];
    for (var y = 0; y < mazeHeight; y++) {
        maze.grid[y] = [];
        for (var x = 0; x < mazeWidth; x++) {
            maze.grid[y].push(Walls.I);
        }
    }
}

gridAt = (x,y,value) => { (value) ? maze.grid[y][x] = value : undefined; return maze.grid[y][x];}

init();
update();

//var raf = window.requestAniationFrame;Point

inGridRange = (x,y) => { return (x >= 0 && x < mazeWidth && y >= 0 && y < mazeHeight) }

save = () => {
    let aux = new Array();
    aux.push(maze);
    localStorage.setItem(nickInput.value,JSON.stringify(aux));
    }
load = () => {
    let obj = JSON.parse(localStorage.getItem(nickInput.value));
        maze=obj.pop();
    }

