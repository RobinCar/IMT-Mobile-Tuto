const DEV_FEST_IMAGES_URL = "https://devfest2018.gdgnantes.com/";
const DEV_FEST_GET_URL = "https://devfest-nantes-2018-api.cleverapps.io/blog";

fetch(DEV_FEST_GET_URL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            createCard(data[i].title, data[i].brief, DEV_FEST_IMAGES_URL + data[i].image);
            getLocalStorage();
        }
    })
    .catch(function (err) {
        console.log(err);
    });

function createCard(titre, description, image) {
    let mainContainer = document.getElementById("#data");
    let card = document.createElement("ion-card");
    card.id = titre;
    let img = document.createElement("img");
    img.src = image;
    let cardHeader = document.createElement("ion-card-header");
    let cardTitle = document.createElement("ion-card-title");
    let cardContent = document.createElement("ion-card-content");
    cardTitle.innerHTML = titre;
    cardContent.innerHTML = description;
    cardHeader.appendChild(cardTitle);
    card.appendChild(img);
    card.appendChild(cardHeader);
    card.appendChild(cardContent);
    mainContainer.appendChild(card);
}

async function takePicture() {
    const image = await capacitorExports.Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: capacitorExports.CameraResultType.base64String
    });

    presentModal(image.base64String);
}

customElements.define('modal-content', class ModalContent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <ion-header translucent>
          <ion-toolbar>
            <ion-title class=custom-header>Création d'un article privé</ion-title>
            <ion-buttons slot="end">
              <ion-icon slot="icon-only" onclick="dismissModal()" name="close"></ion-icon>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content>
            <form name="image" [formGroup]="todo">
                <ion-item>
                    <ion-label>Titre</ion-label>
                    <ion-input name="titre" required></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label>Description</ion-label>
                    <ion-input name="description"></ion-input>
                </ion-item>
                <ion-button expand="block" [disabled]="!todo.valid" onClick="newImageForm()">Enregistrer</ion-button>
            </form>
        </ion-content>
      `;
    }
});

function presentModal(image) {
    const modalElement = document.createElement('ion-modal');
    modalElement.component = 'modal-content';
    modalElement.cssClass = 'my-custom-class';
    modalElement.componentProps = {
        'image': image
    };

    // present the modal
    document.body.appendChild(modalElement);
    return modalElement.present();
}

async function dismissModal() {
    let modal = document.querySelector('ion-modal');
    await modal.dismiss({
        'dismissed': true
    });
}

async function newImageForm() {
    console.log("Creation nouvelle image");

    let form = document.forms.image;
    let titre = await form.elements.titre.value;
    let description = await form.elements.description.value;

    addToLocalStorage(titre, description, document.querySelector('ion-modal').componentProps.image).then(function () {
        getLocalStorage();
        dismissModal();
    });
}

async function addToLocalStorage(title, description, image) {
    await capacitorExports.Storage.set({
        key: title,
        value: JSON.stringify({
            'title': title,
            'brief': description,
            'image': image
        })
    });
}

async function getLocalStorage() {
    let { keys } = await capacitorExports.Storage.keys();
    for (let i = 0; i < keys.length; i++) {
        let response = await capacitorExports.Storage.get({ key: keys[i] });
        let json = JSON.parse(response.value);
        if (!document.getElementById(json.title)) {
            createCard(json.title, json.brief, "data:image/png;base64," + json.image);
        }
    }
}