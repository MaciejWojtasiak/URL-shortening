const field = document.querySelector('.field');
const submitBtn = document.querySelector('.submit');
const linkContainer = document.querySelector('.links-container')



submitBtn.addEventListener('click', sendUrl)


function sendUrl() {
    const xhr = new XMLHttpRequest();
    const url = 'https://rel.ink/api/links/'
    const inputUrl = field.value;
    const data = JSON.stringify({ "url": inputUrl });


    xhr.open('POST', url, true);

    xhr.setRequestHeader('Content-type', 'application/json');

    xhr.onload = function () {

        if (xhr.status === 201) {
            const response = JSON.parse(xhr.responseText)
            const hashId = response.hashid;
            addLink(inputUrl, hashId);
        } else {
            console.log(xhr.status);
        }
    }



    xhr.send(data);
}


function addLink(inputUrl, hashId) {
    const shortened = `https://rel.ink/api/links/${hashId}`;

    const newContainer = document.createElement('div');
    newContainer.classList.add('links-bar');
    newContainer.innerHTML = `<p class="link">${inputUrl}</p>
        <p class="shortened">${shortened}</p>
        <button class="btn copy">Copy</button>
      `;
    field.value = ' ';
    linkContainer.appendChild(newContainer);
}

