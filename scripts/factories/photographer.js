function photographerFactory(data) {
    const { name, id, portrait, city, country, tagline, price} = data;

    const picture = `assets/photographers/${portrait}`;

    // Creation des card de photographes
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const liens = document.createElement( 'a' );
        liens.href = '/photographer.html?photographers_id=' + id;
        liens.setAttribute( 'class', 'liens');
        liens.setAttribute( 'aria-label', name);
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const localisation = document.createElement( 'a' );
        localisation.textContent = city + ', ' + country;
        localisation.setAttribute("class", "localisation");
        const expression = document.createElement( 'a' );
        expression.textContent = tagline;
        expression.setAttribute("class", "expression");
        const prix = document.createElement( 'a' );
        prix.textContent = price + '€/jour';
        prix.setAttribute("class", "prix");
        const infoContextuel = document.createElement( 'div' );
        infoContextuel.setAttribute("class", "infoContextuel");
        infoContextuel.appendChild(localisation);
        infoContextuel.appendChild(expression);
        infoContextuel.appendChild(prix);
        liens.appendChild(img);
        liens.appendChild(h2);
        article.appendChild(liens);
        article.appendChild(infoContextuel);
        return (article);
    }

    function getUserInfoDOM() {
        const div = document.createElement('div');
        const info = document.createElement('div');
        const divButton = document.createElement('div');
        const divImg = document.createElement('div');
        const button = document.createElement( 'button' );
        button.setAttribute("class", "contact_button");
        button.setAttribute("onclick", "displayModal()");
        button.setAttribute("aria-label", "Contact Me");
        button.textContent = "Contactez-moi";
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        const h1 = document.createElement( 'h1' );
        h1.textContent = name;
        const localisation = document.createElement( 'a' );
        localisation.textContent = city + ', ' + country;
        localisation.setAttribute("class", "localisation");
        const expression = document.createElement( 'a' );
        expression.textContent = tagline;
        expression.setAttribute("class", "expression");
        info.appendChild(h1);
        info.appendChild(localisation);
        info.appendChild(expression);
        divButton.appendChild(button);
        divImg.appendChild(img);
        div.appendChild(info);
        div.appendChild(divButton);
        div.appendChild(divImg);
        return (div);
    }

    return { name, picture, getUserCardDOM, getUserInfoDOM}
}

