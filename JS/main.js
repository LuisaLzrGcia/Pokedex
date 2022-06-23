document.addEventListener("DOMContentLoaded", function () {
    verPokemones()
    pokemonClic()
});

const pokemonClic = (pokemonSelect) => {
    // SE OBTIENEN LOS POKEMONES DE LA API CON JSON
    const pokemones = JSON.parse(poke_file)
    // SE OBTIENEN LOS RESULTADOS
    const pokemon = pokemones.result
    // SE CREA UN FOR PARA BUSCAR AL POKEMON SELECCIONADO
    for (let index = 0; index < pokemon.length; index++) {
        // HACE LA COMPARACION CON CADA POKEMON DE LA LISTA HASTA ENCONTRARLA
        if (pokemon[index].id == pokemonSelect) {
            // SE AJUSTA EL TAMAÑO DEL MODAL
            const sizeModal = document.getElementById("modalResults")
            sizeModal.classList.add("modal-lg")
            // SE OBTIENE EL ELEMENTO TITULO DEL MODAL POR ID
            const namePokemon = document.getElementById("exampleModalLabel")
            // SE LE ESCRIBE EL NOMBRE DEL POKEMON SELECCIONADO
            namePokemon.innerHTML = `${pokemon[index].ThumbnailAltText}`;
            // SE OBTIENE EL HTML CON EL TIPO DE POKEMON SELECCIONADO
            let typePokemon = htmlPokemon(pokemon[index].type)
            // SE OBTIENE EL HTML CON LAS DEBILIDADES DEL POKEMON SELECCIONADO
            let arrayWeaknessPokemon = lowerCase(pokemon[index].weakness)
            let weaknessPokemon = htmlPokemon(arrayWeaknessPokemon)
            // SE OBTIENE EL ELEMENTO CUERPO DEL MODAL POR ID
            const infoPokemon = document.getElementById("modal-body")
            // SE ESCRIBE EN EL MODAL LA ESTRUCTURA CON LA INFORMACION
            infoPokemon.innerHTML = `
            <div class="card">
                <div class="d-flex justify-content-between">
                    <div class="w-50 d-flex justify-content-center align-items-center">
                        <img class="w-75" src="${pokemon[index].ThumbnailImage}">
                    </div>
                    <div class="p-3 text-start w-50">
                        <h6><span class="pokemon-number">N° ${pokemon[index].number}</span></h6>
                        <h5 class="card-title">Nombre: <span class="pokemon-name ">${pokemon[index].ThumbnailAltText}</span></h5>
                        <table class="table my-3">
                            <thead>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">Peso</th>
                                    <td>${pokemon[index].weight} libras</td>
                                </tr>
                                <tr>
                                    <th scope="row">Estatura</th>
                                    <td>${pokemon[index].height} pies</td>
                                </tr>
                                <tr>
                                    <th scope="row">Habilidad</th>
                                    <td>${pokemon[index].abilities}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Mas detalles</th>
                                    <td><a href="https://www.pokemon.com/${pokemon[index].detailPageURL} target="blank">Clic aquí</a> </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="card-body d-flex p-0">
                            <div class="w-50 alert-success bg-white rounded m-1">
                                <div class="fw-bold fs-6 text-center">Tipo</div>
                                <div class="d-flex justify-content-center flex-wrap">${typePokemon}</div>
                            </div>
                            <divdiv class="w-50 alert-danger bg-white rounded m-1">
                                <div class="fw-bold fs-6 text-center">Debilidades</div>
                                <div class="d-flex justify-content-center flex-wrap">${weaknessPokemon}</div>
                            </div>
                        </div>
                </div>
            </div>
            `;
        }

    }
}

const verPokemones = () => {
    localStorage.setItem("todo", "si")
    // se obtienen los pokemones
    const pokemones = JSON.parse(poke_file)
    const pokemon = pokemones.result

    // se crea el html para cada pokemon
    const elementoPadre = document.getElementById("contenedorPokemones")
    let currentPokemon, totalPokemon = 0;
    let i = 0;
    do {
        currentPokemon = pokemon[i].id
        let imagePokemon = pokemon[i].ThumbnailImage
        let numberPokemon = pokemon[i].number
        let namePokemon = pokemon[i].ThumbnailAltText
        let typePokemon = pokemon[i].type

        let htmlTypePokemon = htmlPokemon(typePokemon)

        const elementoHijo = document.createElement("div")
        elementoHijo.innerHTML = `
            <div class="card my-3 bg-gris" style="width: 18rem;">
                <img src="${imagePokemon}">
                <div class="card-body">
                    <h6 ><span class="pokemon-number">N° ${numberPokemon}</span></h6>
                    <h5 class="card-title text-center"><span class="pokemon-name">${namePokemon}</span></h5>
                    <div class="typePokemon">
                        ${htmlTypePokemon}
                    </div>
                </div>
                <div class="d-flex justify-content-center p-1">
                    <button type="button" class="btn btn-outline-dark" onclick="pokemonClic(${currentPokemon})" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Info 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                    </svg>
                    </button>
                </div>
            </div>
            `;
        elementoPadre.appendChild(elementoHijo);
        while (currentPokemon == pokemon[i + 1].id) {
            i++;
        }
        i++;
        totalPokemon++;
    } while (totalPokemon < 80);
}

const verTodo = () => {
    const todo = localStorage.getItem("todo")
    if (todo != 'si') {
        verPokemones()
    }
}

const htmlPokemon = (typePokemon) => {
    let htmlTypePokemon = "";
    for (let index = 0; index < typePokemon.length; index++) {
        switch (typePokemon[index]) {
            case 'grass':
                htmlTypePokemon += '<span class="m-1 badge bg-planta">Planta</span>';
                break;
            case 'water':
                htmlTypePokemon += '<span class="m-1 badge bg-agua">Agua</span>';
                break;
            case 'bug':
                htmlTypePokemon += '<span class="m-1 badge bg-bicho">Bicho</span>';
                break;
            case 'dragon':
                htmlTypePokemon += '<span class="m-1 badge bg-dragon">Dragón</span>';
                break;
            case 'electric':
                htmlTypePokemon += '<span class="m-1 badge bg-electrico">Eléctrico</span>';
                break;
            case 'ghost':
                htmlTypePokemon += '<span class="m-1 badge bg-fantasma">Fantasma</span>';
                break;
            case 'fire':
                htmlTypePokemon += '<span class="m-1 badge bg-fuego">Fuego</span>';
                break;
            case 'fairy':
                htmlTypePokemon += '<span class="m-1 badge bg-hada">Hada</span>';
                break;
            case 'ice':
                htmlTypePokemon += '<span class="m-1 badge bg-hielo">Hielo</span>';
                break;
            case 'fighting':
                htmlTypePokemon += '<span class="m-1 badge bg-lucha">Lucha</span>';
                break;
            case 'normal':
                htmlTypePokemon += '<span class="m-1 badge bg-normal">Normal</span>';
                break;
            case 'psychic':
                htmlTypePokemon += '<span class="m-1 badge bg-psiquico">Psíquico</span>';
                break;
            case 'rock':
                htmlTypePokemon += '<span class="m-1 badge bg-roca">Roca</span>';
                break;
            case 'ground':
                htmlTypePokemon += '<span class="m-1 badge bg-tierra">Tierra</span>';
                break;
            case 'poison':
                htmlTypePokemon += '<span class="m-1 badge bg-veneno">Veneno</span>';
                break;
            case 'flying':
                htmlTypePokemon += '<span class="m-1 badge bg-volador">Volador</span>';
                break;
            case 'steel':
                htmlTypePokemon += '<span class="m-1 badge bg-acero">Acero</span>';
                break;
            case 'dark':
                htmlTypePokemon += '<span class="m-1 badge bg-oscuro">Oscuro</span>';
                break;
            default:
                break;
        }
    }
    return htmlTypePokemon
}

const lowerCase = (array) => {
    for (let index = 0; index < array.length; index++) {
        array[index] = array[index].toLowerCase();
    }
    return array;
}

const searchPokemon = () => {
    const select = document.getElementById("selectOption");
    const pokemonSearch = document.getElementById("pokemonSearch");
    if (pokemonSearch.value.trim() == "") {
        alert("Entrada vacía")
    } else {
        if (select.value == 1) {
            searchByName(pokemonSearch.value.trim())
        } else {
            searchByNumber(pokemonSearch.value.trim())
            
        }
    }
}

const searchByName = (namePokemon) => {
    // SE OBTIENEN LOS POKEMONES DE LA API CON JSON
    const pokemones = JSON.parse(poke_file)
    // SE OBTIENEN LOS RESULTADOS
    const pokemon = pokemones.result
    // VARIABLE EN CASO DE NO ENCONTRAR EL POKEMON
    let found = 0
    // SE CREA UN FOR PARA BUSCAR AL POKEMON SELECCIONADO
    for (let index = 0; index < pokemon.length; index++) {
        // HACE LA COMPARACION CON CADA POKEMON DE LA LISTA HASTA ENCONTRARLA
        let namePokemonLower = pokemon[index].ThumbnailAltText
        if (namePokemonLower.toLowerCase() === namePokemon.toLowerCase()) {
            resultsPokemon(index)
        }
    }

    if (found == 0) {
        noResults()
    }
}

const searchByNumber = (numberPokemon) => {
    // SE OBTIENEN LOS POKEMONES DE LA API CON JSON
    const pokemones = JSON.parse(poke_file)
    // SE OBTIENEN LOS RESULTADOS
    const pokemon = pokemones.result
    // VARIABLE EN CASO DE NO ENCONTRAR EL POKEMON
    let found = 0
    // SE CREA UN FOR PARA BUSCAR AL POKEMON SELECCIONADO
    for (let index = 0; index < pokemon.length; index++) {
        if (numberPokemon=== pokemon[index].id+"" || numberPokemon=== pokemon[index].number+"") {
            resultsPokemon(index)
        }
    }

    if (found == 0) {
        noResults()
    }
}

const resultsPokemon = (index) => {
    // SE OBTIENEN LOS POKEMONES DE LA API CON JSON
    const pokemones = JSON.parse(poke_file)
    // SE OBTIENEN LOS RESULTADOS
    const pokemon = pokemones.result
    // SE AJUSTA EL TAMAÑO DEL MODAL
    const sizeModal = document.getElementById("modalResults")
    sizeModal.classList.add("modal-lg")
    // SE OBTIENE EL ELEMENTO TITULO DEL MODAL POR ID
    const namePokemon = document.getElementById("exampleModalLabel")
    // SE LE ESCRIBE EL NOMBRE DEL POKEMON SELECCIONADO
    namePokemon.innerHTML = `Resultado encontrado`;
    // SE OBTIENE EL HTML CON EL TIPO DE POKEMON SELECCIONADO
    let typePokemon = htmlPokemon(pokemon[index].type)
    // SE OBTIENE EL HTML CON LAS DEBILIDADES DEL POKEMON SELECCIONADO
    let arrayWeaknessPokemon = lowerCase(pokemon[index].weakness)
    let weaknessPokemon = htmlPokemon(arrayWeaknessPokemon)
    // SE OBTIENE EL ELEMENTO CUERPO DEL MODAL POR ID
    const infoPokemon = document.getElementById("modal-body")
    // SE ESCRIBE EN EL MODAL LA ESTRUCTURA CON LA INFORMACION
    infoPokemon.innerHTML = `
    <div class="card">
        <div class="d-flex justify-content-between">
            <div class="w-50 d-flex justify-content-center align-items-center">
                <img class="w-75" src="${pokemon[index].ThumbnailImage}">
            </div>
            <div class="p-3 text-start w-50">
                <h6><span class="pokemon-number">N° ${pokemon[index].number}</span></h6>
                <h5 class="card-title">Nombre: <span class="pokemon-name ">${pokemon[index].ThumbnailAltText}</span></h5>
                <table class="table my-3">
                    <thead>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Peso</th>
                            <td>${pokemon[index].weight} libras</td>
                        </tr>
                        <tr>
                            <th scope="row">Estatura</th>
                            <td>${pokemon[index].height} pies</td>
                        </tr>
                        <tr>
                            <th scope="row">Habilidad</th>
                            <td>${pokemon[index].abilities}</td>
                        </tr>
                        <tr>
                            <th scope="row">Mas detalles</th>
                            <td><a href="https://www.pokemon.com/${pokemon[index].detailPageURL} target="blank">Clic aquí</a> </td>
                        </tr>
                    </tbody>
                </table>
                <div class="card-body d-flex p-0">
                    <div class="w-50 alert-success bg-white rounded m-1">
                        <div class="fw-bold fs-6 text-center">Tipo</div>
                        <div class="d-flex justify-content-center flex-wrap">${typePokemon}</div>
                    </div>
                    <divdiv class="w-50 alert-danger bg-white rounded m-1">
                        <div class="fw-bold fs-6 text-center">Debilidades</div>
                        <div class="d-flex justify-content-center flex-wrap">${weaknessPokemon}</div>
                    </div>
                </div>
        </div>
    </div>
    `;
    found++;
}

const noResults = () => {
    // SE AJUSTA EL TAMAÑO DEL MODAL
    const sizeModal = document.getElementById("modalResults")
    sizeModal.classList.remove("modal-lg")
    // SE OBTIENE EL ELEMENTO TITULO DEL MODAL POR ID
    const namePokemon = document.getElementById("exampleModalLabel")
    // SE LE ESCRIBE EL NOMBRE DEL POKEMON SELECCIONADO
    namePokemon.innerHTML = `ERROR`;
    // SE OBTIENE EL ELEMENTO CUERPO DEL MODAL POR ID
    const infoPokemon = document.getElementById("modal-body")
    // SE ESCRIBE EN EL MODAL LA ESTRUCTURA CON LA INFORMACION
    infoPokemon.innerHTML = `
    <div class="card">
        <div class="d-flex justify-content-center p-3 mb-0">
            <p class="m-0">Pokémon no encontrado. Intente de nuevo.</p>
        </div>
    </div>
    `;
}