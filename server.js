//cargamos el package express y creamos nuestra app
var express = require('express');
var app = express();
var path = require('path');


//-------Mongo---------------
  
var mongoose = require('mongoose');
var db = mongoose.createConnection( 'mongodb://localhost:27017/primer_base');
var userSchema ;
var User;
var PrimerUsuario; 
var jugador = 'P1';
//-------------

var N;
var entrada;
var salida;


//enviamos nuestro archivo index.html al usuario como página de inicio

app.get('/', function(req, res){
	if(!userSchema)
		inicializaSchema();// ---------Mongo----------
	app.use(express.static(path.join(__dirname, 'public')));
 res.sendFile(path.join(__dirname +'/../laberinto/public/index.html'));
	console.log("Solicitud de Pagina atendida...");
 });
 
//iniciamos el servidor
app.listen(1337,'127.0.0.1');
console.log('¡Server corriendo sobre el puerto 1337!');





 //-------------------Mongo---------------
 
 app.get('/loggin', function(req, res){
	  let r = req.query.nick;
console.log("dentro de logging"+ r);
//Se busca al jugador en la base
User.find({nick:r},function(err,doc){
		 if(doc.length==0){
		
			PrimerUsuario=new User({
				nick : r,
				pass : r,
				laberinto: ''
			});
			PrimerUsuario.save(function(err, doc){
				console.log(doc);
			});
			
		 }
		 else
			console.log("echo"); //res.send("error "+r+" ya existe");
		});
jugador=r;		
res.send(r);
console.log("echo");
});

  
  app.post('/guardarJuego', function(req, res){
		let r = req.query.laberinto;
		let usr = req.query.nick;
		console.log('Guardando juego para Jugador: ' + usr + ' Lab: ' + r)

		User.update({nick:usr},{$set:{laberinto:r}},{upsert:true},function(err,doc){
				console.log(doc);
			}); 
	res.send("jugador guardado "+usr);
});

app.get('/recuperarJuego', function(req, res){
	let r = req.query.nick;
	console.log("Pidiendo Recuperar laberinto" + r);
	User.find({nick:r},function(err,doc){
		if(err) console.log("Ha ocurrido un error.... recuperarJuego");
		res.json(doc[0].laberinto);
		console.log(doc[0].laberinto);
		
	});
});

app.get('/eliminarJuego', function(req, res){
		let r = req.query.nick;
		User.remove({nick:r},function(err,doc){
			console.log("eliminado desde mongo");
			});
			res.send("Eliminado");
});

function inicializaSchema(){
	userSchema	= mongoose.Schema({
		nick : { type : String, trim : true , unique : true },
		pass : { type : String, trim : true, index : true },
		laberinto: { type : String, trim : true },
	});
	User = db.model('users', userSchema);
	//------------Hay que quitarlo-----------------
	/*PrimerUsuario = new User({
				nick : jugador,
				pass : jugador,
				laberinto: ''
			});
			PrimerUsuario.save(function(err, doc){
				console.log(doc);
			});*/
	//----------------------------------------------
}











