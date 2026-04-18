// Server-bit, setter opp en Express-app
const express = require('express');
const app = express();

const PORT = 3000;

// Databasen
const Database = require('better-sqlite3');
const db = new Database('listeapp.db');

// CORS-middleware for å tillate forespørsler fra andre domener
const cors = require('cors');
app.use(cors());

// Kobler sammen serveren med pub-mappen
app.use(express.static('pub'));

// Ruter:

// Rute for brukere
app.get('/api/brukere', (req, res) => {
    const rows = db.prepare('SELECT bruker.brukernavn FROM bruker').all();
    res.json(rows);
});

// Rute for listenavn, innhold, fornavn og etternavn til en bruker, fristdato for shoplister og type liste for listene til en viss bruker.
app.get('/api/liste/:brukernavn', (req, res) => {
    const brukernavn = req.params.brukernavn;
    if (!brukernavn) return res.status(400).json({ error: 'Mangler brukernavn' });

    const rows = db.prepare('SELECT liste.listenavn, element.innhold, bruker.fornavn, bruker.etternavn, liste.type, liste.fristdato FROM element JOIN liste ON element.listeid = liste.listeid JOIN bruker ON liste.brukernavn = bruker.brukernavn WHERE liste.brukernavn = ?').all(brukernavn);

    res.json(rows);
});


// Åpner en viss port på serveren, og starter serveren
app.listen(PORT, () => {
    console.log(`Server kjører på http://localhost:${PORT}`);
});