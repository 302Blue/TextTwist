<?php
    //CORS hiccup fix
    //$.ajax({url: "https://texttwist.paiza-user.cloud/~ubuntu/index.php"});
    
    //Set http header and content type for easier compatibility
    header('HTTP/1.1 200 OK');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin:*');
    header('Access-Control-Allow-Headers:*');
    header('Access-Control-Allow-Methods:GET');
    
    //Generate an original rack to use
    function generate_rack($n){
        $tileBag = "AAAAAAAAABBCCDDDDEEEEEEEEEEEEFFGGGHHIIIIIIIIIJKLLLLMMNNNNNNOOOOOOOOPPQRRRRRRSSSSTTTTTTUUUUVVWWXYYZ";
        $rack_letters = substr(str_shuffle($tileBag), 0, $n);
        $temp = str_split($rack_letters);
        sort($temp);
        return implode($temp);
      };
    $daRack = generate_rack(8);

    //Get the subracks of the rack
    $subRacks = array();
    for($i = 0; $i < pow(2, strlen($daRack)); $i++){
        $ans = "";
        for($j = 0; $j < strlen($daRack); $j++){
            //If the jth digit of i is 1 then include letter
            if (($i >> $j) % 2) {
            $ans .= $daRack[$j];
            }
        }
        if (strlen($ans) > 1){
            $subRacks[] = $ans;	
        }
    }
    $subRacks = array_unique($subRacks);
    
    //Push the subracks into a new array with just the values
    $allRacks=array();
    foreach ($subRacks as $key => $value) {
        array_push($allRacks,"$value");
    }
    
    //Preparation for DB queries
    $dbhandle = new PDO("sqlite:scrabble.sqlite") or die("Failed to open DB");
    if (!$dbhandle) die ("Unable to Connect!");

    //Validate all racks against DB and get all the words
    $ansWords = array();
    for($r = 0; $r < sizeof($allRacks); $r++){
        $temp = $allRacks[$r];
        $query = "SELECT words FROM racks WHERE rack == '$temp'";
        if ($statement = $dbhandle->prepare($query)){
            $statement->execute();
            $thisRack = $statement->fetchAll(PDO::FETCH_ASSOC);
            if (sizeof($thisRack) != 0) {
                array_push($ansWords, array_shift($thisRack));
            }
        }    
    }

    //Send rack and all words to front-end
    echo json_encode(array($daRack,$ansWords));
    
?>
