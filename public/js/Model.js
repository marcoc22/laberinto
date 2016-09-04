
let get = element => document.getElementById(element);//funcion para obtener un elemento del dom mediante id
let canvas = get('maze');
let nickInput = get('nick');
let rowsInput = get('rows');
let colsInput = get('cols');
let clockInput = get("time");
let radioLocalInput = get("radioLocal");
let goBtn = get('goBtn');
let solveRunBtn = get('solveRunBtn');//boton de solucion automatica
let solveManBtn = get('solveManBtn');//boton solucion manual
let loadBtn = get('loadBtn');
let saveBtn = get('saveBtn');
let nickBtn = get('addNick');
let tool = new Tool();

let     ctx,tileSize,
        mazeWidth,mazeHeight, 
        totalTiles,updateFrame,
        raf = window.requestAnimationFrame, //animacion
        showHeatMap = true,
        heatmaps = {rw: true,rwm: true},//pantalla
        stepBtn,step2Buttons,step3Buttons,//botones
        // eventos
        onMazeCompleted = new Event('onMazeCompleted'),
        onMazeManualCompleted=new Event("onMazeManualCompleted"),
        changeMazeSize;

const low = chroma('#6D3FA9');
const mid = chroma('#BFDE42');
const high = chroma('#5C59CD');
const cs = chroma.scale('Blues');
const size = 30;
const colors = chroma.interpolate.bezier([low, mid, high]);
const logError = e => console.log(e);

//**********Clases

let Walls = new Wall();
let OppositeWalls = { N: Walls.S,S: Walls.N,E: Walls.W,W: Walls.E};

let SeekDirections = Array.of({key: 'N', x: 0, y: -1},{key:'S',x:0 ,y:1},{key: 'E',x: 1,y: 0},{key: 'W',x: -1,y: 0});

let OppositeSeekDirections = { N:'S' ,S:'N' , E:'W' ,W:'E' };

let SeekLookup = {'N': SeekDirections[0],'S': SeekDirections[1],'E': SeekDirections[2],'W': SeekDirections[3]};

let point = new Point();
let timer = new Timer(0,0,0);
let myWorker = new Worker("js/Worker.js");
let maze;