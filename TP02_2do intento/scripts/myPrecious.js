const apikey = "dkElzr6SJfgkAbeHk3kGa70yrOiwrdcP";
document.getElementById("centrame").style.display = "none";

function gifsUsrGuardados () {
    var cualaca = "";
    if (localStorage.getItem("GifUsuario") != null) {
        var comienzo = 0;
        var GifUsuario = localStorage.getItem("GifUsuario").split(",");
        console.log(GifUsuario)
        var elArray = localStorage.getItem("GifUsuario");
        console.log(elArray);
        
        GifUsuario.forEach(function (gif) {
            var urlDelOrto = "https://api.giphy.com/v1/gifs/" + gif + "?api_key="+ apikey;
            console.log(urlDelOrto)
            fetch(urlDelOrto)
                .then((response) => {
                    return response.json();
                })
                .then(resultado => {
                    const url = resultado.images.fixed_width.url;
                    const paJuera = resultado.images.original.url;
                    //console.log(resultado)
                    comienzo++;
                    cualaca += 
                    `
                    <div class="laRecalcada" onclick="abreteSesamo(${url})">
                        <a href="${paJuera}" id="fullHeightPlease">
                            <img src="${url}" alt="gif" z-index=0 class="lasTendencias" />
                        </a>
                    </div>    
                    `;
                    document.getElementById("gifGuardados")[0].innerHtml = cualaca;
                })
                .catch((error) => {
                    return error;
                });
        })
    } else {
        document.getElementById("centrame").innerHTML = "Todavía no has guardado ningún Guifo.";
        document.getElementById("centrame").style.display = "block";
    }
}

gifsUsrGuardados();