//Quand un like est clickés
function clickLikes() {
    const compteur = document.querySelector('.floating-windows .like-counter');
    const nbLikes = this.parentNode
    switch (this.getAttribute('class')){
        case 'fa-regular fa-heart' :
            this.setAttribute('class', 'fa-solid fa-heart');
            compteur.textContent = (parseInt(compteur.textContent) + 1);
            nbLikes.textContent = parseInt(nbLikes.textContent) + 1;
            nbLikes.appendChild(this);
            break;
        case 'fa-solid fa-heart' :
            this.setAttribute('class', 'fa-regular fa-heart');
            compteur.textContent = parseInt(compteur.textContent) - 1;
            nbLikes.textContent = parseInt(nbLikes.textContent) - 1;
            nbLikes.appendChild(this);
            break;
    }
}