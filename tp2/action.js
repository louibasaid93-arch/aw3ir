
window.onload = () => {
    // Récupérer les données envoyées par le formulaire
    const paramsString = document.location.search;
    const searchParams = new URLSearchParams(paramsString);

    console.log("Paramètres reçus :", paramsString);

    // Boucler sur tous les paramètres de l'URL
    for (const param of searchParams) {
        console.log("Paramètre :", param);

        const elementId = param[0];
        const elementValue = param[1];
        const element = document.getElementById(elementId);

        if (element !== null) {
            element.textContent = elementValue;
            
            // Traitement spécial pour l'adresse
            if (elementId === "address") {
                element.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(elementValue)}`;
            } 
            // Traitement spécial pour l'email
            else if (elementId === "email") {
                element.href = `mailto:${elementValue}?subject=Hello!&body=What's up?`;
            }
        }
    }

    // Formatage spécial pour la date de naissance
    const birthdateElement = document.getElementById('birthdate');
    if (birthdateElement && birthdateElement.textContent) {
        const birthdate = new Date(birthdateElement.textContent);
        if (!isNaN(birthdate)) {
            birthdateElement.textContent = birthdate.toLocaleDateString('fr-FR');
        }
    }
};