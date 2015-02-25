<?php
// A simple web site in Cloud9 that runs through Apache
// Press the 'Run' button on the top to start the web server,
// then click the URL that is emitted to the Output tab of the console

$dbhandle = new PDO("sqlite:bgg.sqlite") or die("Failed to open DB");

//initial variables
$players = 3;
$minaverage = 0;
$maxtime = 180;

//set the variables from the get request
$players =  htmlspecialchars($_GET["players"]);
$minaverage =  htmlspecialchars($_GET["minaverage"]);
$maxtime =  htmlspecialchars($_GET["maxtime"]);

//build the query

$query = "SELECT objectname from games where minplayers<=" . $players . " and maxplayers>=" .$players . 
    " and average>=" . $minaverage .
    " and playingtime<=" . $maxtime .
    " order by random() ASC limit 0, 10";

//run the query and output results
$statement = $dbhandle->prepare($query);
$statement->execute();
$results = $statement->fetchAll(PDO::FETCH_ASSOC);
header('HTTP/1.1 200 OK');
header('Content-Type: application/json');
echo json_encode($results);

?>

