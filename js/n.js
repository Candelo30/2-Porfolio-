
const audioPlayer = document.getElementById("audioPlayer");
const playButton = document.getElementById("playButton");
const playIcon = document.getElementById("playIcon");
const pauseIcon = document.getElementById("pauseIcon");
const timeDisplay = document.querySelector(".time");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
const progressBar = document.getElementById("progress");
const songNameElement = document.getElementById("songName");
const volumeControl = document.querySelector(".volume-control");
const musicPlayer = document.getElementById("musicPlayer");
const volumeIcon = document.getElementById("volumeIcon");
const volumeSlider = document.getElementById("volumeSlider");
const aurora = document.createElement("div");
aurora.classList.add("aurora");
document.body.appendChild(aurora);
let isPlaying = false;
// Lista de canciones
const musicList = [
  "../src/music/Overexpressed.mp3",
  "../src/music/Arrival.mp3",
  "../src/music/toby fox - UNDERTALE Soundtrack - 65 CORE.mp3"
  // Agrega aquí las URLs de todas las canciones adicionales
];

songNames = [
  "Overexpressed",
  "Arrival",
  "CORE"
  // Agrega aquí las URLs de todas las canciones adicionales
];


let currentSongIndex = 0; // Índice de la canción actual

//__________________________________________________________________

const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;
const configToggle = document.getElementById("config-toggle");
const configSidebar = document.getElementById("config-sidebar");
const closeConfigSidebar = document.getElementById("closeConfigSidebar");
let currentTheme = localStorage.getItem("theme") || "light";

//_____________________________________________________________________

const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = [
  "#ffb56b",
  "#fdaf69",
  "#f89d63",
  "#f59761",
  "#ef865e",
  "#ec805d",
  "#e36e5c",
  "#df685c",
  "#d5585c",
  "#d1525c",
  "#c5415d",
  "#c03b5d",
  "#b22c5e",
  "#ac265e",
  "#9c155f",
  "#950f5f",
  "#830060",
  "#7c0060",
  "#680060",
  "#60005f",
  "#48005f",
  "#3d005e",
];

/* ?____________________________________________ ¿*/

// Cargar Página

window.onload = function () {
  var container = document.querySelector('.container-bike');
  container.classList.add('container-bike');
};

// Función para añadir la clase "none" después de un tiempo (por ejemplo, 5 segundos)
setTimeout(function () {
  var container = document.querySelector('.container-bike');
  container.classList.add('none');
}, 5000); // 5000 milisegundos = 5 segundos (puedes ajustar este valor según tu preferencia)

//--------------------------------------------------------------------

function toggleTheme() {
  if (currentTheme === "dark") {
    root.removeAttribute("data-theme");
    root.setAttribute("data-theme", "light");
    root.style.setProperty("--background-color", "#ffffff");
    root.style.setProperty("--text-color", "#000000");
  } else {
    root.setAttribute("data-theme", "dark");

    root.style.setProperty("--background-color", "#333333");
    root.style.setProperty("--text-color", "#ffffff");
  }
  currentTheme = currentTheme === "dark" ? "light" : "dark"; // Actualiza el valor de currentTheme
  localStorage.setItem("theme", currentTheme);
}

//__________________________________________________________________________

//LANGUAJES

$(document).ready(function () {
  // Al hacer clic en el enlace con id "language-toggle"
  $("#language-toggle").on("click", function (e) {
    e.preventDefault(); // Previene el comportamiento predeterminado del enlace

    // Alternar la visibilidad de las opciones de idioma
    $(".language-options").toggle();
  });
});

//_______________________________________________________________________

jQuery(
  '<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>'
).insertAfter(".quantity input");
jQuery(".quantity").each(function () {
  var spinner = jQuery(this),
    input = spinner.find('input[type="number"]'),
    btnUp = spinner.find(".quantity-up"),
    btnDown = spinner.find(".quantity-down"),
    min = input.attr("min"),
    max = input.attr("max");

  btnUp.click(function () {
    var oldValue = parseFloat(input.val());
    if (oldValue >= max) {
      var newVal = oldValue;
    } else {
      var newVal = oldValue + 1;
    }
    spinner.find("input").val(newVal);
    //SelectorSlide.val(newVal);.    /*aquí pone el selector del slide*/
    spinner.find("input").trigger("change");
  });

  btnDown.click(function () {
    var oldValue = parseFloat(input.val());
    if (oldValue <= min) {
      var newVal = oldValue;
    } else {
      var newVal = oldValue - 1;
    }
    spinner.find("input").val(newVal);
    //SelectorSlide.val(newVal);        /*aquí pone el selector del slide*/
    spinner.find("input").trigger("change");
  });
});

//-------------

document.addEventListener('DOMContentLoaded', function () {
  const languageToggle = document.getElementById('language-toggle');

  // Función para cargar las traducciones según el idioma
  async function loadTranslations(lang) {
    try {
      const response = await fetch(`../languajes/${lang}.json`);
      const translations = await response.json();
      return translations;
    } catch (error) {
      console.error("Error loading translations:", error);
      return null;
    }
  }

  async function changeLanguage(lang) {
    const elementsToTranslate = document.querySelectorAll('[data-section]');
    const translations = await loadTranslations(lang);

    if (translations) {
      elementsToTranslate.forEach((element) => {
        const section = element.getAttribute('data-section');
        const value = element.getAttribute('data-value');
        const translationKey = `${section}.${value}`;
        if (translations[translationKey]) {
          element.textContent = translations[translationKey];
        }
      });
    }
  }

  languageToggle.addEventListener('click', function (event) {
    event.preventDefault();
    const languageOptions = document.querySelector('.language-options');
    languageOptions.classList.toggle('active');
  });

  const languageOptions = document.querySelectorAll('.language-options span');
  languageOptions.forEach(function (option) {
    option.addEventListener('click', function (event) {
      const lang = event.target.parentElement.getAttribute('data-value');
      changeLanguage(lang);
      const languageOptions = document.querySelector('.language-options');
      languageOptions.classList.remove('active');
    });
  });

  // Cambiar el idioma inicialmente
  const defaultLanguage = 'en'; // Cambia a 'es' si deseas el idioma español por defecto
  changeLanguage(defaultLanguage);
});

//------------------------------------------------------------------------

function changePage(pageId) {
  const loadingOverlay = document.getElementById("loading-overlay");
  loadingOverlay.style.display = "flex"; // Mostrar el elemento de carga antes de ocultar la sección actual

  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    section.style.display = "none";
  });

  // Simulamos la carga con un retraso de 1 segundo (1000 ms)
  setTimeout(() => {
    loadingOverlay.style.display = "none"; // Ocultar el elemento de carga

    const targetSection = document.getElementById(pageId);
    targetSection.style.display = "block"; // Mostrar la nueva sección
  }, 1000); // Ajusta el valor del retraso según tus preferencias para simular una carga más larga o más corta
}

// Evento de clic para los enlaces de la barra lateral
const sidebarLinks = document.querySelectorAll(".sidebar-menu a");
sidebarLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const pageId = link.getAttribute("href").substring(1);
    changePage(pageId);
  });
});

// Función para abrir la barra lateral
document.getElementById("open-btn").addEventListener("click", function () {
  document.getElementById("sidebar").style.left = "0";
});

// Función para cerrar la barra lateral
document.getElementById("closeSidebar").addEventListener("click", function () {
  document.getElementById("sidebar").style.left = "-250px";
});
configToggle.addEventListener("click", () => {
  configSidebar.classList.add("show");
});

closeConfigSidebar.addEventListener("click", () => {
  configSidebar.classList.remove("show");
});
themeToggle.addEventListener("click", () => {
  toggleTheme();
});

const defaultPageId = "home";
changePage(defaultPageId);


// ---------------------------- MUSICA -----------------------


function loadSong(index) {
  audioPlayer.src = musicList[index];
  audioPlayer.load(); // Cargar la nueva canción
}

function playSong() {
  audioPlayer.play();
  playIcon.style.display = "none";
  pauseIcon.style.display = "inline";
  isPlaying = true;
}

function pauseSong() {
  audioPlayer.pause();
  playIcon.style.display = "inline";
  pauseIcon.style.display = "none";
  isPlaying = false;

  aurora.style.animationPlayState = "paused";
}

function previousSong() {
  currentSongIndex--;
  if (currentSongIndex < 0) {
    currentSongIndex = musicList.length - 1;
  }
  loadSong(currentSongIndex);
  if (isPlaying) {
    playSong();
  }
}

function nextSong() {
  currentSongIndex++;
  if (currentSongIndex >= musicList.length) {
    currentSongIndex = 0;
  }
  loadSong(currentSongIndex);
  if (isPlaying) {
    playSong();
  }
}

playButton.addEventListener("click", () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
    if (document.getElementById("home").style.display === "block") {
      aurora.style.animationPlayState = "running";
    }
  }
  showCurrentSongName();
});

prevButton.addEventListener("click", () => {
  previousSong();
  // Mostrar el nombre de la canción actual al cambiar la canción
  showCurrentSongName();
});

nextButton.addEventListener("click", () => {
  nextSong();
  // Mostrar el nombre de la canción actual al cambiar la canción
  showCurrentSongName();
});

audioPlayer.addEventListener("timeupdate", () => {
  const currentTimePercentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.style.width = `${currentTimePercentage}%`;
  timeDisplay.textContent = `${currentTimePercentage.toFixed(2)}%`;

  const currentSection = document.querySelector("section[style='display: block;']");

  // Verificar si la sección actual es el "home"
  if (currentSection && currentSection.id === "home") {
    aurora.style.animationPlayState = isPlaying ? "running" : "paused";
  } else {
    aurora.style.animationPlayState = "paused"; // Ocultar las auroras en otras secciones
  }
});

// Función para formatear el tiempo de reproducción en formato MM:SS
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

volumeIcon.addEventListener("click", () => {
  // Toggle the volume on click
  audioPlayer.muted = !audioPlayer.muted;
  if (audioPlayer.muted) {
    volumeIcon.classList.remove("fa-volume-up");
    volumeIcon.classList.add("fa-volume-off");
  } else {
    volumeIcon.classList.remove("fa-volume-off");
    volumeIcon.classList.add("fa-volume-up");
  }
});

volumeSlider.addEventListener("input", () => {
  // Update the volume based on the slider value
  audioPlayer.volume = volumeSlider.value;
  // Change the volume icon based on whether the volume is muted or not
  if (audioPlayer.muted || audioPlayer.volume === 0) {
    volumeIcon.classList.remove("fa-volume-up");
    volumeIcon.classList.add("fa-volume-off");
  } else {
    volumeIcon.classList.remove("fa-volume-off");
    volumeIcon.classList.add("fa-volume-up");
  }
});


function showVolumeControl() {
  // Mostrar la barra de volumen después de ocultar el nombre de la canción
  musicPlayer.classList.remove("hide-volume-bar");
}

function showCurrentSongName() {
  const currentSongName = songNames[currentSongIndex];
  songNameElement.textContent = currentSongName;

  // Ocultar el nombre de la canción después de 3 segundos (3000 milisegundos)
  setTimeout(() => {
    songNameElement.textContent = "";
    if (musicPlayer) {

      musicPlayer.classList.remove("hide-volume-bar"); // Mostrar la barra de volumen al ocultar el nombre
    }
  }, 3000);

  if (musicPlayer) {
    musicPlayer.classList.add("hide-volume-bar"); // Ocultar la barra de volumen al mostrar el nombre
  }
}

//--------------------------
showCurrentSongName();

//______________________

// MOUSE


circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function (e) {
  coords.x = e.clientX;
  coords.y = e.clientY;
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;

  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";

    circle.style.scale = (circles.length - index) / circles.length;

    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });

  requestAnimationFrame(animateCircles);
}

animateCircles();


// // Funcion del reloj

function cargarReloj() {
  var fecha = new Date();
  var hora = fecha.getHours();
  var minuto = fecha.getMinutes();
  var segundo = fecha.getSeconds();
  var ampm = hora >= 12 ? "PM" : "AM";

  hora = hora % 12 || 12;

  var horaStr = hora < 10 ? "0" + hora : hora;
  var minutoStr = minuto < 10 ? "0" + minuto : minuto;
  var segundoStr = segundo < 10 ? "0" + segundo : segundo;

  var relojnumerico = document.getElementById("relojnumerico");
  relojnumerico.innerHTML =
    horaStr + ":" + minutoStr + ":" + segundoStr + " " + ampm;
}

setInterval(cargarReloj, 1000);