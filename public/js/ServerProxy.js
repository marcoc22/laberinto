/*
Proyecto 1: Laberinto

Integrantes: 
Nombre: Marco Tulio Canales Mesén ID:402250724
Nombre: Alfonso Gerardo González Orozco ID:402210937
Nombre: David Antonio Chacón Abarca ID:116240217
Nombre: José Ignacio Ávalos Bonilla ID:207300601

*/
   function dirServer()
  {
  return 'http://127.0.0.1:1337';
  }
//var fetch = require('node-fetch');
 function guardarServer(){  
  let user = document.getElementById('nick').value;
    let jsonMaze=JSON.stringify(maze);
    let dir=dirServer() + '/guardarJuego';


     /*let aux = new Array();
    //maze.solving=true;
    aux.push(maze);
    let jsonMaze=JSON.stringify(aux);*/
    //let data = new FormData();
    //data.append( "json", JSON.stringify( maze) );
   console.log(jsonMaze);
   console.log("fin de linea");
   console.log(dir);




  fetch( dir, {  
    method: 'POST', 
    datatype:'json',
    headers: {  
      "Content-type": "application/x-www-form-urlencoded"  
      } ,
    body: "nick=" + user+"&laberinto="+jsonMaze
      })
  .then(function(response) {
  return response.text().then(function(res) {
    console.log("Juego guardado: "+res);
    
  });
})
  .catch(function(error) {  
   console.log('Request failed', error);  
  });
}


function recuperarServer(){ 
    
  
 fetch('http://127.0.0.1:1337/recuperarJuego?nick=' + document.getElementById('nick').value, {  
    method: 'get', 
  mode:'no-cors',
  datatype:'html',
    headers: {  
      "Content-type": "text/html"  
    }  
  })
  .then(function(response) {
  return response.json().then(function(json) {
    //console.log("Este Laberinto Actulizado vino del server: "); 
    
  //console.log(JSON.parse(json));
  //console.log(json);


 maze = JSON.parse(json);
    reinitialize();
  });
})
  .catch(function(error) {  
   console.log('Request failed', error);  
  });
  }