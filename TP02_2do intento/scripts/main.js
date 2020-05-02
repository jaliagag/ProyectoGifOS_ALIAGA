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
      //console.log("paso")
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



// SESSION STORAGE