document.addEventListener('DOMContentLoaded', () => {
    const donForm = document.getElementById('donForm');
    const montantInput = document.getElementById('montant');
    const donsList = document.getElementById('donsList');
    const totalDonsElement = document.getElementById('totalDons');
    
    donForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const montant = parseFloat(montantInput.value);
        if (!isNaN(montant)) {
            // Effectuer une requête AJAX au serveur pour ajouter le don
            fetch('/ajouter-don', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ montant: montant })
            })
            .then(response => response.json())
            .then(data => {
                // Mettre à jour l'affichage des dons
                mettreAJourAffichageDons();
            })
            .catch(error => {
                console.error('Erreur lors de l\'ajout du don', error);
            });
        }
    });

    function mettreAJourAffichageDons() {
        // Effectuer une requête AJAX au serveur pour récupérer les dons
        fetch('/recuperer-dons')
        .then(response => response.json())
        .then(dons => {
            donsList.innerHTML = `<p>Montants des dons précédents : ${dons.join(', ')} €</p>`;
            const totalDons = dons.reduce((total, don) => total + don, 0);
            totalDonsElement.textContent = `Total des dons : ${totalDons} €`;
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des dons', error);
        });
    }
    
    // Appel initial pour afficher les dons au chargement de la page
    mettreAJourAffichageDons();
});

