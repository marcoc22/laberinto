/*
Proyecto 1: Laberinto

Integrantes: 
Nombre: Marco Tulio Canales Mesén ID:402250724
Nombre: Alfonso Gerardo González Orozco ID:402210937
Nombre: David Antonio Chacón Abarca ID:116240217
Nombre: José Ignacio Ávalos Bonilla ID:207300601

*/
save = () => {
    let aux = new Array();
    maze.solving=true;
    aux.push(maze);
    localStorage.setItem("user",JSON.stringify(aux));
    }




load = () => {
    let obj = JSON.parse(localStorage.getItem("user"));
        maze=obj.pop();
      
    }