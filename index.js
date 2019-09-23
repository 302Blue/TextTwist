var found = [];
var notFound = [];

$(document).ready(function () {
    $("#title").animate({ marginTop: "40px" }, 1500).
        animate({ marginBottom: "40px" }, 800);

    getRack();
    document.getElementById("input").focus();
    document.addEventListener("keyup", checkAns);
    getScore();
    wordsLeft();
});

function checkAns() {
    var input = document.getElementById("input").value.toUpperCase();
        if (notFound.includes(input) && !(found.includes(input))) {
            document.getElementById("wordsfound").append(input + ' ');
            document.getElementById("wordsleft").innerText = notFound.length - found.length;
            document.getElementById("input").value = "";
            found.push(input);
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

function wordsLeft(el) {
    let letter2 = 0;
    let letter3 = 0;
    let letter4 = 0;
    let letter5 = 0;
    let letter6 = 0;
    let letter7 = 0;
    let letter8 = 0;
    notFound.forEach(function (el) {
        switch (el.length) {
            case 2:
                letter2++;
            case 3:
                letter3++;
            case 4:
                letter4++;
            case 5:
                letter5++;
            case 6:
                letter6++;
            case 7:
                letter7++;
            case 8:
                letter8++;
        }
    });
    document.getElementById("wordlengths").rows[1].cells[0].innerHTML = letter2;
    document.getElementById("wordlengths").rows[1].cells[1].innerHTML = letter3;
    document.getElementById("wordlengths").rows[1].cells[2].innerHTML = letter4;
    document.getElementById("wordlengths").rows[1].cells[3].innerHTML = letter5;
    document.getElementById("wordlengths").rows[1].cells[4].innerHTML = letter6;
    document.getElementById("wordlengths").rows[1].cells[5].innerHTML = letter7;
    document.getElementById("wordlengths").rows[1].cells[6].innerHTML = letter8;
}
