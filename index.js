var score = 0;
var oldScore = 0;
var found = [];
var notFound = [];

$(document).ready(function () {
    //Small animation 
    $(".logo").animate({ marginTop: "40px" }, 1500).
        animate({ marginBottom: "40px" }, 800);
    //Get stored score if it exists
    oldScore = localStorage.getItem('twistScore');
    //Focus input box and setup keylistener and score
    document.getElementById("input").focus();
    document.addEventListener("keyup", checkAns);
    //Get rack, score, and words left
    getRack();
    getScore();
    wordsLeft();
});

function checkAns() {
    //Force all input to uppercase for easy comparison
    var input = document.getElementById("input").value.toUpperCase();
    //If answer is correct
    if (notFound.includes(input) && !(found.includes(input))) {
        //Add input to found array and reset input
        found.push(input);
        document.getElementById("input").value = "";
        document.getElementById("wordsfound").append(input + ' ');
        //Remove found value from notFound array
        for (var j = notFound.length; j > 0; j--) {
            if (notFound[j] == input) {
                notFound.splice(j, 1);
            }
        }
        //Update score and words left
        getScore();
        wordsLeft();
    }
    //Reset any input over 8 chars
    else if (input.length > 8) {
        document.getElementById("input").value = "";
    }
}

function getRack() {
    $.ajax({
        url: "db/api.php",
        contentType: "application/json",
        type: "GET",
        statusCode: {
            200: function (response) {
                var count = 0;
                //Get rack value
                $('#rack').append(response[0]);
                //Get all of the word values and add to the notFound array
                for (var i = 0; i < response[1].length; i++) {
                    if (response[1][i].words.includes("@@")) {
                        var splitWords = response[1][i].words.split('@@')
                        splitWords.forEach(function (el) {
                            notFound[count] = el;
                            count++;
                        })
                    }
                    else {
                        notFound[count] = response[1][i].words;
                        count++;
                    }
                }
            }
        }
    })
}

function getScore() {
    //Reset score to avoid scoring errors
    score = 0;
    //Set score according to found words
    found.forEach(function (el) {
        score += el.length;
    });
    //Add-in old score if it existed
    if (oldScore != null) {
        score += parseInt(oldScore);
    }
    //Update the html element
    document.getElementById("score").innerText = score;
    //Update local score
    localStorage.setItem('twistScore', score);
}

function updateScore() {
    //Set score according to found words
    
    
    
}

function wordsLeft() {
    let letter2 = 0;
    let letter3 = 0;
    let letter4 = 0;
    let letter5 = 0;
    let letter6 = 0;
    let letter7 = 0;
    let letter8 = 0;
    //Get the length of the words left
    notFound.forEach(function (el) {
        if (el.length == 2) {
            letter2++;
        } else if (el.length == 3) {
            letter3++;
        } else if (el.length == 4) {
            letter4++;
        } else if (el.length == 5) {
            letter5++;
        } else if (el.length == 6) {
            letter6++;
        } else if (el.length == 7) {
            letter7++;
        } else if (el.length == 8) {
            letter8++;
        }
    });
    //Set number of words left and set their lengths in html
    document.querySelector("#wordsleft").innerText = notFound.length;
    document.getElementById("wordlengths").rows[1].cells[0].innerHTML = letter2;
    document.getElementById("wordlengths").rows[1].cells[1].innerHTML = letter3;
    document.getElementById("wordlengths").rows[1].cells[2].innerHTML = letter4;
    document.getElementById("wordlengths").rows[1].cells[3].innerHTML = letter5;
    document.getElementById("wordlengths").rows[1].cells[4].innerHTML = letter6;
    document.getElementById("wordlengths").rows[1].cells[5].innerHTML = letter7;
    document.getElementById("wordlengths").rows[1].cells[6].innerHTML = letter8;
}