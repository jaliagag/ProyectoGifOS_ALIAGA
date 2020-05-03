const apikey = "dkElzr6SJfgkAbeHk3kGa70yrOiwrdcP";
const laTag ="homer"
const aleatorio = `https://api.giphy.com/v1/gifs/random?api_key=${apikey}&limit=1`;
//const aleatorio = `https://api.giphy.com/v1/gifs/random?api_key=${apikey}&limit=1&tag=${laTag}`;
//const resultsEl = document.getElementById("gifsTende");

// Crear un array que quede en localStorage y que al que pueda acceder la 
// página busq.html

var busquedaResultadosArr = [];
    // máximo número de resultados de búsqueda que voy a guardar Y mostrar
    // usar UNSHIFT para agregar al principio
busquedaResultadosArr.length = 7;
    // guardar en memoria el array
//window.localStorage.setItem("0", busquedaResultadosArr[0]);

//##############################################################

// ingresar gif aleatorio

let inicioGif = (id) => {
    fetch(aleatorio).then((res)=>{
        return res.json();
    }).then((json) => {
        let resultsHTML = json.data.image_original_url;
        let asddf = "";
        asddf += `<img src="${resultsHTML}" alt="gif aleatorio" z-index=0>`
        id.innerHTML = asddf;
        // agregar el cuadro de ver más acá
    }).catch((err) => {
        console.log(err.message);
    })
    /* let agregarCuadrito = `
        <div class="sugBorde">
            <div class="cajitaMas"><span>Ver más...</span></div>
        </div>`
    resultsEl.innerHTML += agregarCuadrito; */
}

// que todos los elementos con la clase "elGif" haga la función inicioGif
elements = document.querySelectorAll('#gifsTende');
//console.log(elements);
let sugArray = [elements];
//console.log(sugArray);

sugArray.forEach(inicioGif);

//##############################################################
//##############################################################

// BUSCADOR

var loEscrito = document.getElementById("haceBuscar");
var buscar = document.getElementById("cuadroBusqueda");

loEscrito.addEventListener("submit", (e) => {
    e.preventDefault();
    let finalmenteElInput = buscar.value;
    busquedaResultadosArr.unshift(finalmenteElInput);
    window.localStorage.setItem("searchTerm", finalmenteElInput);
    window.location.href = "busq.html";
});  

let imprimirNewHTML = () => {
    let inputBusqueda = localStorage.getItem("searchTerm");
    let busqueda = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${inputBusqueda}&limit=20`;

    let dondeImprimir = document.getElementById("resultadoBusqueda");
    fetch(busqueda).then((res) => {
        return res.json();
    }).then((json) => {
        let laNada = "";

        json.data.forEach((obj) => {
            const url = obj.images.fixed_width.url;
            laNada += `<img src="${url}" alt="gif" z-index=0 class="gifTraido">`;
        })
        dondeImprimir.innerHTML = laNada;
    }).catch((err) => {
        console.log(err.message);
    });
};

buscar.addEventListener("input", updateValue);

function updateValue(e) {
    let long = e.target.value;
    if (long != 0) {
        console.log("e");
        let sale = document.getElementById("muestraONo");
        if (sale.style.display === "none") {
            sale.style.display = "block";
          } else {
            sale.style.display = "none";
          }

    }
}



// FALTA: hacer que los resultados se muestren en dos columnas.... eso va a doler
