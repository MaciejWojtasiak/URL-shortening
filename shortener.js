const field = document.querySelector('.field');
const submitBtn = document.querySelector('.submit');




submitBtn.addEventListener('click', sendUrl)


function sendUrl() {
    let url = field.value + "";

    const jsonString = JSON.stringify({ "url": url });

    const xhr = new XMLHttpRequest();

    xhr.open('POST', 'https://rel.ink/api/links/', true);

    xhr.onload = function () {
        let hash = JSON.parse(this.responseText);
        console.log(hash)
    }

    xhr.setRequestHeader('content-Type', 'application/json');
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');

    xhr.send(jsonString);
}


// function getUrl() {

// }