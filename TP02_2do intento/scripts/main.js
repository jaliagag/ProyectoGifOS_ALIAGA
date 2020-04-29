// VARIABLES GLOBALES


// ONLOAD

let theme_selection = () => {
  if (typeof(Storage) !== "undefined") {
    var hayAlgoQ = window.localStorage.getItem("theme");
    //console.log(hayAlgoQ);
    if(hayAlgoQ == ""){
      fboton();
    } else if (hayAlgoQ == "light"){
      fboton();
    } else {
      console.log("paso")
      sboton();
    }
  } else {
    console.log("Al parecer tu navegador no quiere que guardemos información de vos, pero ¡qué persona cuidadosa!");
  }
}

// CAMBIAR DE CSS
// FALTA ACTUALIZAR EL ONCLICK DE LOS ELEMENTOS EN EL HTML

let fboton = () => {
    
    var elim = document.getElementById("estilardo");
    elim.remove();

    var head = document.getElementsByTagName("HEAD")[0];
  
    var link = document.createElement("link");
  
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "styles/light_theme.css";
    link.id = "estilardo";
  
    head.appendChild(link);

    window.localStorage.setItem("theme", "light");
}
  
let sboton = () => {

    var elim = document.getElementById("estilardo");
    elim.remove();
    
    var head = document.getElementsByTagName("HEAD")[0];
  
    var link = document.createElement("link");
  
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "styles/dark_theme.css";
    link.id = "estilardo";
  
    head.appendChild(link);

    window.localStorage.setItem("theme", "dark");
}

// TOGGLE BARRA DE TEMAS

function mostrar() {
    document.getElementById("myDropdown").classList.toggle("show");
  }


  /*
window.onclick = function(event) {
      //if (!event.target.matches('.dropbtn')) {
    if (!event.target.matches('#dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
}*/

// CUADRO DE BÚSQUEDA
// CAMBIAR LUPA SI ESTÁ HACIÉNDO FOCUS EN EL INPUT

let cambiaLupa = () => {
  let queEstilo = document.getElementById("estilardo").getAttribute("href");
  let reemplazaLupa = document.getElementById("lupita");
  let lupitaBuscar = document.getElementById("btnBuscar");

  if(queEstilo == "styles/light_theme.css") {
    reemplazaLupa.src = "assets/lupa.svg";
    lupitaBuscar.style.background = "#F7C9F3";
    lupitaBuscar.style.color = "#110038";
  } else if (queEstilo == "styles/dark_theme.css") {
    reemplazaLupa.src = "assets/lupa_light.svg";
    lupitaBuscar.style.background = "#EE3EFE";
    lupitaBuscar.style.color = "#FFFFFF";
  }
}

let vuelveLupaGris = () => {
  let queEstilo = document.getElementById("estilardo").getAttribute("href");
  let reemplazaLupa = document.getElementById("lupita");
  let lupitaBuscar = document.getElementById("btnBuscar");

  if(queEstilo == "styles/light_theme.css") {
    reemplazaLupa.src = "assets/lupa_inactive.svg";
    lupitaBuscar.style.background = "#E6E6E6";
    lupitaBuscar.style.color = "#B4B4B4";
  } else if (queEstilo == "styles/dark_theme.css") {
    reemplazaLupa.src = "assets/lupa_inactive.svg";
    lupitaBuscar.style.background = "#808080";
    lupitaBuscar.style.color = "#8F8F8F";
  }
}

var algoEscribio = document.getElementById("cuadroBusqueda").addEventListener("focus", cambiaLupa, true);
var ySeFue = document.getElementById("cuadroBusqueda").addEventListener("blur", vuelveLupaGris, true);

// SEARCH ENGINE ON GIPHY

/* const PUBLIC_KEY = 'dkElzr6SJfgkAbeHk3kGa70yrOiwrdcP';
const BASE_URL = '//api.giphy.com/v1/gifs/';
const ENDPOINT = 'search';
const LIMIT = 14;
const RATING = 'pg';

let $queryInput = $('.query');
let $resultWrapper = $('.result');
let $loader = $('.loader');
let $inputWrapper = $('.input-wrapper');
let $clear = $('.clear');
let $button = $('.random');
let currentTimeout;

let query = {
  text: null,
  offset: 0,
  request() {
    return `${BASE_URL}${ENDPOINT}?q=${this.text}&limit=${LIMIT}&rating=${RATING}&offset=${this.offset}&api_key=${PUBLIC_KEY}`;
  },
  fetch(callback) {
    $.getJSON(this.request())
      .success(data => {
        let results = data.data;
        
        if (results.length) {
          let url = results[0].images.downsized.url;
          console.log(results);
          callback(url);
        } else {
          callback('');
        }
      })
      .fail(error => {
        console.log(error);
      });
  }
}

function buildImg(src = '//giphy.com/embed/xv3WUrBxWkUPC', classes = 'gif hidden') {
  return `<img src="${src}" class="${classes}" alt="gif" />`;
}

$clear.on('click', e => {
  $queryInput.val('');
  $inputWrapper.removeClass('active').addClass('empty');
  $('.gif').addClass('hidden');
  $loader.removeClass('done');
  $button.removeClass('active');
});

$button.on('click', e => {
  query.offset = Math.floor(Math.random() * 25);
  
  query.fetch(url => {
    if (url.length) {
      $resultWrapper.html(buildImg(url));

      $button.addClass('active');
    } else {
      $resultWrapper.html(`<p class="no-results hidden">No Results found for <strong>${query.text}</strong></p>`);

      $button.removeClass('active');
    }

    $loader.addClass('done');
    currentTimeout = setTimeout(() => {
      $('.hidden').toggleClass('hidden');
    }, 1000);
  });
});

$queryInput.on('keyup', e => {
  let key = e.which || e.keyCode;
  query.text = $queryInput.val();
  query.offset = Math.floor(Math.random() * 25);
  
  if (currentTimeout) {
    clearTimeout(currentTimeout);
    $loader.removeClass('done');
  }
  
  currentTimeout = setTimeout(() => {
    currentTimeout = null;
    $('.gif').addClass('hidden');
    
    if (query.text && query.text.length) {
      $inputWrapper.addClass('active').removeClass('empty');
      
      query.fetch(url => {
        if (url.length) {
          $resultWrapper.html(buildImg(url));
          
          $button.addClass('active');
        } else {
          $resultWrapper.html(`<p class="no-results hidden">No Results found for <strong>${query.text}</strong></p>`);
          
          $button.removeClass('active');
        }
        
        $loader.addClass('done');
        currentTimeout = setTimeout(() => {
          $('.hidden').toggleClass('hidden');
        }, 1000);
      });
    } else {
      $inputWrapper.removeClass('active').addClass('empty');
      $button.removeClass('active');
    }
  }, 1000);
}); */

