function save() {
    let aux = new Array();
    maze.solving=true;
    aux.push(maze);
    localStorage.setItem("user",JSON.stringify(aux));
    }
function load() {
    let obj = JSON.parse(localStorage.getItem("user"));
        maze=obj.pop();
    }