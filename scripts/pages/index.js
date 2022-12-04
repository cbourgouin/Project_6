
    //Récupération des données des photographes
    async function getPhotographers() {
        return fetch('data/photographers.json')
        .then(responce => responce.json())
        .then(json => json.photographers);
    }

    // Creation des card clickable des photographes 
    async function displayData(photographers) {
        const photographersSection = document.querySelector('.photographer_section');

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    // Affichages des données de photographes 
    async function init() {
        const photographers = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    