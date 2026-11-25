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

const albumPlayers = [...document.querySelectorAll("[data-album-player]")];
const musicPlayerPage = document.querySelector(".music-player-page");

const formatTime = (seconds) => {
    if (!Number.isFinite(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainder = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${remainder}`;
};

albumPlayers.forEach((player) => {
    const title = player.dataset.title || "앨범";
    const audio = player.querySelector("[data-album-audio]");
    const toggles = player.querySelectorAll("[data-album-toggle]");
    const progress = player.querySelector("[data-album-progress]");
    const currentTime = player.querySelector("[data-current-time]");
    const duration = player.querySelector("[data-duration]");
    const playButton = player.querySelector(".album-play-button");

    const updateState = (isPlaying) => {
        player.classList.toggle("is-playing", isPlaying);
        musicPlayerPage?.classList.toggle("is-album-playing", albumPlayers.some((album) => album.classList.contains("is-playing")));
        toggles.forEach((toggle) => {
            toggle.setAttribute("aria-pressed", String(isPlaying));
            toggle.setAttribute("aria-label", isPlaying ? `${title} 일시정지` : `${title} 재생`);
        });
        if (playButton) {
            playButton.innerHTML = isPlaying
                ? '<i class="fa-solid fa-pause" aria-hidden="true"></i><span>일시정지</span>'
                : '<i class="fa-solid fa-play" aria-hidden="true"></i><span>재생</span>';
        }
    };

    const pauseOtherAlbums = () => {
        albumPlayers.forEach((otherPlayer) => {
            if (otherPlayer === player) return;
            const otherAudio = otherPlayer.querySelector("[data-album-audio]");
            if (otherAudio && !otherAudio.paused) otherAudio.pause();
        });
    };

    const togglePlayback = () => {
        if (audio.paused) {
            pauseOtherAlbums();
            audio.play().catch(() => updateState(false));
        } else {
            audio.pause();
        }
    };

    toggles.forEach((toggle) => toggle.addEventListener("click", togglePlayback));

    audio.addEventListener("play", () => {
        pauseOtherAlbums();
        updateState(true);
    });
    audio.addEventListener("pause", () => updateState(false));
    audio.addEventListener("ended", () => updateState(false));
    audio.addEventListener("loadedmetadata", () => {
        progress.max = String(audio.duration || 0);
        duration.textContent = formatTime(audio.duration);
    });
    audio.addEventListener("timeupdate", () => {
        progress.value = String(audio.currentTime);
        currentTime.textContent = formatTime(audio.currentTime);
    });
    progress.addEventListener("input", () => {
        audio.currentTime = Number(progress.value);
    });
});
