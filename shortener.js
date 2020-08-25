const field = document.querySelector('.field');
const submitBtn = document.querySelector('.submit');




submitBtn.addEventListener('click', sendUrl)


function sendUrl() {
    let url = field.value + "";

    const jsonString = JSON.stringify({ "url": url });

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://rel.ink/api/links/', true);

    xhr.onload = function () {
        console.log(JSON.parse(this.response));
    }

    xhr.setRequestHeader('content-Type', 'application/json');


    xhr.send(jsonString);
}