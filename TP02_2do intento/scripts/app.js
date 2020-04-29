/*
SUGERENCIAS

buscamos los elementos random
*/



const APIKEY = "dkElzr6SJfgkAbeHk3kGa70yrOiwrdcP";
const QUERY = "cats"; // value from input
const PATH= `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${QUERY}`;
//const PATH = 

fetch(PATH)
.then((res) => {
    return res.json()
})
.then((json) => {
    console.log(json.data[0].images)
    let unGif = json.data[0].images.original
    const LOSGIFS01 = document.getElementById("gifsTende01")
    let paraElHTML = unGif




    LOSGIFS01.innerHTML = paraElHTML
    /*console.log(json.data[0].images.fixed_width.url)
    const LOSGIFS = document.getElementById("gifsTende")
    let paraElHTML = ""

    json.data.forEach((obj) => {
        console.log(obj.images.fixed_width.url);
        const elGif = obj.images.fixed_width.url
        const elAlt = obj.title
        paraElHTML += `<img src="${elGif}" alt="gif" width="280px" height="280" alt="${elAlt}">`
    })


    LOSGIFS.innerHTML = paraElHTML*/
})
.catch((err) => {
    console.log(err.message);
})




/*
? --> starts the earch
& add another parameter
q=




fetch("api.giphy.com/v1/gifs/random")
.then(res => res.json())
.then(data => console.log(data))*/