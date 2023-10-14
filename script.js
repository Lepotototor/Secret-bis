// Récupération du formulaire et des éléments nécessaires
const donForm = document.getElementById('donForm');
const montantInput = document.getElementById('montant');
const donsList = document.getElementById('donsList');
const totalDonsElement = document.getElementById('totalDons');

// Chargement des dons depuis le stockage local
let dons = JSON.parse(localStorage.getItem('dons')) || [];

// Fonction pour mettre à jour l'affichage des dons
function mettreAJourAffichageDons() {
    donsList.innerHTML = `<p>Montants des dons précédents : ${dons.join(', ')} €</p>`;

    // Calculer et afficher le total des dons
    const totalDons = dons.reduce((total, don) => total + don, 0);
    totalDonsElement.textContent = `Total des dons : ${totalDons} €`;

    // Sauvegarde des dons dans le stockage local
    localStorage.setItem('dons', JSON.stringify(dons));
}

// Gestionnaire d'événement lorsque le formulaire est soumis
donForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Récupérer le montant du don depuis le champ d'entrée
    const montant = parseFloat(montantInput.value);

    if (!isNaN(montant)) {
        // Ajouter le montant au tableau des dons
        dons.push(montant);

        // Mettre à jour l'affichage des dons
        mettreAJourAffichageDons();

        // Effacer le champ d'entrée
        montantInput.value = '';
    }
});

// Appel initial pour afficher les dons au chargement de la page
mettreAJourAffichageDons();

