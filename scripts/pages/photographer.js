//Mettre le code JavaScript lié à la page photographer.html
(async () => {

    //Récupération des données des photographes
    async function getPhotographers() {
        return fetch("../../data/photographers.json")
            .then(responce => responce.json())
            .then(json => json.photographers);
    }

    //Récupération des données des media
    async function getMedia() {
        return fetch("../../data/photographers.json")
            .then(responce => responce.json())
            .then(json => json.media);
    }

    // Récupération des données 
    const str = document.location.href;
    const myUrl = new URL(str);
    const photographers = await getPhotographers();
    const medias = await getMedia();
    const photographer = await photographers.filter((json) => { return json.id == myUrl.searchParams.get("photographers_id") });
    var photographerMedias = await medias.filter((json) => { return json.photographerId == myUrl.searchParams.get("photographers_id") });

    // Afficher select personnaliser
    const select = document.querySelector(".select");
    const staticSelect = document.querySelector(".static-select select");
    const customSelect = await displayCustomSelect(staticSelect);
    select.appendChild(customSelect);

    //Ajouter les bonne données au flottant 
    const nbLike = document.querySelector(".like-counter");
    const price = document.querySelector(".price");
    nbLike.textContent = calculLikes(photographerMedias);
    price.textContent = photographer[0].price;

    //modification modal de contact 
    const modalTitle = document.querySelector('#modal_title');
    modalTitle.textContent = modalTitle.textContent + " " + photographer[0].name;


    displayDataPhotograph(photographer);
    displayDataMedia(photographerMedias);
})();


// Creation de la card de présentation du photographe
async function displayDataPhotograph(photographer) {
    const photographHeader = document.querySelector(".photograph-header");
    const photographerModel = photographerFactory(photographer[0]);
    const userCardDOM = photographerModel.getUserInfoDOM();
    photographHeader.appendChild(userCardDOM);
};

// Creation des card clickable des photos
async function displayDataMedia(medias) {
    const photographersCreation = document.querySelector(".photograph-creation");

    medias = sortDataMedia(medias);

    var child = photographersCreation.lastElementChild; 
    while (child) {
        photographersCreation.removeChild(child);
        child = photographersCreation.lastElementChild;
    } 

    medias.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        photographersCreation.appendChild(mediaCardDOM);
    });
};

// Trie des données en fonction du select
function sortDataMedia(medias){
    const staticSelect = document.querySelector(".static-select select");

    switch(staticSelect.value) {
        case "0" : medias.sort(mediaSortByLikes);
        break;
        case "1" : medias.sort(mediaSortByDate);
        break;
        case "2" : medias.sort(mediaSortByTitre);
        break;
    }

    return medias;
}

// Creer le custom select 
function displayCustomSelect(select) {
    const div = document.createElement("div");
    div.setAttribute("class", "custom-select");
    const button = document.createElement("button");
    button.setAttribute("onclick", "clickButtonSelect()");
    button.setAttribute("role", "button");
    button.setAttribute("aria-haspopup", "listbox");
    button.setAttribute("aria-expanded", "");
    button.textContent = select.options[select.selectedIndex].text;
    const i = document.createElement("i");
    i.setAttribute("class", "fa-solid fa-chevron-down");
    const otherOptions = document.createElement("div");
    otherOptions.setAttribute("class", "other-options hide");
    const bar = document.createElement('div');
    bar.setAttribute("class", "bar hide");
    for (let i = 0; i < select.options.length; i++) {
        if (i != select.selectedIndex) {
            const option = document.createElement("button");
            option.textContent = select.options[i].text;
            option.addEventListener("click", clickOtherOption);
            option.setAttribute("value", select.options[i].value);
            option.setAttribute("role", "listbox");
            option.setAttribute("aria-activedescendant", select.options[i].textContent);
            option.setAttribute("aria-selected", select.options[i].textContent);
            option.setAttribute("aria-labelledby", select.options[i].textContent);
            otherOptions.appendChild(option);
            if(i !== select.options.length - 1) {
                const bar = document.createElement('div');
                bar.setAttribute("class", "bar");
                otherOptions.appendChild(bar);
            }
        }
    }
    button.appendChild(i);
    div.appendChild(button);
    div.appendChild(bar);
    div.appendChild(otherOptions);
    return div;
}

// Trier les media par Popularité
function mediaSortByLikes(a, b) {
    return b.likes - a.likes;
}

// Trier les media par Date 
function mediaSortByDate(a, b) {
    return new Date(b.date) - new Date(a.date);
}

// Trier les media par Titre
function mediaSortByTitre(a, b) {
    if (a.title < b.title) {
        return -1;
      } else {
        return 1;
      };
}

// Calcule du Nombre de like cumulé
function calculLikes(medias) {
    let likes = 0;
    medias.forEach((media) => {
        likes = likes + media.likes
    });
    return likes;
}