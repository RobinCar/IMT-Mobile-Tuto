function addPhotoToGallery() {
    console.log("Ajout photo gallerie");
}

const DEV_FEST_IMAGES_URL = "https://devfest2018.gdgnantes.com/";
const DEV_FEST_GET_URL = "https://devfest-nantes-2018-api.cleverapps.io/blog";

fetch(DEV_FEST_GET_URL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        appendData(data);
    })
    .catch(function (err) {
        console.log(err);
    })


function appendData(json) {
    let mainContainer = document.getElementById("#data");
    for (let i = 0; i < json.length; i++) {
        let card = document.createElement("ion-card");
        let img = document.createElement("img");
        img.src = DEV_FEST_IMAGES_URL + json[i].image;
        let cardHeader = document.createElement("ion-card-header");
        let cardTitle = document.createElement("ion-card-title");
        let cardContent = document.createElement("ion-card-content");
        cardTitle.innerHTML = json[i].title;
        cardContent.innerHTML = json[i].brief;
        cardHeader.appendChild(cardTitle);
        card.appendChild(img);
        card.appendChild(cardHeader);
        card.appendChild(cardContent);
        mainContainer.appendChild(card);
    }
}

(function () {
    'use strict';
    if (!('serviceWorker' in navigator)) {
        console.log('Service worker non supporté');
        return;
    }

    navigator.serviceWorker.register('/sw.js')
        .then(() => {
            console.log('Enregistrement OK');
        })
        .catch(error => {
            console.log('Enregistrement KO :', error);
        });

})();