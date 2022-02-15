const chinatown = {
    title: "Chinatown",
    latitude: 1.2826330692039218,
    longitude: 103.84501595442900,
    icon:'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
};
const KPGL = {
    title: "Kampong Glam",
    latitude: 1.3027969731961035, 
    longitude: 103.86064949592937,
    icon:'https://maps.google.com/mapfiles/ms/icons/purple-dot.png'
};
const LI = {
    title: "Little India",
    latitude: 1.3067645469152556,
    longitude:  103.85186092157653,
    icon:'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
};
const peranakan = {
    title: "Peranakan",
    latitude:1.3173633675325074, 
    longitude:103.90471137972536,
    icon:'https://maps.google.com/mapfiles/ms/icons/orange-dot.png'
}
const markers = [chinatown,KPGL,LI,peranakan]

function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(currentpos);
    } else {
        alert("Browser does not support geolocation!")
    }

}

function currentpos(pos) {

    const map = new google.maps.Map(document.getElementById("map"), { //init Map
        zoom: 19,
        center: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
        },
        zoomControl: false,
        disableDefaultUI: true,
        styles: [{
                featureType: "poi",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }]
            },
            {
                featureType: "transit",
                elementType: "labels.icon",
                stylers: [{
                    visibility: "off"
                }],
            },
        ],
    });
    const origin = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
    };
    setMarkers(map, origin);
}

function setMarkers(map, origin) {
    var icon = "assets/img/userLocation.png";

    makeuserlocation(origin, icon, "You are Here",map);
    var bounds = new google.maps.LatLngBounds();
    // Adds markers to the map.
    for (let i = 0; i < markers.length; i++) {
        const marker = markers[i];
        var mapmarker = new google.maps.Marker({
            position: {
                lat: marker.latitude,
                lng: marker.longitude
            },
            map,
            title:marker.title,
            label: {
                color: 'black',
                fontWeight: 'bold',
                text: marker.title,
                fontSize: '35px',
            },
            
            icon: {
                url:marker.icon,
                size: new google.maps.Size(48, 60),
                scaledSize: new google.maps.Size(48, 60),
            },
        });
        bounds.extend(mapmarker.position);
    }
    bounds.extend(origin)
    map.fitBounds(bounds);
}

function makeuserlocation(position, icon, title,map) {
    var id = 'user';
    var exist = markers[id];
    if (!exist) {
        console.log('here');
        marker = new google.maps.Marker({

            position: position,
            label: {
                color: 'black',
                fontWeight: 'bold',
                text: title,
                fontSize: '35px',
            },
            map: map,
            icon: icon,
            title: title,
            id: id,
            animation: google.maps.Animation.BOUNCE,
        });
        markers[id] = marker;
    } else {
        exist.setMap(null);
        marker = new google.maps.Marker({

            position: position,
            label: {
                color: 'black',
                fontWeight: 'bold',
                text: title,
                fontSize: '35px',
            },
            map: map,
            icon: icon,
            title: title,
            id: 'user',
            animation: google.maps.Animation.BOUNCE,
        });
        markers[id] = marker;
    }
    return marker
}