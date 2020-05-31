const keyapi = "dkElzr6SJfgkAbeHk3kGa70yrOiwrdcP";
//document.getElementById("centrame").style.display = "none";

function gifsUsrGuardados () {
    if (localStorage.getItem("GifUsuario") != null) {
        var cualaca = "";
        var comienzo = 0;
        var gifUsuario = localStorage.getItem("GifUsuario").split(",");
        //elArray.pop();
        gifUsuario.forEach(function (gif) {
            //console.log(gif);
            fetch("https://api.giphy.com/v1/gifs/" + gif + "?api_key="+ keyapi).then((response) => {
                return response.json();
            }).then(resultado => {
                //console.log(resultado);
                let url = resultado.data.images.fixed_height.url;
                let paJuera = resultado.data.url;
                comienzo++;
                cualaca += 
                `
                <div class="laRecalcada" onclick="abreteSesamo(${url})">
                    <a href="${paJuera}" id="fullHeightPlease">
                        <img src="${url}" alt="gif" z-index=0 class="lasTendencias" />
                    </a>
                </div>    
                `;
                document.getElementById("gifGuardados").innerHTML = cualaca;
                //console.log(cualaca);
                
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