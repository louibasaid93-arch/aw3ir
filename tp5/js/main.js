
var app;

window.onload = function () {
    app = new Vue({
        el: "#weatherApp",
        
        data: {
            // Indicateur de chargement de l'application
            loaded: false,
            
            // Variable du formulaire
            formCityName: "",
            
            // Messages
            message: "",
            messageForm: "",
            
            // Liste des villes (initialisée avec Paris)
            cityList: [
                {
                    name: "Paris",
                },
            ],
            
            // Données météo
            cityWeather: null,
            
            // Indicateur de chargement de la météo
            cityWeatherLoading: false,
        },
        
        // Exécuté au montage de l'application
        mounted: function () {
            this.loaded = true;
            this.readData();
        },
        
        // Méthodes de l'application
        methods: {
            readData: function () {
                console.log("Liste des villes:", JSON.stringify(this.cityList));
                console.log("Application chargée:", this.loaded);
            },
            
            // Ajouter une ville
            addCity: function (event) {
                event.preventDefault();
                
                console.log("Ville saisie:", this.formCityName);
                
                // Vérifier si la ville existe déjà
                if (this.isCityExist(this.formCityName)) {
                    this.messageForm = "Cette ville existe déjà dans la liste !";
                } else {
                    // Ajouter la ville à la liste
                    this.cityList.push({ name: this.formCityName });
                    
                    // Réinitialiser le formulaire
                    this.messageForm = "";
                    this.formCityName = "";
                }
            },
            
            // Vérifier si une ville existe déjà
            isCityExist: function (_cityName) {
                // filter retourne une liste avec les villes ayant le même nom
                if (
                    this.cityList.filter(
                        (item) => item.name.toUpperCase() === _cityName.toUpperCase()
                    ).length > 0
                ) {
                    return true;
                } else {
                    return false;
                }
            },
            
            // Supprimer une ville
            remove: function (_city) {
                // Retirer la ville de la liste
                this.cityList = this.cityList.filter(
                    (item) => item.name !== _city.name
                );
                
                // Si c'était la ville affichée, réinitialiser
                if (this.cityWeather && this.cityWeather.name === _city.name) {
                    this.cityWeather = null;
                }
            },
            
            // Récupérer la météo
            meteo: function (_city) {
                this.cityWeatherLoading = true;
                
                // ⚠️ REMPLACEZ 'VOTRE_APIKEY' par votre vraie clé API !
                var apiKey = 'a2ddeacce7280ea9ded5038e91719c30';
                var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + 
                          _city.name + 
                          '&units=metric&lang=fr&appid=' + apiKey;
                
                // Appel AJAX avec fetch
                fetch(url)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (json) {
                        app.cityWeatherLoading = false;
                        
                        // Vérifier le code de réponse
                        if (json.cod === 200) {
                            // Succès : stocker les données
                            app.cityWeather = json;
                            app.message = null;
                            console.log("Données météo:", json);
                        } else {
                            // Erreur : afficher un message
                            app.cityWeather = null;
                            app.message = 'Météo introuvable pour ' + 
                                         _city.name + 
                                         ' (' + json.message + ')';
                        }
                    })
                    .catch(function (error) {
                        app.cityWeatherLoading = false;
                        app.message = 'Erreur lors de la récupération de la météo : ' + error;
                        console.error('Erreur:', error);
                    });
            },
        },
        
        // Propriétés calculées
        computed: {
            // Heure de la météo
            cityWheaterDate: function () {
                if (this.cityWeather !== null) {
                    var date = new Date(this.cityWeather.dt * 1000);
                    var minutes = date.getMinutes() < 10 
                        ? "0" + date.getMinutes() 
                        : date.getMinutes();
                    return date.getHours() + ":" + minutes;
                } else {
                    return "";
                }
            },
            
            // Heure du lever du soleil
            cityWheaterSunrise: function () {
                if (this.cityWeather !== null) {
                    var date = new Date(this.cityWeather.sys.sunrise * 1000);
                    var minutes = date.getMinutes() < 10 
                        ? "0" + date.getMinutes() 
                        : date.getMinutes();
                    return date.getHours() + ":" + minutes;
                } else {
                    return "";
                }
            },
            
            // Heure du coucher du soleil
            cityWheaterSunset: function () {
                if (this.cityWeather !== null) {
                    var date = new Date(this.cityWeather.sys.sunset * 1000);
                    var minutes = date.getMinutes() < 10 
                        ? "0" + date.getMinutes() 
                        : date.getMinutes();
                    return date.getHours() + ":" + minutes;
                } else {
                    return "";
                }
            },
            
            // Zone de la carte OpenStreetMap
            openStreetMapArea: function () {
                if (this.cityWeather !== null) {
                    const zoom = 8;
                    const delta = 0.05 / Math.pow(2, zoom - 10);
                    
                    const bboxEdges = {
                        south: this.cityWeather.coord.lat - delta,
                        north: this.cityWeather.coord.lat + delta,
                        west: this.cityWeather.coord.lon - delta,
                        east: this.cityWeather.coord.lon + delta,
                    };
                    
                    return `${bboxEdges.west}%2C${bboxEdges.south}%2C${bboxEdges.east}%2C${bboxEdges.north}`;
                } else {
                    return "";
                }
            },
        },
    });
};