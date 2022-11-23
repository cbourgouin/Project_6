function displayLightbox() {
    const lightbox = document.getElementById("lightbox");
    const main = document.getElementById("main");
    const header = document.querySelector("header");
    const closeButton = document.querySelector(".close_button");
    lightbox.style.display = "flex";
    main.style.display = "none";
    header.style.display = "none";
    lightbox.setAttribute("aria-hidden", "false");
    main.setAttribute("aria-hidden", "true");
    header.setAttribute("aria-hidden", "true");
    closeButton.focus();
}