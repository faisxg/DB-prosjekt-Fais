const utskrift = document.getElementById("ut");
const brukerdropdown = document.getElementById("bruker");

async function hentBruker() {
    const response = await fetch("/api/brukere");
    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
        const option = document.createElement("option");
        option.value = data[i].brukernavn;
        option.innerText = data[i].brukernavn;
        brukerdropdown.appendChild(option);
    }
}

document.addEventListener("DOMContentLoaded", hentBruker);

document.getElementById("bruker").addEventListener("change", async function () {
    const brukernavn = this.value
    
    if (brukernavn) {
        const response = await fetch(`http://localhost:3000/api/liste/${encodeURIComponent(brukernavn)}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();

        utskrift.innerHTML = `<h2>Listene til ${data[0].fornavn} ${data[0].etternavn}:</h2>`;

        // 1. Finner alle listenavn 
        const unikeLister = [...new Set(data.map(item => item.listenavn))];

        // 2. Loop gjennom hvert unike listenavn
        unikeLister.forEach(navn => {
            
            // Filtrer ut elementene som tilhører AKKURAT denne listen
            const listeInnhold = data.filter(item => item.listenavn === navn);

            // Lag overskrift (Henter typen fra det første elementet i denne spesifikke listen, vil være det samme utover alle elementene)
            const h3 = document.createElement("h3");
            const kategori = listeInnhold[0].type; 
            
            // Fristdatoer som bare skal vises dersom listen er av kategort "Shoplist"
            if (kategori == "Shoplist") {
                h3.textContent = `${navn} (type: ${kategori}) Fristdato: ${data[0].fristdato}`;
            }
            else {
                h3.textContent = `${navn} (type: ${kategori})`
            }
            
            utskrift.appendChild(h3);

            const ul = document.createElement("ul");

            // Legg til elementene som hører til denne navngitte listen
            listeInnhold.forEach(item => {
                const li = document.createElement("li");
                li.textContent = item.innhold;
                ul.appendChild(li);
            });

            utskrift.appendChild(ul);
        });
    }
    else {
        utskrift.innerHTML = "";
    }
})