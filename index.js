var found = [];
var notFound = [];

$(document).ready(function () {
    $("#title").animate({ marginTop: "40px" }, 1500).
        animate({ marginBottom: "40px" }, 800);

    getRack();
    getScore();
    wordsLeft();
    document.querySelector('#wordsleft').innerText = notFound.length - found.length;
    document.getElementById("#input").focus();
    document.addEventListener("keyup", checkAns());
});

function checkAns() {
    var input = document.querySelector('#input').value.toUpperCase();
        if (notFound.includes(input) && !(found.includes(input))) {
            document.querySelector('#wordsfound').append(input + ' ');
            document.querySelector('#wordsleft').innerText = notFound.length - found.length;
            document.querySelector('#input').value = "";
            found.push(input);
        } 
        else if (input.length > 8) {
            document.querySelector('#input').value = "";
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
        if (found.includes(el)) {
            score =+ el.length;
        }
    });
    document.querySelector('#score').innerText = score;
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
        if (!(found.includes(el))) {
            switch (el.length) {
                case 2:
                    var letter2 =+ 1;
                case 3:
                    var letter3 =+ 1;
                case 4:
                    var letter4 =+ 1;
                case 5:
                    var letter5 =+ 1;
                case 6:
                    var letter6 =+ 1;
                case 7:
                    var letter7 =+ 1;
                case 8:
                    var letter8 =+ 1;
            }
        }
    });

    document.querySelector('#wordlengths').rows[1].cells[1].innerHTML = letter2;
    document.querySelector('#wordlengths').rows[1].cells[2].innerHTML = letter3;
    document.querySelector('#wordlengths').rows[1].cells[3].innerHTML = letter4;
    document.querySelector('#wordlengths').rows[1].cells[4].innerHTML = letter5;
    document.querySelector('#wordlengths').rows[1].cells[5].innerHTML = letter6;
    document.querySelector('#wordlengths').rows[1].cells[6].innerHTML = letter7;
    document.querySelector('#wordlengths').rows[1].cells[7].innerHTML = letter8;
}
