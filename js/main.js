const menuBtn = document.getElementById("btn-menu");
const sideMenu = document.getElementById("side-menu");

if (menuBtn && sideMenu) {
    menuBtn.addEventListener("click", () => {
        sideMenu.classList.toggle("open");
    });

    sideMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => sideMenu.classList.remove("open"));
    });
}

const heroVideo = document.querySelector(".hero-video");
const soundButton = document.getElementById("hero-sound");
const heroBackground = document.querySelector(".hero-background");
const videoButton = document.getElementById("show-video");
const imageButton = document.getElementById("show-image");

if (heroVideo && soundButton) {
    soundButton.addEventListener("click", () => {
        heroVideo.muted = !heroVideo.muted;
        const isMuted = heroVideo.muted;
        soundButton.setAttribute("aria-pressed", String(!isMuted));
        soundButton.setAttribute("aria-label", isMuted ? "영상 소리 켜기" : "영상 소리 끄기");
        soundButton.innerHTML = isMuted
            ? '<i class="fa-solid fa-volume-xmark" aria-hidden="true"></i><span>Sound off</span>'
            : '<i class="fa-solid fa-volume-high" aria-hidden="true"></i><span>Sound on</span>';
    });
}

if (heroVideo && heroBackground && videoButton && imageButton) {
    const setVisualMode = (mode) => {
        const isStill = mode === "image";
        heroBackground.classList.toggle("show-still", isStill);
        videoButton.classList.toggle("is-active", !isStill);
        imageButton.classList.toggle("is-active", isStill);
        videoButton.setAttribute("aria-pressed", String(!isStill));
        imageButton.setAttribute("aria-pressed", String(isStill));

        if (isStill) {
            heroVideo.pause();
        } else {
            heroVideo.play().catch(() => {});
        }
    };

    videoButton.addEventListener("click", () => setVisualMode("video"));
    imageButton.addEventListener("click", () => setVisualMode("image"));
}
