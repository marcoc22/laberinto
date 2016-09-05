
let timer = {
	hour:0,
	minutes:0,
	seconds:0
}
function clock() {
  timer.seconds++;
   if (timer.seconds >= 60){
      timer.seconds = 0;
      timer.minutes++;
    }            // Minutos
    if (timer.minutes >= 60){
        timer.minutes = 0;
         timer.hour++;
     }
   return addZero(timer.hour)+":"+addZero(timer.minutes)+":"+addZero(timer.seconds);
}
function addZero(s){ return (s < 10) ? ("0" + s) : s; }  

onmessage = function(e) {
  var workerResult = {
    msg : clock()
  } ;
  postMessage(workerResult);
}