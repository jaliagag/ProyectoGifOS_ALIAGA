const apikey = "dkElzr6SJfgkAbeHk3kGa70yrOiwrdcP";
const tenor = "RZZXC4BYAXIL";
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

let abreteSesamo = (donde) => {
    console.log(donde);
    window.location.href = donde;
}

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
            const tags = obj.title;
            const chauGif = tags.includes("GIF");
            let finalTag = "";

            if (chauGif == false) {
                finalTag = tags;
            } else {
                finalTag = tags.replace("GIF","");
            }
            console.log(finalTag)
            laNada += `
            <div class="laRecalcada" onclick="abreteSesamo(${url})">
                <a href="${url}">
                    <img src="${url}" alt="gif" z-index=0 class="gifTraido" />
                    <div class="conchaDLL">#${finalTag}</div>
                </a>
            </div>`;
        })
        dondeImprimir.innerHTML = laNada;
    }).catch((err) => {
        console.log(err.message);
    });
};

// muestra y busca sugerencias

buscar.addEventListener("input", updateValue);

function updateValue(e) {
    let long = e.target.value;

    // MOSTRAR EL CUADRO DE LAS OPCIONES SUGERIDAS
    if (long != 0) {
        let sale = document.getElementById("muestraONo");
        if (sale.style.display === "none") {
            sale.style.display = "block";
            sale.style.position = "absolute";
          } else {
            sale.style.display = "none";
          }
    }
    // USAR TENOR PARA SUGERIR EN LOS <A> LAS OPCIONES QUE VIENEN DESDE LA APP

    function httpGetAsync(theUrl, callback)
    {
    // create the request object
    var xmlHttp = new XMLHttpRequest();

    // set the state change callback to capture when the response comes in
    xmlHttp.onreadystatechange = function()
    {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            callback(xmlHttp.responseText);
        }
    }

    // open as a GET call, pass in the url and set async = True
    xmlHttp.open("GET", theUrl, true);

    // call send with no params as they were passed in on the url string
    xmlHttp.send(null);

    return;
    }

    // callback for search suggestion event
    function tenorCallback_searchSuggestion(responsetext)
    {
        var response_objects = JSON.parse(responsetext);

        predicted_words = response_objects["results"];

        document.getElementById("sug_01").innerHTML = predicted_words[0];
        document.getElementById("sug_02").innerHTML = predicted_words[1];
        document.getElementById("sug_03").innerHTML = predicted_words[2];

        var sugerencia01 = document.getElementById("sug_01");
        var sugerencia02 = document.getElementById("sug_02");
        var sugerencia03 = document.getElementById("sug_03");

        sugerencia01.addEventListener("click", (e) => {
            e.preventDefault();
            window.localStorage.setItem("searchTerm", predicted_words[0]);
            window.location.href = "busq.html"; 
        });

        sugerencia02.addEventListener("click", (e) => {
            e.preventDefault();
            window.localStorage.setItem("searchTerm", predicted_words[1]);
            window.location.href = "busq.html"; 
        });

        sugerencia03.addEventListener("click", (e) => {
            e.preventDefault();
            window.localStorage.setItem("searchTerm", predicted_words[2]);
            window.location.href = "busq.html"; 
        });

    }

    // using default locale of en_US
    var autoc_url =`https://api.tenor.com/v1/search_suggestions?q=${long}&key=${tenor}`;

    // send search suggestion request
    httpGetAsync(autoc_url,tenorCallback_searchSuggestion);
}

// FALTA: hacer que los resultados se muestren en dos columnas.... eso va a doler
