function photographerFactory(data) {
    const { name, id, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const liens = document.createElement( 'a' );
        liens.href = './photographer.html?photographers_id=' + id;
        liens.setAttribute( 'class', 'liens');
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
        liens.appendChild(infoContextuel);
        article.appendChild(liens);
        
        return (article);
    }
    return { name, picture, getUserCardDOM }
}