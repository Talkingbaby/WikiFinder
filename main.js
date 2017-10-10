var heroBox = document.querySelector('.hero');
var resultsBox = document.querySelector('.results-box');
var results = document.querySelector('.results');
var input = document.querySelector('.input');
var searchBtn = document.getElementById("search-btn")

searchBtn.addEventListener("click", getUserInput);

function getUserInput() {
    var userInput = input.value;
    var results = [];

    var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch='
              + userInput;

    var myInit = {
        method: 'POST',
        mode: 'cors',
        cache: 'default'
    };

    if (!userInput) {
        alert("Looks like you haven't entered anything.");
    } else {
        fetch(api, myInit)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok: ' + response.statusText);
            }).then(function (data) {
                console.log('data: ', data);
                for (const key of Object.keys(data.query.pages)) {
                    results.push(data.query.pages[key]);
                }
                makeResults(results);
                console.log('results: ', results);
            });
    }
}

function makeResults(response) {
    var page = 'https://en.wikipedia.org/?curid=';

    if(results.hasChildNodes()) {
        while (results.hasChildNodes()) {
            results.removeChild(results.lastChild);
        }
    }

    for (const item of response) {
        var resultDiv = document.createElement('div');
        var contentDiv = document.createElement('div');
        var title = document.createElement('h3');
        var image = document.createElement('img');
        var title = document.createElement('h3');
        var extract = document.createElement('p');
        var link = document.createElement('a');

        resultDiv.classList.add('column');
        resultDiv.classList.add('card');
        resultDiv.classList.add('is-one-quarter');
        contentDiv.classList.add('card-content');

        title.classList.add('title');
        title.innerHTML = item.title;

        extract.classList.add('content');
        extract.innerHTML = item.extract;

        link.classList.add('subtitle');
        link.innerHTML = 'Go to article';
        link.setAttribute('target', '_blank');
        link.href = page + item.pageid;

        resultDiv.appendChild(title);
        resultDiv.appendChild(extract);
        resultDiv.appendChild(link);
        results.appendChild(resultDiv);

        resultsBox.classList.remove('hide');
        heroBox.classList.remove('is-fullheight');
        heroBox.classList.add('is-small');
    }
}


