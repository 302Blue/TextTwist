var found = [];
var notFound = [];

$(document).ready(function () {
    //Small animation
    $("#title").animate({ marginTop: "40px" }, 1500).
        animate({ marginBottom: "40px" }, 800);
    //Get rack, score, and words left
    getRack();
    getScore();
    wordsLeft();
    //Focus input box and setup keylistener
    document.getElementById("input").focus();
    document.addEventListener("keyup", checkAns);
});

function checkAns() {
    //Force all input to uppercase for easy comparison
    var input = document.getElementById("input").value.toUpperCase();
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
    }
    //Reset any input over 8 chars
    else if (input.length > 8) {
        document.getElementById("input").value = "";
    }
    //Update score and words left
    getScore();
    wordsLeft();
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
                var e = jQuery.Event("keydown", { keyCode: 64 });
                //Trigger an artificial keydown event with keyCode 64
                $("body").trigger(e);
            }
        }
    })

}

function getScore() {
    if (localStorage.getItem('twistScore') == "") {
        let score = 0;
    } else {
        localStorage.setItem('twistScore', score);
    }
    //Score by the length of the found word
    found.forEach(function (el) {
        score += el.length;
    });
    //Set score in html
    document.getElementById("score").innerText = score;
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