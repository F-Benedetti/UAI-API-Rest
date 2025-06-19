const mostrarApi = document.getElementById("mostrar-Api");
const btnPersonajes = document.getElementById("personajes");

async function extraerDatos() {
    try {
        const url = "https://rickandmortyapi.com/api/character";
        const response = await fetch(url);
        //const prueba = JSON.stringify
        let objetoApi = await response.json();

        const personajes = objetoApi.results.map(personaje => ({
            nombre: personaje.name
        }));


        mostrarApi.innerHTML = personajes.map(pjs => `<Br>${pjs.nombre}<\Br>`).join('');
    }
    catch(error){
        mostrarApi.textContent = "Error al extrer la API";
    }
}
extraerDatos();


btnPersonajes.addEventListener("click",function(){
    mostrarApi.innerHTML = "<h1> Toma por curioso <\h1>";
})

function filtrarPersonajes(objeto){

}