var regionDensity = [];
var mymap
$(document).ready(function () {
    
    mymap = L.map('mapid').setView([39.359785, -8.074951], 6);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(mymap);
    getUsersByDistrict()




    function getUsersByDistrict() {
        $.ajax({
            url: "/api/District",
            method: 'get',
            success: function (res, status) {

                for (i in res) {
                    regionDensity[i] = { name: res[i].Distrito, density: res[i].usersFromDistrict }
                }

                $.getJSON("Portugal.json", function (data) {
                    geojson = L.geoJson(data, { style: style, onEachFeature: onEachFeature }).addTo(mymap);
                });


            }, error: function (res) {
                alert(JSON.stringify(res));
            }

        })
    }

    var info = L.control({ position: 'topleft' });

    info.onAdd = function (mymap) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };

    info.update = function (props) {
        this._div.innerHTML = '<h4>Users by district</h4>' + (props ?
            '<b>' + props.name + '</b><br />' + props.density + ' users'
            : 'Hover over a district <br>or no users registered');

    };

    info.addTo(mymap);

    function getColor(name) {
        var d;
        if (typeof name === 'number') d = name;
        else {
            for (i in regionDensity) {
                if (name == regionDensity[i].name) d = regionDensity[i].density;
            }
        }
        return d > 10 ? '#E31A1C' :
            d > 8 ? '#FC4E2A' :
                d > 6 ? '#FD8D3C' :
                    d > 4 ? '#FEB24C' :
                        d > 2 ? '#FED976' :
                            '#FFEDA0';
    }
    function style(feature) {
        return {
            fillColor: getColor(feature.properties.name),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }

    function highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
        info.update(regionDensity[layer.feature.properties.id]);
    }
    function resetHighlight(e) {
        geojson.resetStyle(e.target);
        info.update();
    }

    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight
        });
    }

    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = function (mymap) {

        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 2, 4, 6, 8, 10],

            labels = [],
            from, to;

        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
        return div;
    };

    legend.addTo(mymap);




});