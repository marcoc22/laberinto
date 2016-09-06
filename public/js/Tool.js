/*
Proyecto 1: Laberinto

Integrantes: 
Nombre: Marco Tulio Canales Mesén ID:402250724
Nombre: Alfonso Gerardo González Orozco ID:402210937
Nombre: David Antonio Chacón Abarca ID:116240217
Nombre: José Ignacio Ávalos Bonilla ID:207300601

*/
class Tool{
	constructor(){

	}
	shuffle (array) {
    	var counter = array.length,temp, index;
        var numbers=[];
        var aux = 0.342;
    // While there are elements in the array
    	while (counter > 0) {
        // Pick a random index
        //index = Math.floor(Math.random() *array.length);
        var random=Math.random();
        index = Math.floor(random*counter);
        //index=Math.floor((aux+0.4542)*array.length);
        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    	}

	    	return array;
	}
}

class PArray extends Array {

static range(a,b){
return Array.from( {length : b-a} , (_,k) => k+a ); 
    }
}


class Matrix extends  Array{

  constructor(n,m){
  super();
  this.n = n;
  this.m = m;
  this.init();
  }
  
  init(){
   PArray.range(0,this.n).forEach( (_,i) =>
   this[i] = PArray(0 , this.m) 
   );
   
    }
}