const urlApi = "https://rickandmortyapi.com/api/character/";
const filtroForm = document.getElementById("filtro-form");
const filterName = document.getElementById("name");
const filterStatus = document.getElementById("status");
const filterSpecies = document.getElementById("species");
const filterType = document.getElementById("type");
const filterGender = document.getElementById("gender");

const btnBuscar = document.getElementById("searchChar");

//Cargar filtros en base a los datos unicos de la API
async function inicializarFiltros() {
    const status = await obtenerValoresUnicosDeAPI("status",urlApi);
    const species = await obtenerValoresUnicosDeAPI("species",urlApi);
    const type = await obtenerValoresUnicosDeAPI("type",urlApi);
    const gender = await obtenerValoresUnicosDeAPI("gender",urlApi);
    cargarOpcionesSelect(filterStatus, status, "Status")
    cargarOpcionesSelect(filterSpecies, species, "Species");
    cargarOpcionesSelect(filterType, type, "Type");
    cargarOpcionesSelect(filterGender, gender, "Gender");
}
//Funcion que carga el array en base al campo y url de API
async function obtenerValoresUnicosDeAPI(campo, url) {
  const valores = new Set();

  try {
    while (url) {
      const res = await fetch(url);
      const data = await res.json();

      data.results.forEach(item => {
        const valor = item[campo];
        if (valor) {
          valores.add(valor.trim());
        }
      });

      url = data.info.next;
    }

    return [...valores].sort(); // devuelve array ordenado y sin duplicados
  } catch (error) {
    console.error(`Error al obtener ${campo}:`, error);
    return [];
  }
}

//Funcion de cargar las Opciones dentro del Select ()
function cargarOpcionesSelect(selectElement, opciones, placeholder) {
  selectElement.innerHTML = `
    <option value="">-- ${placeholder} --</option>
    ${opciones.map(op => `<option value="${op}">${op}</option>`).join("")}
  `;
}

inicializarFiltros();

//Funcion que contruye la URL en base a filtros (url, array[5] con sus filtros)
function construirURLConFiltros(baseURL, filtros) {
  const nombresFiltros = ["name", "status", "species", "type", "gender"];

  const queryParams = nombresFiltros
    .map((key, i) => filtros[i] ? `${key}=${encodeURIComponent(filtros[i])}` : null)
    .filter(Boolean)
    .join("&");

  return queryParams ? `${baseURL}?${queryParams}` : baseURL;
}


//console.log(construirURLConFiltros("https://rickandmortyapi.com/api/character/", ["rick", "alive", "", "", "male"]))


// Evento al enviar el formulario
filtroForm.addEventListener("submit", (e) => {
  e.preventDefault(); // evitar que recargue la página


  const filtros = [
    filterName.value,
    filterStatus.value,
    filterSpecies.value,
    filterType.value,
    filterGender.value
  ];

  const urlFinal = construirURLConFiltros(urlApi, filtros);
  //console.log("url generada:", urlFinal);
  mostrarPersonajesDesdeAPI(urlFinal);
});


//Funcion mostrar Personajes en base a la Url generada
async function mostrarPersonajesDesdeAPI(url) {
  const resultadosDiv = document.getElementById("resultados");
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      resultadosDiv.innerHTML = "<p>No se encontraron personajes.</p>";
      return;
    }

resultadosDiv.innerHTML = data.results.map(personaje => `
  <div class="personaje">
    <img src="${personaje.image}" alt="${personaje.name}" />
    <div class="personaje-info">
      <h3>${personaje.name}</h3>
      <p><strong>Status:</strong> ${personaje.status}</p>
      <p><strong>Species:</strong> ${personaje.species}</p>
      <p><strong>Type:</strong> ${personaje.type || "N/A"}</p>
      <p><strong>Gender:</strong> ${personaje.gender}</p>
    </div>
  </div>
`).join("");
  } catch (error) {
    resultadosDiv.innerHTML = "<p>Error al cargar los datos.</p>";
    console.error(error);
  }
}






























/*
async function extraerDatos() {
    try {
        const url = "https://rickandmortyapi.com/api/character";
        const response = await fetch(url);
        //const prueba = JSON.stringify
        let objetoApi = await response.json();

        const personajes = objetoApi.results.map(personaje => ({
            nombre: personaje.name,
            estado: personaje.status,
            especie: personaje.species,
            tipo: personaje.type,
            genero: personaje.gender,
            imagen: personaje.image
        }));


        mostrarApi.innerHTML = personajes.map(pjs => `<Br>${pjs.nombre}</Br> <img src="${pjs.imagen}"></img>`).join('');
    }
    catch(error){
        mostrarApi.textContent = "Error al extrer la API";
    }
}



btnPersonajes.addEventListener("click",function(){
    extraerDatos();
})

function filtrarPersonajes(objeto){

} */