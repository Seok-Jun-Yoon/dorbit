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
