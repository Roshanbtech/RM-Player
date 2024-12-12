const allMusic = [
    {
        name: "Song One",
        artist: "Artist One",
        src: "song1",
        img: "song1",
    },
    {
        name: "Song Two",
        artist: "Artist Two",
        src: "song2",
        img: "song2",
    },
    {
        name: "Song Three",
        artist: "Artist Three",
        src: "song3",
        img: "song3",
    }
];

// Function to change the theme (your existing code)
function changeTheme() {
    const themes = ["neon-blue", "neon-violet", "neon-green", "neon-pink", "neon-red"];
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    wrapper.classList.add(randomTheme);
    setTimeout(() => {
        wrapper.classList.remove(...themes);
        wrapper.classList.add(randomTheme);
    }, 500);
}

const wrapper = document.querySelector(".wrapper");
const musicImg = wrapper.querySelector("img");
const musicName = wrapper.querySelector(".name");
const musicArtist = wrapper.querySelector(".artist");
const playPauseBtn = wrapper.querySelector(".play-pause");
const prevBtn = wrapper.querySelector("#prev");
const nextBtn = wrapper.querySelector("#next");
const mainAudio = wrapper.querySelector("#main-audio");
const progressArea = wrapper.querySelector(".progress-area");
const progressBar = wrapper.querySelector(".progress-bar");

let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
let isMusicPaused = true;

// Load music details
window.addEventListener("load", () => {
    loadMusic(musicIndex);
});

function loadMusic(indexNumb) {
    const song = allMusic[indexNumb - 1];
    musicName.innerText = song.name;
    musicArtist.innerText = song.artist;
    musicImg.src = `assets/images/${song.img}.png`; // Corrected extension here
    mainAudio.src = `assets/audios/${song.src}.mp3`;
}

function playMusic() {
    wrapper.classList.add("paused", "playing");
    musicImg.classList.add("pulse");
    playPauseBtn.innerHTML = `<i class="fi fi-sr-pause"></i>`;
    mainAudio.play();
    changeTheme();
}

function pauseMusic() {
    wrapper.classList.remove("paused", "playing");
    musicImg.classList.remove("pulse");
    playPauseBtn.innerHTML = `<i class="fi fi-sr-play"></i>`;
    mainAudio.pause();
}

function prevMusic() {
    musicIndex--;
    musicIndex < 1 ? (musicIndex = allMusic.length) : musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

function nextMusic() {
    musicIndex++;
    musicIndex > allMusic.length ? (musicIndex = 1) : musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

playPauseBtn.addEventListener("click", () => {
    const isMusicPaused = wrapper.classList.contains("paused");
    isMusicPaused ? pauseMusic() : playMusic();
});

prevBtn.addEventListener("click", prevMusic);
nextBtn.addEventListener("click", nextMusic);

mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    const musicCurrentTime = wrapper.querySelector(".current-time");
    const musicDuration = wrapper.querySelector(".max-duration");

    mainAudio.addEventListener("loadeddata", () => {
        musicDuration.innerText = formatTime(mainAudio.duration);
    });

    musicCurrentTime.innerText = formatTime(currentTime);
});

progressArea.addEventListener("click", (e) => {
    const progressWidth = progressArea.clientWidth;
    const clickedOffsetX = e.offsetX;
    const songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playMusic();
});

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
