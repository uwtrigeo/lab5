// Initialize map
var map = L.map('map').setView([47.25, -122.44], 11);

// Mapbox layer
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/navigation-night-v1',
    accessToken: 'pk.eyJ1IjoidHJpZ2VvIiwiYSI6ImNsOXlmZXlheTA0a3kzdmxuemE5MHVsMnQifQ.abEIHxGUIn-Yz1IwcRTT7Q',
}).addTo(map);

// Initialize routing plugin
var control = L.Routing.control({
    waypoints:[L.latLng(47.246587, -122.438830),
    L.latLng(47.318017, -122.542970)],
    units:'imperial',
    reverseWaypoints: true,
    collapsible: true,
    show: false,
    geocoder: L.Control.Geocoder.photon(),
    routeWhileDragging: true,
    router: L.Routing.mapbox('pk.eyJ1IjoidHJpZ2VvIiwiYSI6ImNsOXlmZXlheTA0a3kzdmxuemE5MHVsMnQifQ.abEIHxGUIn-Yz1IwcRTT7Q'),
}).addTo(map);

// Add waypoints by clicking on the map
function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}

map.on('click', function(e) {
    var container = L.DomUtil.create('div'),
        startBtn = createButton('Start from this location', container),
        destBtn = createButton('Go to this location', container);

    L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openOn(map);
        L.DomEvent.on(startBtn, 'click', function() {
            control.spliceWaypoints(0, 1, e.latlng);
            map.closePopup();
        });
        L.DomEvent.on(destBtn, 'click', function() {
            control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
            control.show();
            map.closePopup();
        });
 });

// Text box overlay TBD unable to get it to work https://stackoverflow.com/questions/33767463/overlaying-a-text-box-on-a-leaflet-js-map
L.Control.textbox = L.Control.extend({
    onAdd: function(map) {
        
    var text = L.DomUtil.create('div');
    text.id = "info_text";
    text.innerHTML = "<strong>text here</strong>"
    return text;
    },

    onRemove: function(map) {
        // Nothing to do here
    }
});
L.control.textbox = function(opts) { return new L.Control.textbox(opts);}
L.control.textbox({ position: 'bottomleft'}).addTo(map);