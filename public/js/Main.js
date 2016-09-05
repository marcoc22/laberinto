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
    .then(stopWorker())
    .then(_ => $("#loadingSolution").delay(10).hide(600))
    .then(_ => $("#playAgain").delay(10).show(600))
    .then(_ => $("#divAgainBtn").show())
    .catch(logError)
    }
    //document.location="#tallModal";
);

window.addEventListener('onMazeManualCompleted', e => {
    fromEvent(e)
    .then(stopWorker())
    .then(_ => $("#loadingSolution").delay(10).hide(600))
    .then(_ => $("#playAgain").delay(10).show(600))
    .then(_ => $("#divAgainBtn").show())
    .catch(logError)
    }
);

solveRunBtn.addEventListener('click', e => {
    fromEvent(e)
    .then(_ => clockInput.innerHTML = "00:00:00")
    .then(_ => $("#step3").delay(10).show(600))
    .then(_ => maze.shouldSolve = true)
    .then(_ => myWorker = null)
    .then(_ => myWorker = new Worker("js/Worker.js"))
    .then(startWork)
    .then(_ => myWorker.onmessage =  e =>  fromEvent(e) // Worker Message-Workflow
                                           .then(updateView) 
                                                 
         )
    .then(enableButtons(step2Buttons,true))
    .then(enableButtons(step3Buttons,true))
    .then(_ => $("#loadingSolution").delay(10).show(600))
    .then(_ => $("#playAgain").delay(10).hide(600))
    .then(_ => $("#playing").delay(10).show(600))
    .then(_ => $("#step2").delay(10).hide(600))
    .catch(logError)
    }
);

solveManBtn.addEventListener('click', e => {
    fromEvent(e)
    .then(_ => clockInput.innerHTML = "00:00:00")
    .then(_ => maze.face.x=8,maze.face.y=4,maze.face.dx=0,maze.face.dy=0)
    .then(_ => $("#step3").delay(10).show(600))
    .then(_ => maze.shouldManual=true)
    .then(_ => myWorker = null)
    .then(_ => myWorker = new Worker("js/Worker.js"))
    .then(startWork)
    .then(_ => myWorker.onmessage =  e =>  fromEvent(e) // Worker Message-Workflow
                                           .then(updateView) 
                                                 
         )
    .then(enableButtons(step2Buttons,true))
    .then(enableButtons(step3Buttons,true))
    .then(_ => $("#playing").delay(10).show(600))
    .then(_ => $("#step2").delay(10).hide(600))
    .then(_ => $("#loadingSolution").delay(10).show(600))
    .then(_ => $("#playAgain").delay(10).hide(600))
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
    .then(preSave())
    .catch(logError)
    }
);
againBtn.addEventListener('click',  e => {
    fromEvent(e)
    .then(rowsColsAction())
    .then(_ => $("#playing").delay(10).hide(600))
    .then(_ => $("#step3").delay(10).hide(600))
    .then(_ => $("#step0").delay(10).show(600))
    .then(_ => nickInput.value="")
    .then(_ => $("#loadingSolution").delay(10).hide(600))
    .then(_ => $("#playAgain").delay(10).hide(600))
    .then(_ => clockInput.value = "00:00:00")
    .then(_ => $("#divAgainBtn").hide())
    .catch(logError)
    }
);

