// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, onSnapshot } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCgFisSOeKTKEC5PXEkbsZJUG2h7LWUYk",
  authDomain: "secret-bis.firebaseapp.com",
  projectId: "secret-bis",
  storageBucket: "secret-bis.appspot.com",
  messagingSenderId: "835856342517",
  appId: "1:835856342517:web:99d8d62478e73e8013d4bc"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Initialisez la base de données Firestore
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
    const donForm = document.getElementById('donForm');
    const montantInput = document.getElementById('montant');
    const donsList = document.getElementById('donsList');
    const totalDonsElement = document.getElementById('totalDons');

    donForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const montant = parseFloat(montantInput.value);
        if (!isNaN(montant)) {
            // Stockez le don dans Firebase Firestore
            db.collection("dons").add({
                montant: montant
            })
            .then(() => {
                // Mettez à jour l'affichage des dons après le stockage
                mettreAJourAffichageDons();
            })
            .catch(error => {
                console.error('Erreur lors du stockage du don : ', error);
            });
        }
    });

    function mettreAJourAffichageDons() {
        // Récupérez les dons depuis Firebase Firestore en temps réel
        db.collection("dons").onSnapshot((querySnapshot) => {
            const dons = [];
            querySnapshot.forEach((doc) => {
                dons.push(doc.data().montant);
            });
            donsList.innerHTML = `<p>Montants des dons précédents : ${dons.join(', ')} €</p>`;
            const totalDons = dons.reduce((total, don) => total + don, 0);
            totalDonsElement.textContent = `Total des dons : ${totalDons} €`;
        });
    }

    // Appel initial pour afficher les dons au chargement de la page
    mettreAJourAffichageDons();
});
