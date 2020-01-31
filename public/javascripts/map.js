var map = L.map('map').setView([38.722252, -9.139337], 8);

var attribution = '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors';
var tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);

var userPos;
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}

function showPosition(position) {
    userPos = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map).bindPopup('Você está aqui!').openPopup();
    console.log(userPos);
    getRoute();
    
}


function getRoute() {
    try {
        L.Routing.control({
            waypoints: [
                L.latLng(userPos._latlng.lat, userPos._latlng.lng),
                L.latLng(38.709141, -9.153210)
            ]
           
        }).addTo(map);
    }
    catch (err) {
        if (err instanceof TypeError) {
            alert('Epa não te vejo')
        }
    }
}

