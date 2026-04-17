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
app.get('/api/listerbrukere', (req, res) => {
    const rows = db.prepare('SELECT liste.type, bruker.brukernavn FROM liste INNER JOIN bruker ON liste.brukernavn = bruker.brukernavn').all();
    res.json(rows);
});

// app.get('/api/liste/:brukernavn', (req, res) => {
//     const brukernavn = req.params.brukernavn;
//     if (!brukernavn) return res.status(400).json({ error: 'Mangler brukernavn' });

//     const rows = db.prepare('SELECT fjell.fjellnavn FROM fjelltur INNER JOIN fjell ON fjelltur.fjell_id = fjell.fjell_id WHERE fjelltur.brukernavn = ?').all(brukernavn);

//     res.json(rows);
// });


// Åpner en viss port på serveren, og starter serveren
app.listen(PORT, () => {
    console.log(`Server kjører på http://localhost:${PORT}`);
});