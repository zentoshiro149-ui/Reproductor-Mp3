const songs = [
    { name: "Smooth Criminal", src: "musicas/Michael Jackson - Smooth Criminal (Official Video)(MP3_320K).mp3" },
    { name: "Influencia en el Más Allá", src: "musicas/La Princesa Y El Sapo - Influencia En El Más Allá (Latino) (Letra)(MP3_320K).mp3" },
    { name: "Bohemian Rhapsody", src: "musicas/Queen – Bohemian Rhapsody (Official Video Remastered)(MP3_320K).mp3" },
    { name: "Atrévete-Te-Te", src: "musicas/Atrévete-Te-Te(MP3_320K).mp3" },
    { name: "Bling Bang Bang Born", src: "musicas/Bling-Bang-Bang-Born (Official Music Video)(MP3_320K).mp3" },
    { name: "El Sake de Binks", src: "musicas/El Sake De Binks Español Latino Lyrics _anime _manga _onepiece _binkssake _elsakedebinks _cancion(MP3_320K).mp3" },
    { name: "Super Mario Bros Theme", src: "musicas/Super Mario Bros. Theme Song(MP3_320K).mp3" },
    { name: "Amplify", src: "musicas/amplify.mp3" },
    { name: "Yodel Vacas Vaqueras", src: "musicas/Jaime López - Yodel-Adle-Eedle-Idle-Oo __ Vacas Vaqueras __ Video _ Letra(MP3_320K).mp3" },
    { name: "Tuca Donka", src: "musicas/TUCA DONKA(MP3_320K).mp3" },
    { name: "One Piece Gear 5", src: "musicas/One Piece _ Drums of Liberation x Overtaken (GEAR 5 Theme) - TU Symphony Orchestra(MP3_320K).mp3" },
    { name: "Rosa Pastel", src: "musicas/Belanova _ Rosa Pastel [Letra](MP3_320K).mp3" },
    { name: "Thriller", src: "musicas/Michael Jackson - Thriller (Official Video - Shortened Version)(MP3_320K).mp3" },
    { name: "Gambling Opening", src: "musicas/gamble.mp3" },
    { name: "Zom 100 Opening", src: "musicas/zom100.mp3" },
    { name: "Dark Aria", src: "musicas/Solo Leveling EP 6 OST FULL _DARK ARIA ＜LV2＞_ by SawanoHiroyuki[nZk]_XAI (Lyrics)(MP3_320K).mp3" },
    { name: "Judas", src: "musicas/Lady Gaga - Judas (Lyrics)(MP3_320K).mp3" },
    { name: "Himno Nacional", src: "musicas/song1.mp3" },
    { name: "¿Cuán Malo Puedo Ser?", src: "musicas/lorax.mp3" },
    { name: "YOASOBI - Idol", src: "musicas/idol.mp3" }
];

let currentSong = 0;
let isRepeat = false;
let isShuffle = false;
let isDragging = false;

const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");

const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const repeatBtn = document.getElementById("repeatBtn");
const shuffleBtn = document.getElementById("shuffleBtn");

function loadSong(index) {
    audio.src = songs[index].src;
}

loadSong(currentSong);

function togglePlay() {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸";
    } else {
        audio.pause();
        playBtn.textContent = "▶️";
    }
}

function nextSong() {
    if (isShuffle) {
        currentSong = Math.floor(Math.random() * songs.length);
    } else {
        currentSong = (currentSong + 1) % songs.length;
    }
    loadSong(currentSong);
    audio.play();
}

function prevSong() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    audio.play();
}

function formatTime(time) {
    if (isNaN(time)) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

audio.addEventListener("loadedmetadata", () => {
    durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    if (!isDragging) {
        progress.value = (audio.currentTime / audio.duration) * 100;
    }
    currentTimeEl.textContent = formatTime(audio.currentTime);
});

progress.addEventListener("input", () => {
    isDragging = true;
    const newTime = (progress.value / 100) * audio.duration;
    currentTimeEl.textContent = formatTime(newTime);
});

progress.addEventListener("change", () => {
    const newTime = (progress.value / 100) * audio.duration;
    audio.currentTime = newTime;
    isDragging = false;
});

volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

function toggleRepeat() {
    isRepeat = !isRepeat;
    if (isRepeat) isShuffle = false;
    repeatBtn.classList.toggle("active", isRepeat);
    shuffleBtn.classList.remove("active");
}

function toggleShuffle() {
    isShuffle = !isShuffle;
    if (isShuffle) isRepeat = false;
    shuffleBtn.classList.toggle("active", isShuffle);
    repeatBtn.classList.remove("active");
}

audio.addEventListener("ended", () => {
    if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
    } else {
        nextSong();
    }
});

songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = song.name;
    li.onclick = () => {
        currentSong = index;
        loadSong(index);
        audio.play();
    };
    playlist.appendChild(li);
});
