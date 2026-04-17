const utskrift = document.getElementById("ut");
const brukerdropdown = document.getElementById("bruker");

async function hentBruker() {
    const response = await fetch("/api/listerbrukere");
    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
        const option = document.createElement("option");
        option.value = data[i].brukernavn;
        option.innerText = data[i].brukernavn;
        brukerdropdown.appendChild(option);
    }
}

document.addEventListener("DOMContentLoaded", hentBruker);

