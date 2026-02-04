/* =====================
  HAMBURGER MENU
===================== */
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("header-menu");
const closeBtn = document.getElementById("menu-close");

hamburger.addEventListener("click", () => {
  menu.classList.add("open");
  document.body.style.overflow = "hidden";
});

closeBtn.addEventListener("click", closeMenu);

menu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", closeMenu);
});

function closeMenu() {
  menu.classList.remove("open");
  document.body.style.overflow = "";
}



/* =====================
  SWIPER
===================== */
document.addEventListener("DOMContentLoaded", () => {

  new Swiper(".discography-swiper", {
    loop: true,
    slidesPerView: "auto",
    spaceBetween: 40,
    centeredSlides: true,
    speed: 800,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });

  new Swiper(".album-swiper", {
    loop: true,
    slidesPerView: "auto",
    spaceBetween: 60,
    centeredSlides: true,
    speed: 800,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });

});


// =====================
// MUSIC
// =====================

const audio = new Audio();

// ===== DOM =====
const tracks = [...document.querySelectorAll(".music-list li")];
const nowPlaying = document.getElementById("now-playing");

const playBtn = document.getElementById("play-toggle");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const shuffleMain = document.getElementById("shuffle-main");
const repeatMain  = document.getElementById("repeat-main");

const shuffleHeader = document.getElementById("shuffle-header");
const repeatHeader  = document.getElementById("repeat-header");

const seekBar = document.getElementById("seek-bar");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

const headerPlay = document.getElementById("header-play");
const headerNext = document.getElementById("header-next");
const headerPrev = document.getElementById("header-prev");

// ===== STATE =====
let currentIndex = -1;
let isShuffle = false;
let isRepeat = false;

let shuffleList = [];
let shuffleIndex = 0;

// =====================
// 再生
// =====================
function playTrack(index) {
  tracks.forEach(li => li.classList.remove("playing"));

  currentIndex = index;
  audio.src = tracks[index].dataset.audio;
  audio.play();

  tracks[index].classList.add("playing");

  // Now Playing
  const title = tracks[index].textContent;
  nowPlaying.classList.remove("playing");
  document.querySelector(".np-title").textContent = title;
  requestAnimationFrame(() => {
    nowPlaying.classList.add("playing");
  });

  updatePlayButton();
  updateHeaderButton();
}

// =====================
// シャッフル順生成
// =====================
function createShuffleList() {
  shuffleList = tracks.map((_, i) => i);

  for (let i = shuffleList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffleList[i], shuffleList[j]] = [shuffleList[j], shuffleList[i]];
  }

  let lastStart = localStorage.getItem("lastShuffleStart");

  do {
    shuffleIndex = Math.floor(Math.random() * shuffleList.length);
  } while (shuffleIndex == lastStart);

  localStorage.setItem("lastShuffleStart", shuffleIndex);
}

// =====================
// 曲クリック
// =====================
tracks.forEach((track, index) => {
  track.addEventListener("click", () => {
    if (isShuffle) {
      shuffleIndex = shuffleList.indexOf(index);
    }
    playTrack(index);
  });
});

// =====================
// 再生 / 停止
// =====================
function updatePlayButton() {
  playBtn.textContent = audio.paused ? "▶" : "⏸";
}
function updateHeaderButton() {
  headerPlay.textContent = audio.paused ? "▶" : "⏸";
}

playBtn.addEventListener("click", () => {
  if (currentIndex === -1) return;
  audio.paused ? audio.play() : audio.pause();
});

headerPlay.addEventListener("click", () => {
  if (currentIndex === -1) {
    playTrack(0);
    return;
  }
  audio.paused ? audio.play() : audio.pause();
});

audio.addEventListener("play", () => {
  updatePlayButton();
  updateHeaderButton();
});
audio.addEventListener("pause", () => {
  updatePlayButton();
  updateHeaderButton();
  nowPlaying.classList.remove("playing");
});

// =====================
// 次 / 前
// =====================
function nextTrack() {
  if (currentIndex === -1) return;

  if (isShuffle) {
    shuffleIndex++;
    if (shuffleIndex >= shuffleList.length) {
      createShuffleList();
    }
    playTrack(shuffleList[shuffleIndex]);
  } else {
    playTrack((currentIndex + 1) % tracks.length);
  }
}

function prevTrack() {
  if (currentIndex === -1) return;

  if (isShuffle) {
    shuffleIndex--;
    if (shuffleIndex < 0) shuffleIndex = shuffleList.length - 1;
    playTrack(shuffleList[shuffleIndex]);
  } else {
    playTrack((currentIndex - 1 + tracks.length) % tracks.length);
  }
}

nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);
headerNext.addEventListener("click", nextTrack);
headerPrev.addEventListener("click", prevTrack);

// =====================
// リピート
// =====================
function toggleRepeat() {
  isRepeat = !isRepeat;
  audio.loop = isRepeat;

  repeatMain.classList.toggle("active", isRepeat);
  repeatHeader.classList.toggle("active", isRepeat);
}

repeatMain.addEventListener("click", toggleRepeat);
repeatHeader.addEventListener("click", toggleRepeat);

// =====================
// シャッフル
// =====================
function toggleShuffle() {
  isShuffle = !isShuffle;

  shuffleMain.classList.toggle("active", isShuffle);
  shuffleHeader.classList.toggle("active", isShuffle);

  if (isShuffle) {
    createShuffleList();
    playTrack(shuffleList[shuffleIndex]);
  }
}

shuffleMain.addEventListener("click", toggleShuffle);
shuffleHeader.addEventListener("click", toggleShuffle);

// =====================
// 曲終了時
// =====================
audio.addEventListener("ended", nextTrack);

// =====================
// シークバー
// =====================
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;

  seekBar.max = audio.duration;
  seekBar.value = audio.currentTime;
  currentTimeEl.textContent = format(audio.currentTime);
  durationEl.textContent = format(audio.duration);
});

seekBar.addEventListener("input", () => {
  audio.currentTime = seekBar.value;
});

function format(time) {
  const m = Math.floor(time / 60);
  const s = Math.floor(time % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// =====================
// SOUND NOTICE
// =====================
const soundModal = document.getElementById("sound-modal");
const soundPlayBtn = document.getElementById("sound-play");
const soundMuteBtn = document.getElementById("sound-mute");

if (!localStorage.getItem("soundChecked")) {
  soundModal.style.display = "flex";
}

soundPlayBtn.addEventListener("click", () => {
  localStorage.setItem("soundChecked", "true");
  soundModal.style.display = "none";
  playTrack(0);
});

soundMuteBtn.addEventListener("click", () => {
  localStorage.setItem("soundChecked", "true");
  soundModal.style.display = "none";
});

audio.addEventListener("pause", () => {
  updatePlayButton();
  updateHeaderButton();

  // ★ ここが重要：全部の曲から playing を外す
  tracks.forEach(li => li.classList.remove("playing"));

  // Now Playing のアニメーションも止めるなら
  nowPlaying.classList.remove("playing");
});