//Mettre le code JavaScript lié à la page photographer.html
(async () => {
    async function getPhotographers() {
        // Penser à remplacer par les données récupérées dans le json
        // et bien retourner le tableau photographers seulement une fois
        return fetch("../../data/photographers.json")
            .then(responce => responce.json())
            .then(json => json.photographers);
    }

    const str = document.location.href;
    const myUrl = new URL(str);
    const photographer = await getPhotographers();
    const values = await photographer.filter((json) => { return json.id == myUrl.searchParams.get("photographers_id")} );
    console.log(values);
})();