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

// Eksempel på en rute som henter alle fjell, beskrivelse, høydene og bilde deres
app.get('/api/typeliste', (req, res) => {
    const rows = db.prepare('SELECT liste.type, bruker.fornavn FROM liste INNER JOIN bruker ON liste.brukerid = bruker.brukerid').all();
    res.json(rows);
});

// Åpner en viss port på serveren, og starter serveren
app.listen(PORT, () => {
    console.log(`Server kjører på http://localhost:${PORT}`);
});