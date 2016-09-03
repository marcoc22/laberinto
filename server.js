//Se carga el express y app
var express = require('express');
var app = express();
var path = require('path');


//-------Mongo---------------
//Esto queda igual 
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
//Se envia el archivo index.html
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res){
	if(!userSchema)
		inicializaSchema();// ---------Mongo----------
 res.sendFile(path.join(__dirname + '/../laberinto/public/index.html'));
	console.log("Solicitud de Pagina atendida...");
 });
 
app.get('/crearLab', function(req, res){
		N = req.query.dificultad || 20; //Aqui va tile = 30
	res.json(parsear(generarMatriz())); 
	console.log("Solicitud de Laberinto atendida...N="+N);
 });
 
 app.get('/public/javascripts/Point.js', function(req, res){
		res.sendFile(path.join(__dirname + '/Point.js'));
	console.log("Solicitud de Point atendida...");
 });
 
 app.get('/public/images/error', function(req, res){
		res.sendFile(path.join(__dirname + '/../images/error.mp3'));
	console.log("Solicitud de sound error atendida...");
 });

app.get('/public/images/paso', function(req, res){
		res.sendFile(path.join(__dirname + '/../images/paso.mp3'));
	console.log("Solicitud de sound paso atendida...");
 });
 
//iniciamos el servidor
app.listen(1337,'127.0.0.1'); // PUERTO Y LOCAL HOST
console.log('¡Servidor en Linea !'); //SERVIDOR CORRIENDO





 //-------------------Mongo---------------
 
 app.get('/loggin', function(req, res){
	  let r; 	r=req.query.nick;
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
	  let r; 	r=req.query.laberinto;

//Se busca al jugador en la base
User.find({nick:jugador},function(err,doc){
		 //User.remove({nick:jugador}, function(err){});
		 User.update({nick:jugador},{$set:{laberinto:r}},function(err,doc){
				console.log(doc);
			}); 
			 
	}); 
res.send("jugador guardado "+jugador);
});

app.get('/recuperarJuego', function(req, res){
	let r; 	r=req.query.nick;
	console.log("Pidiendo Recuperar laberinto");
	User.find({nick:jugador},function(err,doc){
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
		//pass : { type : String, trim : true, index : true },
		laberinto: { type : String, trim : true },
	});
	User = db.model('users', userSchema);
	//------------Hay que quitarlo-----------------
	PrimerUsuario = new User({
				nick : jugador,
				//pass : jugador,
				laberinto: ''
			});
			PrimerUsuario.save(function(err, doc){
				console.log(doc);
			});
	//----------------------------------------------
}











function rnd(n){
	return Math.floor(Math.random()*n);
}


 function marcarES(mat)
  {
	entrada = rnd(N);
	salida = rnd(N);
	mat[0][entrada].a = 0; // entrada
	mat[N-1][salida].ab = 0; // salida
	return mat;
  }


function parsear(mat)
{
	let json = '{"N":'+N+',"E":'+entrada+',"S":'+salida+',"mat":[';
	for(let i=0;i<N;i++)
	{
		json+='[';
		
		for(let j=0;j<N;j++)
		{
			json += '{"d":'+mat[i][j].d + ',';
			json += '"i":'+mat[i][j].i + ',';
			json += '"a":'+mat[i][j].a + ',';
			json += '"ab":'+mat[i][j].ab + ',';
			json += '"v":'+mat[i][j].v + '}';
			if(j<N-1) json+=',';
		}
		json += ']';
		if(i<N-1) json+=',';
	}
		
	json+=']}';

return json;
}




function crearMatriz()
{
	var mat = [];
	mat.length = N;
	//------Generamos la Matriz----------
	for(let i=0;i<mat.length;i++)
	{
		mat[i] = [];
		mat[i].length = N;
	}
	return mat;
	
}

function inicializar(mat)
{
	for(let i=0;i<N;i++)
		for(let j=0;j<N;j++)
		{
				mat[i][j] = {d:1,i:1,a:1,ab:1,v:0};
		}
		
	//mat.forEach((e,k,v) => { /*e.forEach((e1,i1,v1) => e1 = {d:1,i:1,a:1,ab:1,v:0});*/});
	//return mat;
}
//var mat;

 function generarMatriz()
  {
	let mat;
	  //let p = new Promise((res,rej) => res(crearMatriz));
	/*var p = Promise.resolve(crearMatriz());
	//-----Llenamos la matriz con todos los espacios bloqueados------------
	
	p.then(a =>{ return inicializar(a);})
	
	//------------Se llenan los elementos en la matriz----------------------
	.then(a => {return MakeLab(a);})
		
	.then(a => {return marcarES(a);})
	.then(a => {mat = a; impMat(mat);})
	
	.catch(a => console.log("ERROR: " + a));*/
	//impMat(mat);
	
	
	
	mat = crearMatriz();
	
	inicializar(mat);
	//impMat(mat);
	mat = MakeLab(mat);
	mat = marcarES(mat);
	//p.then( m => impMat(m));
	return mat;
  }
  
   function impMat(m)
  {
		for(let i=0;i<N;i++)
		{
			var txt =" ";
			for(let j=0;j<N;j++)
				txt += " D: " + m[i][j].d;
			console.log(txt);		
		}
			
  }
  
  function moverDerecha(fil,col,mat,recursivo)
  {
	mat[fil][col].d = 0;
	mat[fil][col+1].i = 0;
	recursivo(mat,fil,col+1);  
  }
  
  function moverIzquierda(fil,col,mat,recursivo)
  {
	mat[fil][col].i = 0;
	mat[fil][col-1].d = 0;
	recursivo(mat,fil,col-1);
  }
  
  function moverArriba(fil,col,mat,recursivo)
  {
	mat[fil][col].a = 0;
	mat[fil-1][col].ab = 0;
	recursivo(mat,fil-1,col);
  }
  
  function moverAbajo(fil,col,mat,recursivo)
  {
	mat[fil][col].ab = 0;
	mat[fil+1][col].a = 0;
	recursivo(mat,fil+1,col);
  }
  
  
   function MakeLab(mat)
  {
	let recursivo = function(mat,fil,col)
	{
		//---------marcamos la posicion como visitada
		mat[fil][col].v = 1;
		let pos = [0,1,2,3];
		//---------Elegimos un vecino que no este visitado
		
		while(pos.length > 0)
		{
			let opc = rnd(pos.length);
			switch(pos[opc])
			{
			case 0: //arriba
				(fil > 0 && mat[fil-1][col].v == 0) ? moverArriba(fil,col,mat,recursivo) : true;
				break;
			case 1:  //derecha
				(col < N-1 && mat[fil][col+1].v == 0)? moverDerecha(fil,col,mat,recursivo) : true;
				break;
			case 2: //izquierda
				(col > 0 && mat[fil][col-1].v == 0) ? moverIzquierda(fil,col,mat,recursivo) : true;
				break;
			case 3:   //abajo
				(fil < N-1 && mat[fil+1][col].v == 0)? moverAbajo(fil,col,mat,recursivo) : true;
				break;
			}
			pos.splice(opc,1); // elimina el valor seleccionado del array		
		}
		return mat;
	}
	
	return recursivo(mat,rnd(N),rnd(N));
  }
   
