//afficher ou masquer le menu déroulant 
function clickButtonSelect() {
    const otherOptions = document.querySelector(".other-options");
    const button = document.querySelector(".custom-select button");
    const bar = document.querySelector(".bar");
    if (otherOptions.getAttribute("class") === "other-options hide") {
        otherOptions.setAttribute("class", "other-options");
        button.setAttribute("class", "deploy-select");
        bar.setAttribute("class", "bar");
    } else if (otherOptions.getAttribute("class") === "other-options") {
        otherOptions.setAttribute("class", "other-options hide");
        button.removeAttribute("class");
        bar.setAttribute("class", "bar hide");
    }
}

function clickOtherOption() {
    const staticSelect = document.querySelector(".static-select select");
    const customSelect = document.querySelector(".custom-select");
    const select = document.querySelector(".select");
    staticSelect.selectedIndex = this.value;
    const newCustomSelect = displayCustomSelect(staticSelect);
    select.replaceChild(newCustomSelect, customSelect);

    (async () => {

        //Récupération des données des media
        async function getMedia() {
            return fetch("../../data/photographers.json")
                .then(responce => responce.json())
                .then(json => json.media);
        }
    
        // Récupération des données 
        const str = document.location.href;
        const myUrl = new URL(str);
        const medias = await getMedia();
        var photographerMedias = await medias.filter((json) => { return json.photographerId == myUrl.searchParams.get("photographers_id") });
        displayDataMedia(photographerMedias);
    })();
}