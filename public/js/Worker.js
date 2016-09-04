onmessage = function(e) {
  var workerResult = {
    msg : clock()
  } ;
  postMessage(workerResult);
}