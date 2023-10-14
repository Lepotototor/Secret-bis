const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Endpoint pour ajouter un don
app.post('/ajouter-don', (req, res) => {
    const nouveauDon = req.body.montant;

    // Écrire le don dans un fichier (par exemple, dons.json)
    const dons = JSON.parse(fs.readFileSync('dons.json', 'utf8'));
    dons.push(nouveauDon);
    fs.writeFileSync('dons.json', JSON.stringify(dons));

    res.json({ message: 'Don ajouté avec succès' });
});

// Endpoint pour récupérer les dons
app.get('/recuperer-dons', (req, res) => {
    // Récupérer les dons depuis le fichier
    const dons = JSON.parse(fs.readFileSync('dons.json', 'utf8'));
    res.json(dons);
});

app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});

