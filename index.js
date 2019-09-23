var found = [];
var notFound = [];

$(document).ready(function () {
    $("#title").animate({ marginTop: "40px" }, 1500).
        animate({ marginBottom: "40px" }, 800);

    getRack();
    document.getElementById("input").focus();

    document.addEventListener("keyup", function () {
        var input = document.querySelector('#input').value.toUpperCase();
        if (notFound.includes(input) && !(found.includes(input))) {
            document.querySelector('#wordsfound').append(input + ' ');
            found.push(input);
            document.querySelector('#input').value = "";
        }
        else if (input.length > 8) {
            document.querySelector('#input').value = "";
        }
        document.querySelector('#wordsleft').innerText = notFound.length - found.length;
        document.querySelector('#wordlengths').innerText = '';
        notFound.forEach(function (el) {
            if (!found.includes(el)) {
                document.querySelector('#wordlengths').innerText += el.length + ' ';
            }
        })
    });

});

function getRack() {
    $.ajax({
        url: "https://texttwist.paiza-user.cloud/~ubuntu/index.php",
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

