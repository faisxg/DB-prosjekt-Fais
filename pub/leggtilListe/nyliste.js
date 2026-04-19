// Henter brukerdata for dropdownen
async function hentBruker() {
    const res = await fetch("/api/brukere");
    const data = await res.json();

    for (let i = 0; i < data.length; i++) {
        const brukere_dropdown = document.createElement("option");
        brukere_dropdown.value = data[i].brukernavn;
        brukere_dropdown.innerText = data[i].brukernavn;
        document.getElementById("brukerdropdown").appendChild(brukere_dropdown);
    }
}
document.addEventListener("DOMContentLoaded", hentBruker)

const forhandsvis = document.getElementById("listeforhandsvis") 
let elementArray = []

// Knapp som legger til det man skriver i inputten
document.getElementById("leggtil").addEventListener("click", function () {
    const innholdinput = document.getElementById("listeinnhold");
    let innhold = document.createElement("li");
    innhold.textContent = innholdinput.value;
    elementArray.push(innholdinput.value);
    forhandsvis.appendChild(innhold);

    console.log(elementArray)
})

// Tømmeknapp
document.getElementById("tom").addEventListener("click", function () {
    forhandsvis.innerHTML = "";
    elementArray = [];
})


document.getElementById("nyliste_form").addEventListener("submit", async function (event) {
    event.preventDefault();

    // Henter ut en array med liste-IDer, benytter meg av at liste-IDer i databasen må være unikt og er autoincrement. Gjør inkrementeringen selv her fordi den nye liste-IDen jeg får vil være viktig for når jeg skal inserte element i databasen.
    const res = await fetch("/api/liste_id");
    const data = await res.json();

    const bruker = document.getElementById("brukerdropdown").value;
    const type = document.getElementById("listetype").value;
    const listenavn = document.getElementById("listenavn").value;
    const ny_listeid = data.length + 1;

    const response = await fetch ("/api/ny_liste", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bruker, type, listenavn, elementArray, ny_listeid })
    });

    console.log(JSON.stringify({ bruker, type, listenavn, elementArray, ny_listeid }))
})