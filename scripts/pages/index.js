
    //
    async function getPhotographers() {
        return fetch("../../data/photographers.json")
        .then(responce => responce.json())
        .then(json => json.photographers);
    }

    //
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    // Afficher les données de photographes 
    async function init() {
        const photographers = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    