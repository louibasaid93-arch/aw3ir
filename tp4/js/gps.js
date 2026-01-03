
// js/gps.js

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    document.querySelector("#map").innerHTML =
      "La géolocalisation n'est pas supportée par ce navigateur.";
  }
}

function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  // Afficher la carte OpenStreetMap
  const zoom = 5;
  const delta = 0.05 / Math.pow(2, zoom - 10);

  const bboxEdges = {
    south: lat - delta,
    north: lat + delta,
    west: lon - delta,
    east: lon + delta,
  };

  const bbox = `${bboxEdges.west}%2C${bboxEdges.south}%2C${bboxEdges.east}%2C${bboxEdges.north}`;
  const iframeSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`;

  document.getElementById("map").innerHTML = `
    <iframe
      width="100%"
      height="200"
      frameborder="0"
      scrolling="no"
      src="${iframeSrc}">
    </iframe>
  `;

  // 🔹 Appel à l’API Nominatim pour obtenir l'adresse depuis les coordonnées
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data && data.display_name) {
        document.getElementById("address").value = data.display_name;
      } else {
        document.getElementById("address").value = "Adresse introuvable";
      }
    })
    .catch(error => {
      console.error("Erreur lors de la récupération de l'adresse :", error);
      document.getElementById("address").value = "Erreur de géocodage";
    });
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      document.querySelector("#map").innerHTML =
        "❌ L'utilisateur a refusé la demande de géolocalisation.";
      break;
    case error.POSITION_UNAVAILABLE:
      document.querySelector("#map").innerHTML =
        "❌ Les informations de localisation ne sont pas disponibles.";
      break;
    case error.TIMEOUT:
      document.querySelector("#map").innerHTML =
        "⚠️ La demande de localisation a expiré.";
      break;
    case error.UNKNOWN_ERROR:
      document.querySelector("#map").innerHTML =
        "⚠️ Une erreur inconnue est survenue.";
      break;
  }
}
