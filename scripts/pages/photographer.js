//Mettre le code JavaScript lié à la page photographer.html
(async () => {

    async function getPhotographers() {
        return fetch("../../data/photographers.json")
            .then(responce => responce.json())
            .then(json => json.photographers);
    }

    async function displayData(photographer) {
        const photographHeader = document.querySelector(".photograph-header");
        const photographerModel = photographerFactory(photographer[0]);
        const userCardDOM = photographerModel.getUserInfoDOM();
        photographHeader.appendChild(userCardDOM);
    };

    const str = document.location.href;
    const myUrl = new URL(str);
    const photographer = await getPhotographers();
    const values = await photographer.filter((json) => { return json.id == myUrl.searchParams.get("photographers_id")});
    displayData(values);
    console.log(values);
})();