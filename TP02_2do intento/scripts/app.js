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
    
}).catch((err) => {
    console.log(err.message);
})

// 
var loEscrito = document.getElementById("haceBuscar");
var buscar = document.getElementById("cuadroBusqueda");
loEscrito.addEventListener("submit", (e) => {
    e.preventDefault();
    let finalmenteElInput = buscar.value;
    console.log(finalmenteElInput);
});

/* function leSearch() {
    e.preventDefault();
    console.log(buscar.value);
    //leSearch()
} */