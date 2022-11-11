function mediaFactory(data) {
    const { id, photographerId, title, image, video, likes, date, price} = data;
    let media;
    if(video==undefined)
        media = `assets/media/${image}`;
    else
        media = `assets/media/${video}`;

    // Creation des card des créations du photographes
    function getMediaCardDOM() {
        const article = document.createElement( 'article' );
        const format = media.substring(media.lastIndexOf('.') + 1, media.length);
        console.log(format);
        if(video==undefined) {
            const img = document.createElement( 'img' );
            img.setAttribute("class", "media");
            img.setAttribute("src", media);
            img.setAttribute("type", title);
            article.appendChild( img );
        }
        else{
            const vid = document.createElement( 'video' );
            vid.setAttribute("controls", "");
            vid.setAttribute("class", "media");
            const source = document.createElement( 'source' );
            source.setAttribute("src", media);
            source.setAttribute("type", "video/" + media.substring(media.lastIndexOf('.') + 1, media.length));
            vid.appendChild(source);
            article.appendChild( vid );
        }
        
        const div = document.createElement( 'div' );
        const picTitle = document.createElement( 'a' );
        picTitle.textContent = title;
        const picLike = document.createElement( 'a' );
        picLike.textContent = likes;
        const hearth = document.createElement( 'i' );
        hearth.setAttribute("class", "fa-solid fa-heart");
        picLike.appendChild(hearth);
        div.appendChild(picTitle);
        div.appendChild(picLike);
        article.appendChild( div );

        return article;
    }

    return { media, getMediaCardDOM }
}