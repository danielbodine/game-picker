function ajax(){
   var ajaxRequest; 
   
    ajaxRequest = new XMLHttpRequest();
  
    ajaxRequest.onreadystatechange = function(){
   
      if(ajaxRequest.readyState == 4){
         
         //rough list of the game names
         var gameList = ajaxRequest.responseText.split("},{"); 

         //loop through each div tag adding the games
         for (var i = 0; i < 10; i++) {
            var ajaxDisplay = document.getElementById('result' + i.toString())
            if (gameList[i]){
                gameList[i] = cleanupString(gameList[i]);
                ajaxDisplay.innerHTML = gameList[i];
            }
            else{
                ajaxDisplay.innerHTML = '';
            }
        }
      }
   }
   
    //getting the values from the document for the GET request
    var players = document.getElementById('players').value;
    var minaverage = document.getElementById('minaverage').value;
    var maxtime = document.getElementById('maxtime').value;
    
    //building the GET string
    var getString = "?players=" + players + "&minaverage=" + minaverage + "&maxtime=" + maxtime;
    ajaxRequest.open("GET", "api/index.php" + getString, true);
    ajaxRequest.send(null); 
}

//function to clean up the game names
function cleanupString(str) {
    str =  str.split('":"')[1];
    return str.split('"')[0];
}