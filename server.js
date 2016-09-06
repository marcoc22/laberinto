/*
Proyecto 1: Laberinto

Integrantes: 
Nombre: Marco Tulio Canales Mesén ID:402250724
Nombre: Alfonso Gerardo González Orozco ID:402210937
Nombre: David Antonio Chacón Abarca ID:116240217
Nombre: José Ignacio Ávalos Bonilla ID:207300601

*/

//--------------------SERVIDOR--------------------------------------------
let express = require('express');
let app = express();
let path = require('path');
let bodyParser = require('body-parser');
app.use(bodyParser.json());    
app.use(bodyParser.urlencoded({extended: true})); 

//-------------CONEXION CON MONGO------------------------------------------  
let mongoose = require('mongoose');
let db = mongoose.createConnection( 'mongodb://localhost:27017/milaberinto');
let miSchema ;
let gamer;
let nuevo; 
//---------INICIANDO SERVER------------------------------------------------
app.listen(1337,'127.0.0.1');
console.log('          ********* SERVER CORRIENDO PORT: 1337 ********');
//---------------------------Constructor Schema---------------------------
function ConstructSchema(){
	miSchema	= mongoose.Schema({nick : { type : String, trim : true , unique : true },
								   laberinto: { type : String, trim : true },});
	gamer = db.model('users', miSchema);
}
//--------------ENVIO DE LA PAGINA PRINCIPAL PARA SER CARGADA--------------
app.get('/', (req, res)=>{
						  !miSchema?ConstructSchema():false;
						  app.use(express.static(path.join(__dirname, 'public')));
						  res.sendFile(path.join(__dirname +'/../laberinto/public/index.html'));
						  console.log("*** LA PAGINA DEL LABERINTO FUE  RECIBIDA ***");
						 });

  app.post('/guardarJuego', (req, res)=>{
  	let gam = req.body.nick;
	let que = req.body.laberinto;
	console.log('JUEGO GUARDADO... JUGADOR:' + gam + ' Lab: ' + que)
	gamer.update({nick:gam},{$set:{laberinto:que}},{upsert:true},(err,doc)=>{console.log(doc);}); 
	res.send("SAVE GAMER "+gam);
});

app.get('/recuperarJuego', (req, res)=>{
	let que = req.query.nick;
	console.log("SOLICITANDO PARTIDA" + que);
	gamer.find({nick:que},(err,doc)=>{
		(err)? console.log("Ha ocurrido un error.... recuperarJuego"):false;
		res.json(doc[0].laberinto);
		console.log(doc[0].laberinto);});
});

