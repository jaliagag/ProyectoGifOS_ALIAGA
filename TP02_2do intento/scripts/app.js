const apikey = "dkElzr6SJfgkAbeHk3kGa70yrOiwrdcP";
const tenor = "RZZXC4BYAXIL";

//##############################################################
//##############################################################

// BUSCADOR

// ELEMENTITOS GUARDADOS
/*
let dameBusq = () => {
    if ( localStorage.getItem("busquedasGuardadas") != null) {
        var busquedasGuardadas  = localStorage.getItem("busquedasGuardadas").split(",");
    } else {
        var busquedasGuardadas = [];
    }
    return busquedasGuardadas;
}

let guardame = (unaBusq) => {
	let busquedasGuardadas = dameBusq();

	let sectionWidth = document.getElementById("").offsetWidth;
	let wrapperWidth = document.getElementById("").offsetWidth; 
 	if ((wrapperWidth + 200) >= sectionWidth) {
		busquedasGuardadas.pop();
	} 
	busquedasGuardadas.unshift(unaBusq);
	localStorage.setItem("busquedasGuardadas", busquedasGuardadas);
	finalmenteLasBusquedas();
}

let finalmenteLasBusquedas = () => {
    console.log("llego3")
	if (dameBusq() != null) {
		let busquedasGuardadas = dameBusq();
		let cuadritos = "";
		busquedasGuardadas.forEach(function(item) {
			// dónde lo guardo
			cuadritos += `<a href="busq.html" class="cuadritos" data-term="${item}" onclick="window.localStorage.setItem("searchTerm", this)">
			<span class="border">#${item}</span>
			</a>`;
		})
		document.getElementById("guardado").innerHTML = cuadritos;
	}
}

finalmenteLasBusquedas();*/

// ELEMENTITOS GUARDADOS

let abreteSesamo = (donde) => {
    window.location.href = donde;
}

var loEscrito = document.getElementById("haceBuscar");
var buscar = document.getElementById("cuadroBusqueda");

loEscrito.addEventListener("submit", (e) => {
    e.preventDefault();
    let finalmenteElInput = buscar.value;
    if (finalmenteElInput != 0) {
        window.localStorage.setItem("searchTerm", finalmenteElInput);
        window.localStorage.setItem("lastSearch", finalmenteElInput);
        window.location.href = "busq.html";
    }
});

let imprimirNewHTML = () => {
    let inputBusqueda = localStorage.getItem("searchTerm");
    //arrayardo.unshift(JSON.stringify("inputBusqueda"));
    let busqueda = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${inputBusqueda}&limit=20`;
    document.getElementById("resultadoDeBusqueda").innerHTML = ` Resultado de búsqueda: ${inputBusqueda}`
    
    let dondeImprimir = document.getElementById("resultadoBusqueda");
    fetch(busqueda).then((res) => {
        return res.json();
    }).then((json) => {
        let laNada = "";
        json.data.forEach((obj) => {
            const url = obj.images.fixed_width.url;
            const paJuera = obj.images.original.url;
            const tags = obj.title;
            const chauGif = tags.includes("GIF");
            let finalTag = "";

            if (chauGif == false) {
                finalTag = tags;
            } else {
                finalTag = tags.replace("GIF","");
            }
            laNada += `
            <div class="laRecalcada" onclick="abreteSesamo(${url})">
                <a href="${paJuera}">
                    <img src="${url}" alt="gif" z-index=0 class="gifTraido" />
                    <div class="chDLL">#${finalTag}</div>
                </a>
            </div>`;
        })
        dondeImprimir.innerHTML = laNada;
    }).catch((err) => {
        console.log(err.message);
    });
    //arrayardo.push(inputBusqueda);
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

// TENDENCIAS

const tendenciasGiphy = `https://api.giphy.com/v1/gifs/trending?api_key=${apikey}&limit=20`;

fetch(tendenciasGiphy).then((res) => {
    return res.json()
}).then((json) => {
    let printTrend = document.getElementById("mostrarAleatorios");

    let laNada = "";
    json.data.forEach((obj) => {
        //const url = obj.images.original.url;
        const url = obj.images.fixed_width.url;
        const paJuera = obj.images.original.url;
        const tags = obj.title;
        const chauGif = tags.includes("GIF");
        let finalTag = "";

        if (chauGif == false) {
            finalTag = tags;
        } else {
            finalTag = tags.replace("GIF","");
        }
        laNada += `
        <div class="laRecalcada" onclick="abreteSesamo(${url})">
            <a href="${paJuera}" id="fullHeightPlease">
                <img src="${url}" alt="gif" z-index=0 class="lasTendencias" />
                <div class="chDLL">#${finalTag}</div>
            </a>
        </div>`;
    })
    printTrend.innerHTML = laNada;
})

// SUGERENCIAS

const sugerenciasGiphy = `https://api.giphy.com/v1/gifs/categories?api_key=${apikey}&limit=4`;

//setTimeout(function(){ alert("Hello"); }, 3000);

let cargarSugerencias = () => {
    fetch(sugerenciasGiphy).then((res) => {
        return res.json()
    }).then((json) => {
        let printCat = document.getElementById("cuatroFantasticos");
        let miraPadre = "";
        json.data.forEach((obj) => {
            const url = obj.gif.images.original.url;
            const tags = obj.gif.tags;
            miraPadre += `
            <div class="cajaMayorCuatro">
                <div class="arribita" id="arribaEnTe"><span id="elHastag">#${tags[0]} ${tags[1]} ${tags[2]}</span><a href="#"><img src="assets/close.svg" alt="X"></a></div>
                <div class="laUltimaCaja" id="gifsTende">
                    <a href="${url}">
                        <img src="${url}" alt="gif" class="deLosCuatro" />
                    </a>
                    <div class="sugBorde" onclick=vasDeEsto("${tags[0]}")>
                        <div class="cajitaMas"><span>Ver más...</span></div>
                    </div>
                </div>
            </div>`;
        })
        printCat.innerHTML = miraPadre;
    }).catch((err) => {
        console.log(err.message);
    });
}

//alert(hayAlgo)
let guardoONo = () => {
    var hayAlgo = localStorage.getItem("lastSearch");
    if (hayAlgo == "" || hayAlgo == null) {
        //alert("no hay nada che")
    }else{
        let aparecido = "";
        let elLlanero = document.getElementById("guardado");
        aparecido += `
        <div class="cajaMayorSol" onclick=vasDeEsto("${hayAlgo}") id="theOneAndOnly">
            <div class="historyBox"><span>#${hayAlgo}</span></div>
        </div>
        `
        elLlanero.innerHTML = aparecido;
    };
}

guardoONo();
cargarSugerencias();

let vasDeEsto = (valorX) => {
    //alert(valorX);
    window.localStorage.setItem("searchTerm", valorX);
    window.location.href = "busq.html";
}

