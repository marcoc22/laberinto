
save = () => {
    let aux = new Array();
    maze.solving=true;
    aux.push(point);
    aux.push(maze);
    localStorage.setItem("user",JSON.stringify(aux));
    }




load = () => {
    let obj = JSON.parse(localStorage.getItem("user"));
        maze=obj.pop();
        point= obj.pop();
      
    }