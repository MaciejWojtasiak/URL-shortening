const field = document.querySelector('.field');
const submitBtn = document.querySelector('.submit');
const linkContainer = document.querySelector('.links-container');
const errorMessage = document.getElementById('error');
const popUpCloseBtn = document.querySelector('.closeBtn');


function sendUrl() {

    const xhr = new XMLHttpRequest();
    const url = 'https://rel.ink/api/links/'
    const inputUrl = field.value;
    const data = JSON.stringify({ "url": inputUrl });

    if (checkAdress(inputUrl) != true) {
        field.classList.add('error');
        errorMessage.style.display = 'block';
        return;
    }
    field.classList.remove('error');
    errorMessage.style.display = 'none';

    xhr.open('POST', url, true);

    xhr.setRequestHeader('Content-type', 'application/json');

    xhr.onload = function () {

        if (xhr.status === 201) {
            const response = JSON.parse(xhr.responseText)
            const hashId = response.hashid;
            addLink(inputUrl, hashId);
            showToast();
        }
    }

    xhr.send(data);
}

function addLink(inputUrl, hashId) {
    const shortened = `https://rel.ink/${hashId}`;

    const newContainer = document.createElement('div');
    newContainer.classList.add('links-bar');
    newContainer.innerHTML =
        `<div class="link-left">
        <p class="link">${inputUrl}</p>
        </div>
        <div class="link-right">
        <p class="shortened">${shortened}</p>
        <button id="copyBtn" class="btn copy">Copy</button>
     </div> 
      `;
    field.value = ' ';
    linkContainer.appendChild(newContainer);
}

function checkAdress(url) {
    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);

    return url.match(regex) ? true : false;
}


function copyLink(event) {
    if (event.target.id != 'copyBtn') return;

    let button = event.target;
    let text = button.parentNode.querySelector('.shortened').innerText;

    const textarea = document.createElement('textarea');
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    button.classList.toggle('copied');
    button.innerHTML = 'Copied!';
    setTimeout(() => {
        button.classList.toggle('copied');
        button.innerHTML = 'Copy';
    }, 600)
}


function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.toggle('show');
    setTimeout(() => {
        toast.classList.toggle('show');
    }, 1000)
}

submitBtn.addEventListener('click', sendUrl);
document.addEventListener('click', copyLink);
popUpCloseBtn.addEventListener('click', () => {
    document.querySelector('.popUp').remove();
})