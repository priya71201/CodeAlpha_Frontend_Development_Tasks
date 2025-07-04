const songs = [
  {
    title: "Skyline",
    artist: "Dreamwalker",
    src: "music/song1.mp3",
    cover: "images/song1.jpg"
  },
  {
    title: "Reflections",
    artist: "Aether",
    src: "music/song2.mp3",
    cover: "images/song2.jpg"
  },
  {
    title: "Ocean Drive",
    artist: "Chillout Beats",
    src: "music/song3.mp3",
    cover: "images/song3.jpg"
  }
];

let index = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

const audio = document.getElementById('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const playBtn = document.getElementById('playBtn');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const volume = document.getElementById('volume');
const playlist = document.getElementById('playlist');

function loadSong(i) {
  const song = songs[i];
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.src;
  highlightPlaylist();
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    isPlaying = true;
    playBtn.textContent = "⏸️";
  } else {
    audio.pause();
    isPlaying = false;
    playBtn.textContent = "▶️";
  }
}

function nextSong() {
  index = isShuffle ? Math.floor(Math.random() * songs.length) : (index + 1) % songs.length;
  loadSong(index);
  audio.play();
  playBtn.textContent = "⏸️";
}

function prevSong() {
  index = (index - 1 + songs.length) % songs.length;
  loadSong(index);
  audio.play();
  playBtn.textContent = "⏸️";
}

function updateProgress() {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${percent}%`;
  currentTimeEl.textContent = format(audio.currentTime);
  durationEl.textContent = format(audio.duration);
}

function setProgress(e) {
  const width = e.currentTarget.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
}

function setVolume(val) {
  audio.volume = val;
}

function toggleShuffle() {
  isShuffle = !isShuffle;
  document.getElementById("shuffleBtn").style.color = isShuffle ? "lime" : "white";
}

function toggleRepeat() {
  isRepeat = !isRepeat;
  document.getElementById("repeatBtn").style.color = isRepeat ? "lime" : "white";
}

function format(time) {
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', () => {
  isRepeat ? audio.play() : nextSong();
});

// Playlist UI
songs.forEach((song, i) => {
  const div = document.createElement('div');
  div.textContent = `${song.title} - ${song.artist}`;
  div.onclick = () => {
    index = i;
    loadSong(index);
    audio.play();
    playBtn.textContent = "⏸️";
  };
  playlist.appendChild(div);
});

function highlightPlaylist() {
  const items = playlist.querySelectorAll('div');
  items.forEach((item, i) => {
    item.className = i === index ? 'active' : '';
  });
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') togglePlay();
  if (e.key === 'ArrowRight') nextSong();
  if (e.key === 'ArrowLeft') prevSong();
});

volume.value = 0.7;
setVolume(0.7);
loadSong(index);
