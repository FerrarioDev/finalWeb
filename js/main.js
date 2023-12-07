document.addEventListener("DOMContentLoaded", function () {
    cargarMenus();
});

function cargarMenus() {
    // Verificar si ya hay datos en localStorage
    const menusData = localStorage.getItem("menusData");

    if (!menusData) {
        // Si no hay datos, cargar desde el archivo JSON y guardar en localStorage
        fetch("js/menus.json")
            .then(response => response.json())
            .then(data => {
                localStorage.setItem("menusData", JSON.stringify(data));
                mostrarMenus(data);
            });
    } else {
        // Si hay datos, cargar desde localStorage
        const parsedData = JSON.parse(menusData);
        mostrarMenus(parsedData);
    }
}

function mostrarMenus(data) {
    const menuSelector = document.getElementById("menuSelector");

    // Recorrer los menús y agregar opciones al selector
    for (const menu in data) {
        const option = document.createElement("option");
        option.value = menu;
        option.textContent = menu;
        menuSelector.appendChild(option);
    }
}

function mostrarPlatos() {
    const menuSelector = document.getElementById("menuSelector");
    const selectedMenu = menuSelector.value;
    const menusData = JSON.parse(localStorage.getItem("menusData"));

    const platosContainer = document.getElementById("platosContainer");
    platosContainer.innerHTML = "";

    // Obtener platos del menú seleccionado
    const platos = menusData[selectedMenu];

    // Mostrar cada plato en una card más pequeña
    platos.forEach(plato => {

        const card = document.createElement("div");
        card.classList.add("card", "flex-row");
        card.style.paddingRight = "100%";
        card.style.marginBottom = "1rem";   // Alineación a la izquierda
        const img = document.createElement("img");
        img.src = plato.img;
        img.alt = plato.name;
        img.classList.add("card-img-left", "example-card-img-responsive",);
        img.style.maxWidth = "150px";
        img.style.marginBottom = "1rem";    

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        

        const title = document.createElement("h4");
        title.classList.add("card-title", "h5", "h4-sm");
        title.textContent = plato.name;

        const desc = document.createElement("p");
        desc.classList.add("card-text");
        desc.textContent = plato.desc;

        cardBody.appendChild(img);
        cardBody.appendChild(title);
        cardBody.appendChild(desc);

        card.appendChild(cardBody);

        platosContainer.appendChild(card);
    });
}

