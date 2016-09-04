window.onload = e => {
    fromEvent(e)
    .then(initView())
    .then(enableButtons(step3Buttons,true))
    .then(init())
    .then(update())
    .catch(logError)
}
/*initView();
startClock();
enableButtons(step3Buttons,true);
init();
update();*/
window.addEventListener('onMazeCompleted', e => {
    fromEvent(e)
    .then(_ => get("playAgain").innerHTML="has ganado automatico")
    .catch(logError)
    }
    //document.location="#tallModal";
);

window.addEventListener('onMazeManualCompleted', e => {
    fromEvent(e)
    .then(_ => get("playAgain").innerHTML="has ganado manual")
    .catch(logError)
    }
);

solveRunBtn.addEventListener('click', e => {
    fromEvent(e)
    .then(_ => maze.shouldSolve = true)
    .then(startClock())
    .then(startWork())
    //.then(_ => myWorker.onmessage)
    .then(enableButtons(step2Buttons,true))
    .then(enableButtons(step3Buttons,true))
    .catch(logError)
    }
);

solveManBtn.addEventListener('click', e => {
    fromEvent(e)
    .then(_ => point.x=8,point.y=4,point.dx=0,point.dy=0)
    .then(_ => maze.shouldManual=true)
    .then(enableButtons(step2Buttons,true))
    .then(enableButtons(step3Buttons,true))
    .then(_ => canvas.setAttribute("autofocus","true"))
    .then(_ => window.onkeydown=processKey)
    .then(_ =>  window.onkeyup=processKeyUp)
    .catch(logError)
    }
);


goBtn.addEventListener('click', e => {
    fromEvent(e)
    .then(init(rowsInput.value, colsInput.value))
    .then(enableButtons(step2Buttons,true))
    .then(enableButtons(step3Buttons,true))
    .then(resetBacktrack())
    .then(quickCarve(maze.backTrack[0]))
    .then(enableButtons(step3Buttons,false))
    .then(_ =>  maze.mazeCreated = true)
    .then(_ =>  maze.grid[0][0] |= Walls.ENTRY)
    .then(_ => $("#step1").delay(10).hide(600))
    .then(_ => $("#step2").delay(10).show(600))
    .catch(logError)
    }
);

colsInput.addEventListener('change',  e => {
    fromEvent(e)
    .then(rowsColsAction())
    .catch(logError)
    }
);

rowsInput.addEventListener('change',  e => {
    fromEvent(e)
    .then(rowsColsAction())
    .catch(logError)
    }
);

nickBtn.addEventListener('click', e => {
     fromEvent(e)
    .then(nickBtnAction())
    .catch(logError)
    }
);
loadBtn.addEventListener('click', e => {
     fromEvent(e)
    .then(preLoad())
    .catch(logError)
    }
);
saveBtn.addEventListener('click', e => {
     fromEvent(e)
    .then(save())
    .catch(logError)
    }
);

serverSave.addEventListener('click', e => {
     fromEvent(e)
    .then(guardarServer())
    .catch(logError)
    }
);

recuBtnServer.addEventListener('click', e => {
     fromEvent(e)
    .then(recuperarServer())
    .catch(logError)
    }
);