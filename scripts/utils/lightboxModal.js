function displayLightbox() {
    const lightbox = document.getElementById('lightbox');
    const main = document.getElementById('main');
    const header = document.querySelector('header');
    const closeButton = document.querySelector('.close_button');
    const floatingWindows = document.querySelector('.floating-windows');
    lightbox.style.display = 'flex';
    main.style.display = 'none';
    header.style.display = 'none';
    floatingWindows.style.display = 'none';
    lightbox.setAttribute('aria-hidden', 'false');
    main.setAttribute('aria-hidden', 'true');
    header.setAttribute('aria-hidden', 'true');
    floatingWindows.setAttribute('aria-hidden', 'true');
    closeButton.focus();

    (async () => {
        //Récupération des données des media
        async function getMedia() {
            return fetch('data/photographers.json')
                .then((responce) => responce.json())
                .then((json) => json.media);
        }

        //Récuperation des données
        const str = document.location.href;
        // const myUrl = new URL(str);
        const medias = await getMedia();
        const media = await medias.filter((json) => {
            return json.id == this.dataset.id;
        });

        //Affichage de l'images
        const mediaContainer = document.querySelector('#lightbox .media_container');
        if (media[0].video === undefined) {
            const image = document.createElement('img');
            image.setAttribute('src', 'assets/media/' + media[0].image);
            image.setAttribute('type', media[0].image);
            image.setAttribute('alt', media[0].title + ', closeup view');
            image.setAttribute('data-id', media[0].id);
            mediaContainer.appendChild(image);
        } else {
            const video = document.createElement('video');
            video.setAttribute('controls', '');
            video.setAttribute('src', 'assets/media/' + media[0].video);
            video.setAttribute('type', media[0].title);
            video.setAttribute('alt', media[0].title + ', closeup view');
            video.setAttribute('data-id', media[0].id);
            mediaContainer.appendChild(video);
        }

        //Ajout titre 
        const titre = document.createElement('h1');
        titre.textContent = media[0].title;
        mediaContainer.appendChild(titre);
    })();
}

//utilisation du clavier pour la navigation
document.addEventListener('keydown', (e) => {
    const keyCode = e.keyCode ? e.keyCode : e.which;
 
    if (keyCode === 39) {
        nextMedia();
    } else if (keyCode === 37) {
        previousMedia();
    } else if (keyCode === 27 ) {
        closeLightbox();
    }
});

//ferme la Lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const main = document.getElementById('main');
    const header = document.querySelector('header');
    const floatingWindows = document.querySelector('.floating-windows');
    const mediaContainer = document.querySelector('#lightbox .media_container');
    var media = document.querySelector('#lightbox .media_container img');
    if (media === null) {
        media = document.querySelector('#lightbox .media_container video');
    }
    const titre = document.querySelector('#lightbox .media_container h1');
    lightbox.style.display = 'none';
    main.style.display = 'block';
    header.style.display = 'flex';
    floatingWindows.style.display = 'flex';
    lightbox.setAttribute('aria-hidden', 'true');
    main.setAttribute('aria-hidden', 'false');
    header.setAttribute('aria-hidden', 'false');
    floatingWindows.setAttribute('aria-hidden', 'false');
    mediaContainer.removeChild(media);
    mediaContainer.removeChild(titre);
}

//changer de media
function nextMedia() {
    (async () => {
        var objMedia = document.querySelector('#lightbox .media_container img');
        if (objMedia === null) {
            objMedia = document.querySelector('#lightbox .media_container video');
        }

        //Récupération des données 
        async function getMedia() {
            return fetch('data/photographers.json')
                .then((responce) => responce.json())
                .then((json) => json.media);
        }
        const str = document.location.href;
        const myUrl = new URL(str);
        const medias = await getMedia();
        var photographerMedias = await medias.filter((json) => {
            return json.photographerId == myUrl.searchParams.get('photographers_id');
        });
        photographerMedias = sortDataMedia(photographerMedias);

        //récuperer l'index du média actuelle
        var indexMediaDisplay
        for (var i = 0; i < photographerMedias.length; i++) {
            if (photographerMedias[i].id == objMedia.dataset.id) {
                indexMediaDisplay = i;
            }
        }
        if (indexMediaDisplay !== (photographerMedias.length - 1)) {
            //selectionner l'image suivante et l'afficher
            const mediaContainer = document.querySelector('#lightbox .media_container');
            mediaContainer.removeChild(objMedia);
            if (photographerMedias[indexMediaDisplay + 1].video === undefined) {
                const image = document.createElement('img');
                image.setAttribute('src', 'assets/media/' + photographerMedias[indexMediaDisplay + 1].image);
                image.setAttribute('type', photographerMedias[indexMediaDisplay + 1].image);
                image.setAttribute('alt', photographerMedias[indexMediaDisplay + 1].title);
                image.setAttribute('data-id', photographerMedias[indexMediaDisplay + 1].id);
                mediaContainer.appendChild(image);
            } else {
                const video = document.createElement('video');
                video.setAttribute('controls', '');
                video.setAttribute('src', 'assets/media/' + photographerMedias[indexMediaDisplay + 1].video);
                video.setAttribute('type', photographerMedias[indexMediaDisplay + 1].title);
                video.setAttribute('alt', photographerMedias[indexMediaDisplay + 1].title + ', closeup view');
                video.setAttribute('data-id', photographerMedias[indexMediaDisplay + 1].id);
                mediaContainer.appendChild(video);
            }

            //ajout du titre
            var titre = document.querySelector('#lightbox .media_container h1');
            mediaContainer.removeChild(titre);
            titre.textContent = photographerMedias[indexMediaDisplay + 1].title;
            mediaContainer.appendChild(titre);
        }
    })();
}

function previousMedia() {
    (async () => {
        var objMedia = document.querySelector('#lightbox .media_container img');
        if (objMedia === null) {
            objMedia = document.querySelector('#lightbox .media_container video');
        }

        //Récupération des données 
        async function getMedia() {
            return fetch('data/photographers.json')
                .then((responce) => responce.json())
                .then((json) => json.media);
        }
        const str = document.location.href;
        const myUrl = new URL(str);
        const medias = await getMedia();
        var photographerMedias = await medias.filter((json) => {
            return json.photographerId == myUrl.searchParams.get('photographers_id');
        });
        photographerMedias = sortDataMedia(photographerMedias);

        //récuperer l'index du média actuelle
        var indexMediaDisplay
        for (var i = 0; i < photographerMedias.length; i++) {
            if (photographerMedias[i].id == objMedia.dataset.id) {
                indexMediaDisplay = i;
            }
        }

        if (indexMediaDisplay !== 0) {

            //selectionner l'image suivante et l'afficher
            const mediaContainer = document.querySelector('#lightbox .media_container');
            mediaContainer.removeChild(objMedia);
            if (photographerMedias[indexMediaDisplay - 1].video === undefined) {
                const image = document.createElement('img');
                image.setAttribute('src', 'assets/media/' + photographerMedias[indexMediaDisplay - 1].image);
                image.setAttribute('type', photographerMedias[indexMediaDisplay - 1].image);
                image.setAttribute('alt', photographerMedias[indexMediaDisplay - 1].title + ', closeup view');
                image.setAttribute('data-id', photographerMedias[indexMediaDisplay - 1].id);
                mediaContainer.appendChild(image);
            } else {
                const video = document.createElement('video');
                video.setAttribute('controls', '');
                video.setAttribute('src', 'assets/media/' + photographerMedias[indexMediaDisplay - 1].video);
                video.setAttribute('type', photographerMedias[indexMediaDisplay - 1].title);
                video.setAttribute('alt', photographerMedias[indexMediaDisplay - 1].title + ', closeup view');
                video.setAttribute('data-id', photographerMedias[indexMediaDisplay - 1].id);
                mediaContainer.appendChild(video);
            }

            //ajout du titre
            var titre = document.querySelector('#lightbox .media_container h1');
            mediaContainer.removeChild(titre);
            titre.textContent = photographerMedias[indexMediaDisplay - 1].title;
            mediaContainer.appendChild(titre);
        }
    })();
}