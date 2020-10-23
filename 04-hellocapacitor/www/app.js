let imageUrl = null;

async function takePicture() {
    const image = await capacitorExports.Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: capacitorExports.CameraResultType.Uri
    });
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    imageUrl = image.base64String;

    presentModal(image.base64String);
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
        <ion-content fullscreen>
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

async function newImageForm() {
    console.log("Creation nouvelle image");

    let form = document.forms.image;
    let mainContainer = document.getElementById("#data");

    let card = document.createElement("ion-card");
    let img = document.createElement("img");
    img.src = document.querySelector('ion-modal').componentProps.image;
    let cardHeader = document.createElement("ion-card-header");
    let cardTitle = document.createElement("ion-card-title");
    let cardContent = document.createElement("ion-card-content");
    cardTitle.innerHTML = await form.elements.titre.value;
    cardContent.innerHTML = await form.elements.description.value;
    cardHeader.appendChild(cardTitle);
    card.appendChild(img);
    card.appendChild(cardHeader);
    card.appendChild(cardContent);
    mainContainer.appendChild(card);

    dismissModal();
}

/**
 * presentModal displays the modal
 * 
 * @param {string} image
 */
function presentModal(image) {
    // create the modal with the `modal-page` component
    const modalElement = document.createElement('ion-modal');
    modalElement.component = 'modal-page';
    modalElement.cssClass = 'my-custom-class';
    modalElement.componentProps = {
        'image': image
    };

    // present the modal
    document.body.appendChild(modalElement);
    return modalElement.present();
}

/**
 * dismissModal closes the modal
 * 
 */
async function dismissModal() {
    let modal = document.querySelector('ion-modal');
    await modal.dismiss({
        'dismissed': true
    });
}