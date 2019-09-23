var found = [];
var notFound = [];
    
$(document).ready(function () {
    $("#title").animate({ marginTop: "40px" }, 1500).
        animate({ marginBottom: "40px" }, 800);
    getRack();
    getScore();
    wordsLeft();
    document.getElementById("input").focus();
    document.addEventListener("keyup", checkAns);
});

function checkAns() {
    var input = document.getElementById("input").value.toUpperCase();
    if (notFound.includes(input) && !(found.includes(input))) {
        found.push(input);
        document.getElementById("input").value = "";
        document.getElementById("wordsfound").append(input + ' ');
    } 
    else if (input.length > 8) {
        document.getElementById("input").value = "";
    }
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
                $('#rack').append(response[0]);
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
    let score = 0;
    found.forEach(function (el) {
        score += el.length;
    });
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
    notFound.forEach(function (el) {
        console.log("THIS IS RUNNING");
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
    document.getElementById("wordsleft").innerText = notFound.length - found.length;
    document.getElementById("wordlengths").rows[1].cells[0].innerHTML = letter2;
    document.getElementById("wordlengths").rows[1].cells[1].innerHTML = letter3;
    document.getElementById("wordlengths").rows[1].cells[2].innerHTML = letter4;
    document.getElementById("wordlengths").rows[1].cells[3].innerHTML = letter5;
    document.getElementById("wordlengths").rows[1].cells[4].innerHTML = letter6;
    document.getElementById("wordlengths").rows[1].cells[5].innerHTML = letter7;
    document.getElementById("wordlengths").rows[1].cells[6].innerHTML = letter8;
}
