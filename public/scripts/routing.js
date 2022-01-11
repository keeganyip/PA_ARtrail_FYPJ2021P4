// import { Modal } from 'assets/scri'
let popup, Popup;
var watchID, geoLoc, target, travelMode, directionsService, directionRenderer;
var flag = false;
var notAtTrail = true
var centered = false;
var completeButtonFlag = false;
var getRouteButtonFlag = false;
var gMarkers = []
var markers = {};
var NYPStart = {
    latitude: 1.379155,
    longitude: 103.849828
};

var chinatownstart = {

    latitude: 1.2826330692039218,
    longitude: 103.84501595442900
};
var landmarkIndex = 0
var trail = ""
var localStorage = window.localStorage
var distance = 0


if (localStorage.getItem('NYP Progress')) { // Progress exists
    var NYPPROGRESS = localStorage.getItem('NYP Progress');
    NYPPROGRESS = JSON.parse(NYPPROGRESS);

} else {
    var progress = JSON.stringify([0, 0, 0, 0, 0, 0, 0, 0])
    console.log("PROGRESSS", progress);
    localStorage.setItem('NYP Progress', progress);
}

//
function start() {
    if (navigator.geolocation) {
        geoLoc = navigator.geolocation
        // Get current positon 
        var options = {
            enableHighAccuracy: true,
            maximumAge: 0
        };


        geoLoc.getCurrentPosition(startingTrail, currentPositionError, options)

        // timeout  in 60 seconds
        var options = {
            timeout: 60000
        };

        // Watch position 
        watchID = geoLoc.watchPosition(success, errorHandler, options)
    } else {
        alert("Browser does not support geolocation!")
    }
}

// function checkDistance(evt) {
//     origin = evt.currentTarget.origin
//     if (trail == "China Town") {
//         trail = trails.chinatown
//     } else if (trail == "NYP") {
//         trail = trails.nyp
//     }
//     distance = getDistance(origin, trail.location)

//     // If not at trail yet
//     if (distance > 1600) {
//         flag = false
//         if (flag) {
//             directionRenderer.set('directions', null)
//             displayRoute(origin, Chinatown[0].location, travelMode)
//         }
//         flag = false
//         $("#dialog").dialog("open");
//         $('#Ok').click(function () {
//             flag = true
//             travelMode = $('#option').val();
//             displayRoute(origin, Chinatown[0].location, travelMode)
//             map.setCenter(origin)
//         })
//     }

//     // If at the trail already
//     else {
//         flag = false
//         if (flag) {
//             $("#fardialog").dialog("open");
//             $("#farOk").click(function () {
//                 window.location.href = "https://finalyearproject-631fc.web.app/headphone.html"

//             })
//         }
//         // Set get route button 
//         getRouteButtonFlag = true
//         flag = true
//         $("#fardialog").dialog("open");
//         $("#farOk").click(function () {
//             window.location.href = "https://finalyearproject-631fc.web.app/headphone.html"

//         })

//     }
// }
function getDistance(mk1, mk2) {
    var R = 6378137; // Radius of the Earth in miles
    var rlat1 = mk1.lat * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = mk2.lat * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (mk2.lng - mk1.lng) * (Math.PI / 180); // Radian difference (longitudes)
    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
    return d;
}

function checkDistanceFromTrail(origin, trail) {
    distance = getDistance(origin, trail)
    // $('#dialog').dialog({
    //     height: "auto",
    //     width: 400,
    //     dialogclass: 'modal',
    //     autoOpen: false,
    //     modal:true,
    //     buttons:[
    //             {
    //             text:"Ok" ,
    //             id:"Ok",
    //             click: function (){
    //                 $(this).dialog("close")
    //             }
    //         }
    //     ]
    //     })

    distance = 100;
    if (distance > 1600) {
        flag = false
        if (flag) {
            directionRenderer.set('directions', null)
            displayRoute(origin, Chinatown[0].location, travelMode)
        }
        flag = false
        console.log($("#dialog"))
        var myModal = new bootstrap.Modal(document.getElementById('dialog'))
        myModal.show();
        console.log($('#ok'));
        $('#ok').on('click', function () {
            window.location.href = 'overview.html'
        })
    }

    // If at the trail already
    else {
        // flag = false
        // if (flag) {
        //     $("#fardialog").dialog("open");
        //     $("#farOk").click(function () {
        //         window.location.href = "https://finalyearproject-631fc.web.app/headphone.html"

        //     })
        // }
        // // Set get route button 
        // getRouteButtonFlag = true
        // flag = true
        // $("#fardialog").dialog("open");
        // $("#farOk").click(function () {
        //     window.location.href = "https://finalyearproject-631fc.web.app/headphone.html"

        // })

    }
}

// class Popup extends google.maps.OverlayView {
//     position;
//     containerDiv;
//     constructor(position, content) {
//       super();
//       this.position = position;
//       content.classList.add("popup-bubble");

//       // This zero-height div is positioned at the bottom of the bubble.
//       const bubbleAnchor = document.createElement("div");

//       bubbleAnchor.classList.add("popup-bubble-anchor");
//       bubbleAnchor.appendChild(content);
//       // This zero-height div is positioned at the bottom of the tip.
//       this.containerDiv = document.createElement("div");
//       this.containerDiv.classList.add("popup-container");
//       this.containerDiv.appendChild(bubbleAnchor);
//       // Optionally stop clicks, etc., from bubbling up to the map.
//       Popup.preventMapHitsAndGesturesFrom(this.containerDiv);
//     }
//     /** Called when the popup is added to the map. */
//     onAdd() {
//       this.getPanes().floatPane.appendChild(this.containerDiv);
//     }
//     /** Called when the popup is removed from the map. */
//     onRemove() {
//       if (this.containerDiv.parentElement) {
//         this.containerDiv.parentElement.removeChild(this.containerDiv);
//       }
//     }
//     /** Called each frame when the popup needs to draw itself. */
//     draw() {
//       const divPosition = this.getProjection().fromLatLngToDivPixel(
//         this.position
//       );
//       // Hide the popup when it is far out of view.
//       const display =
//         Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000
//           ? "block"
//           : "none";

//       if (display === "block") {
//         this.containerDiv.style.left = divPosition.x + "px";
//         this.containerDiv.style.top = divPosition.y + "px";
//       }

//       if (this.containerDiv.style.display !== display) {
//         this.containerDiv.style.display = display;
//       }
//     }
//   }

//init Map based on trail
function startingTrail(position) {
    var queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    trail = queryString

    var icons = {
        marker: {
            labelOrigin: new google.maps.Point(11, -12),
            url: "https://i.ibb.co/MGJr4Mq/image-1.png",
            size: new google.maps.Size(34, 65),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(11, 40),
        },
        Completedmarker: {
            labelOrigin: new google.maps.Point(11, -12),
            url: "https://maps.google.com/mapfiles/kml/paddle/grn-circle.png",
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(11, 40),
        }
    };

    if (trail == 'ctTrail') {
        var startlat = chinatownstart["latitude"]
        var startlong = chinatownstart["longitude"]
        trail = 'chinatown';
    } else if (trail == 'NYP') {
        var startlat = NYPStart["latitude"]
        var startlong = NYPStart["longitude"]
        trail = 'nyp';
    } else {
        window.location.href = 'overview.html'
    }
    var origin = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    }
    // console.log(trails[trail])
    checkDistanceFromTrail(origin, trails[trail]['location'])
    window.map = new google.maps.Map(document.getElementById("map"), { //init Map
        zoom: 19,
        center: {

            lat: startlat,
            lng: startlong
        },
        zoomControl: false,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        },
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
    const map = window.map;

    var keys = Object.keys(trails);
    console.log(trails[trail], "TRAILS")
    var landmarks = trails[trail]['landmarks']
    var boundary = new google.maps.LatLngBounds();
    console.log(landmarks)
    for (i = 0; i < landmarks.length; i++) {
        var htmlObject = $(landmarks[i].contentHTML);
        boundary.extend(landmarks[i].location);
        if (NYPPROGRESS[i] == 1 && trail == 'nyp') {
            marker = makeCompletedMarker(landmarks[i].location, icons.Completedmarker, landmarks[i].name);
        } else {
            marker = makeMarker(landmarks[i].location, icons.marker, landmarks[i].name) //position, icon, title
            distance = Math.round(getDistance(origin, landmarks[i].location));
            console.log(origin, distance, "DISTANCE");
            htmlObject.find('h5').text(distance + 'm Away');
            console.log(htmlObject.html(), "HTML");
            marker.content = htmlObject.html();
        }
        console.log(marker);
        console.log(typeof (marker.content));
        // popup = new Popup(landmarks[i].location,landmarks[i].content)
        // marker.addListener('click',()=>{
        //     popup.setMap(map);
        // });

        var infowindow = new google.maps.InfoWindow();
        google.maps.event.addListener(marker, "click", (function (marker, i) {
                return function () {
                    closelastopen(infowindow);
                    infowindow.setContent(marker.content);
                    infowindow.open({
                        anchor: marker,
                        map,
                        shouldFocus: false,
                    });
                    lastopen = infowindow;
                    var location = position.longitude
                }
            })
            (marker, i));
        gMarkers.push(marker);
    }
    google.maps.event.addListener(map, "click", function (event) {
        infowindow.close();
    });
    window.map.fitBounds(boundary)



}

function closelastopen(iw) {
    iw.close();
}

function getMap() {

    console.log(map);
    return map;
}


function makeCompletedMarker(position, icon, title) {
    marker = new google.maps.Marker({

        position: position,
        label: {
            color: 'black',
            fontWeight: 'bold',
            text: title,
            fontSize: '25px',
        },
        map: map,
        icon: icon,
        title: title,
        opacity: 0.5,
    });

    return marker
}

//get current location
function getLocationUpdate() {
    directionsService = new google.maps.DirectionsService();
    directionRenderer = new google.maps.DirectionsRenderer({
        preserveViewport: true
    });

    if (navigator.geolocation) {
        geoLoc = navigator.geolocation
        // Get current positon 
        var options = {
            enableHighAccuracy: true,
            maximumAge: 0
        };


        geoLoc.getCurrentPosition(currentPositionSuccess, currentPositionError, options)

        // timeout  in 60 seconds
        var options = {
            timeout: 60000
        };

        // Watch position 
        watchID = geoLoc.watchPosition(success, errorHandler, options)
    } else {
        alert("Browser does not support geolocation!")
    }
}

function makeMarker(position, icon, title) {
    marker = new google.maps.Marker({

        position: position,
        label: {
            color: 'black',
            fontWeight: 'bold',
            text: title,
            fontSize: '25px',
        },
        map: map,
        icon: icon,
        title: title
    });

    return marker
}


function smoothZoom(map, max, cnt) {
    if (cnt >= max) {
        return;
    } else {
        z = google.maps.event.addListener(map, 'zoom_changed', function (event) {
            google.maps.event.removeListener(z);
            smoothZoom(map, max, cnt + 1);
        });
        setTimeout(function () {
            map.setZoom(cnt)
        }, 80); // 80ms is what I found to work well on my system -- it might not work well on all systems
    }
}


function makeLandmarkMarkers(trail) {
    removeMarkers()
    // See overview of all landmarks
    landmarks = trail.landmarks
    var keys = Object.keys(landmarks);
    for (let i = 0; i < keys.length; i++) {

        marker = makeIncrementalMarker(landmarks[keys[i]], i) //position, i
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    const infowindow = new google.maps.InfoWindow({
                        content: landmarks[i].contentHTML
                    });

                    infowindow.open({
                        anchor: marker,
                        map,
                        shouldFocus: false,
                    });
                }
            })
            (marker, i));
        gMarkers.push(marker);
    }

    window.map.setCenter(trail.location)
    smoothZoom(window.map, 18, window.map.getZoom())

}

function currentPositionSuccess(position) {
    // Icons
    var icons = {
        marker: {
            labelOrigin: new google.maps.Point(11, -12),
            url: "https://i.ibb.co/MGJr4Mq/image-1.png",
            size: new google.maps.Size(34, 65),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(11, 40),
        }
    };

    window.map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: {
            lat: 1.354887375010911,
            lng: 103.8252658350733
        },
        zoomControl: false,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        },
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

    // Resize stuff...
    google.maps.event.addDomListener(window, "resize", function () {
        var center = map.getCenter();
        google.maps.event.trigger(window.map, "resize");
        window.map.setCenter(center);
    })

    // // Make option markers with action
    // var optionDiv1 = createOptionDiv('China Town','chinaTownOption')
    // var optionDiv2 = createOptionDiv('Kampung Glam',"kampungGlamOption")
    // var optionDiv3  = createOptionDiv('Little India',"littleIndiaOption")
    // var optionDiv4 = createOptionDiv('Peranakan',"peranakanOption") 
    // var optionDiv5 = createOptionDiv('NYP','nypOption')
    //var sep = new separator();

    // var ddDivOptions = {
    //     items: [optionDiv1, optionDiv2,optionDiv3,optionDiv4,optionDiv5],
    //     id: "myddOptsDiv"        		
    // }

    // var dropDownDiv = new dropDownOptionsDiv(ddDivOptions);   
    // var dropDownOptions = {
    //     gmap: window.map,
    //     name: 'Choose Trail',
    //     id: 'ddControl',
    //     position: google.maps.ControlPosition.TOP,
    //     dropDown: dropDownDiv ,
    //     style: "font-size:370%;width:180px",
    // }
    // var dropDown1 = new dropDownControl(dropDownOptions); 

    // Set start button into the map also
    // var startBtn = document.getElementById("submit")
    var recetnerBtn = document.getElementById("recenter");
    // window.map.controls[google.maps.ControlPosition.TOP].push(dropDown1);
    // window.map.controls[google.maps.ControlPosition.TOP].push(startBtn);
    window.map.controls[google.maps.ControlPosition.TOP].push(recetnerBtn);

    var boundary = new google.maps.LatLngBounds();
    // Make Trail markers
    removeMarkers()

    var keys = Object.keys(trails);
    console.log(trails, "TRAILS")
    for (let i = 0; i < keys.length; i++) {
        boundary.extend(trails[keys[i]].location)
        marker = makeMarker(trails[keys[i]].location, icons.marker, trails[keys[i]].name) //position, icon, title
        google.maps.event.addListener(marker, 'click', function () {
            makeLandmarkMarkers(trails[keys[i]])
            dropDown = document.getElementById('Choose Trail')
            dropDown.innerHTML = (trails[keys[i]].name)
            trail = trails[keys[i]].name
            cancelBtn = makecancelButton()
            window.map.controls[google.maps.ControlPosition.TOP].push(cancelBtn);
            localStorage.setItem('trail', trails[keys[i]].name)
        });
        gMarkers.push(marker);

    }
    window.map.fitBounds(boundary)
}






//draw current location of user

function makeuserlocation(position, icon, title) {
    var id = 'user';
    var exist = markers[id];
    if (!exist) {
        marker = new google.maps.Marker({

            position: position,
            label: {
                color: 'black',
                fontWeight: 'bold',
                text: title,
                fontSize: '20px',
            },
            map: map,
            icon: icon,
            title: title,
            id: id,
        });
        markers[id] = marker;
    }
    else{
        exist.setMap(null);
        marker = new google.maps.Marker({

            position: position,
            label: {
                color: 'black',
                fontWeight: 'bold',
                text: title,
                fontSize: '20px',
            },
            map: map,
            icon: icon,
            title: title,
            id: 'user',
        });
        markers[id] = marker;
    }
    return marker
}

//when position changes
function success(position) {
    origin = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    }
    // recenterLogic(origin)
    const map = window.map;
    var icon = "assets/img/userLocation.png";
    makeuserlocation(origin, icon, "You Are Here");
    directionsService = new google.maps.DirectionsService();
    directionRenderer = new google.maps.DirectionsRenderer({
        preserveViewport: true
    });

    directionRenderer.setMap(map);
    // // Set complete button     
    // if (!getRouteButtonFlag) {
    //     getRouteButtonFlag = true
    //     document.getElementById("submit").origin = origin
    //     document.getElementById("submit").addEventListener("click", checkDistance)
    // }

    // distance = getDistance(origin,trail.location)

    // // If not at trail yet
    // if (distance>1600){
    //     flag = false
    //     if (flag){
    //         directionRenderer.set('directions', null)
    //         displayRoute(origin,Chinatown[0].location,travelMode)
    //     }
    //     document.getElementById("submit").removeEventListener('click',showFarDialogOnClick,false)
    //     document.getElementById("submit").addEventListener("click", showDialog)     
    //     }

    // // If at the trail already
    // else{
    //     flag = false
    //     if (flag){
    //         showFarDialog()
    //     } 

    //     if (!getRouteButtonFlag){
    //         // Set get route button 
    //         getRouteButtonFlag = true
    //         document.getElementById("submit").removeEventListener('click',showDialog,false)
    //         document.getElementById("submit").addEventListener("click", showFarDialogOnClick); 
    //     }
    // }
}




function errorHandler(err) {
    if (err.code == 1) {
        alert("Error: Access is denied!");

        // TODO: getLocationUpdate() to ask again or send back to home 
    } else if (err.code == 2) {
        alert("Error: Position is unavailable!");
    }
}

function currentPositionError(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}