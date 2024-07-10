// ## LOADER
// window.addEventListener('load', () => {
//     setTimeout( () => {
//         document.querySelector(".loader-warpper").classList.toggle("loader-warpper-hide");
//     }, 200);
// });

// ## LIKE MUSIC HEADER
function likeMusicHeader() {
  document
    .getElementById("likeMusicHeader")
    .classList.toggle("likeMusicHeaderToggle");
}
function likeMusicPlay() {
  document
    .getElementById("likeMusicPlay")
    .classList.toggle("likeMusicPlayToggle");
}

// ## PLAY SOUND/MUSIC PLAYER
var audio1 = new Audio("musics/1.mp3");
// PLAY SOUND
function playSound() {
  audio1.play();
  document
    .getElementById("pauseBtnPlayCard")
    .classList.toggle("pauseBtnPlayCardToggle");
  document
    .getElementById("playBtnPlayCard")
    .classList.toggle("playBtnPlayCardToggle");
}
// PAUSE SOUND
function pauseSound() {
  audio1.pause();
  document
    .getElementById("pauseBtnPlayCard")
    .classList.toggle("pauseBtnPlayCardToggle");
  document
    .getElementById("playBtnPlayCard")
    .classList.toggle("playBtnPlayCardToggle");
}
function likeMusicPlayer() {
  document
    .getElementById("likeMusicPlayer")
    .classList.toggle("likeMusicPlayerToggle");
}

// COLLAPSE MUSIC PLAYER
function collapseMusicPlayer() {
  document
    .getElementById("sectionMusicPlayer")
    .classList.toggle("sectionMusicPlayerToggle");
  document
    .getElementById("collapseMusicPlayerBtn")
    .classList.toggle("collapseMusicPlayerBtnToggle");
  document
    .getElementById("expandMusicPlayerBtn")
    .classList.toggle("expandMusicPlayerBtnToggle");
}

// FULL PLAYER
function fullPlayer() {
  document.getElementById("fullPlayer").classList.toggle("fullPlayer");
}
function fullPlayerHeaderDropdown() {
  document
    .getElementById("fullPlayerHeaderDropdown")
    .classList.toggle("fullPlayerHeaderDropdown");
}

// ## DOWNLOAD
function download() {
  document.getElementById("download").classList.toggle("downloadToggle");

  setTimeout(() => {
    window.location.href = "../musics/1.mp3";
  }, 3000);
}

// NUMBER ALBUMS
var cardGridLen = document.getElementById("cardGridLen").childElementCount;
var numAlbums = document.getElementById("numAlbums");
numAlbums.innerHTML = cardGridLen;
