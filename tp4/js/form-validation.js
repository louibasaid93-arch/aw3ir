// js/form-validation.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("myForm");
    const btnGeo = document.getElementById("btnGeo");

    // Validation du formulaire
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nom = document.getElementById("lastname").value.trim();
        const prenom = document.getElementById("firstname").value.trim();
        const dateNaissance = document.getElementById("birthday").value;
        const adresse = document.getElementById("address").value.trim();
        const email = document.getElementById("email").value.trim();

        if (nom.length < 5) return alert("Le nom doit contenir au moins 5 caractères.");
        if (prenom.length < 5) return alert("Le prénom doit contenir au moins 5 caractères.");
        if (adresse.length < 5) return alert("L'adresse doit contenir au moins 5 caractères.");
        if (new Date(dateNaissance) > new Date()) return alert("La date de naissance ne peut pas être dans le futur.");

        const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!mailRegex.test(email)) return alert("L'adresse email n'est pas valide.");

        alert("✅ Formulaire validé avec succès !");
    });

    // Bouton GPS : demande de géolocalisation
    btnGeo.addEventListener("click", () => {
        getLocation(); // fonction définie dans gps.js
    });
});
