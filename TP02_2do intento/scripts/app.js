const apikey = "dkElzr6SJfgkAbeHk3kGa70yrOiwrdcP";
const laTag ="homer"
const aleatorio = `https://api.giphy.com/v1/gifs/random?api_key=${apikey}&limit=1&tag=${laTag}`;

const resultsEl = document.getElementById("gifsTende");

fetch(aleatorio).then((res)=>{
    return res.json();
}).then((json) => {
    let resultsHTML = json.data.image_original_url;
    let asddf = "";
    asddf += `<img src="${resultsHTML}" alt="gif aleatorio" z-index=0>`;
    resultsEl.innerHTML = asddf;
    // agregar el cuadro de ver más acá
}).catch((err) => {
    console.log(err.message);
})

// devuelve en consola lo que se escribe y se le hace enter
var loEscrito = document.getElementById("haceBuscar");
var buscar = document.getElementById("cuadroBusqueda");


loEscrito.addEventListener("submit", (e) => {
    e.preventDefault();
    let finalmenteElInput = buscar.value;
    //imprimirNewHTML(finalmenteElInput);
    window.sessionStorage.setItem("searchTerm", finalmenteElInput);
    window.location.href = "res_busq/busq.html";
});
  

let imprimirNewHTML = (value) => {
    let busqueda = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${value}`;
    //console.log(busqueda);
    let dondeImprimir = document.getElementById("resultadoBusqueda");
    fetch(busqueda).then((res) => {
        return res.json();
    }).then((json) => {
        let agarrarGifs = json.data.image_original_url;
        let laNada = "";
        laNada += `<img src="${agarrarGifs}" alt="gif" z-index=0>`;
        dondeImprimir.innerHTML = laNada;
    }).catch((err) => {
        console.log(err.message);
    });
};


    //window.open(aleatorio);
    



// función para abrir pestaña con nuevo resultado de búsqueda
// puede ser sugerido o input del usuario
