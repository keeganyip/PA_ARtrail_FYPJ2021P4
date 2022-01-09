

var watchID,geoLoc,target,travelMode,directionsService,directionRenderer;
var flag = true;
var centered = false;
var completeButtonFlag = false;
var gMarkers = []
var target = {latitude:1.379155,longitude:103.849828};
if (localStorage.getItem('landmarkIndex')){ 
    var landmarkIndex=parseInt(localStorage.getItem('landmarkIndex')); 
    
} else{ 
    var landmarkIndex = 0
}

// All of Chinatown's landmarks
const nyp = trails.nyp.landmarks
const Chinatown = trails.chinatown.landmarks ; 

function getLocationUpdate(){
    directionsService = new google.maps.DirectionsService();
    directionRenderer = new google.maps.DirectionsRenderer({preserveViewport:true});

    if (navigator.geolocation){
        geoLoc = navigator.geolocation
        // Get current positon 
        var options = {
            enableHighAccuracy: true,
            maximumAge: 0
        };
        geoLoc.getCurrentPosition(currentPositionSuccess,currentPositionError,options)
        
            // timeout  in 60 seconds
        var options = {timeout:60000};
        
        // Watch position 
        watchID = geoLoc.watchPosition(success,errorHandler,options)
    } else{
        alert("Browser does not support geolocation!")
    }
}

function makeMarker( position, icon, title ) {
    marker = new google.maps.Marker({
     position: position,
     label:{
         color:'black',
         fontWeight:'bold',
         text:title
     },
     map: map,
     icon: icon,
     title: title
    });
    return marker
}

function makeIncrementalMarker(position,i,title,content){
    i++
    const infowindow = new google.maps.InfoWindow({content: content,});
    marker = new google.maps.Marker({
        position: position,
        map: map,
        icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + i + '|33cc33|000000',
        title: title
    });
    marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          map,
          shouldFocus: false,
        });
    });
    return marker
}

function makeStartMarker( position,direction) {
    
    var heading = google.maps.geometry.spherical.computeHeading(direction,position);
    var line=new google.maps.Polyline({
        clickable:false,
        map:map,strokeOpacity:0,
        path:[position,direction],
        icons:[{offset:'0%' ,
        icon:{
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            scale:7,
            strokeOpacity:1  
            }
        }]
    })
    return line
}

function removeMarkers (){
    for(i=0; i<gMarkers.length; i++){
        gMarkers[i].setMap(null);
    }
}

function smoothZoom (map, max, cnt) {
    if (cnt >= max) {
        return;
    }
    else {
        z = google.maps.event.addListener(map, 'zoom_changed', function(event){
            google.maps.event.removeListener(z);
            smoothZoom(map, max, cnt + 1);
        });
        setTimeout(function(){map.setZoom(cnt)}, 80); // 80ms is what I found to work well on my system -- it might not work well on all systems
    }
}

function makeLandmarkMarkers(trail){
    removeMarkers()
    // See overview of all landmarks
    for (let i = 0; i < trail.length; i++){
        landmark = trail[i]
        marker = makeIncrementalMarker(landmark.location,i,landmark.name,landmark.contentHTML) //position, i
        gMarkers.push(marker);
    }
    smoothZoom(window.map,19,window.map.getZoom())
    window.map.setCenter(trails.chinatown.location)
}

var rad = function(x) {
    return x * Math.PI / 180;
};

function getDistance(mk1){
    var R = 6378137; // Radius of the Earth in miles
    var mk2 = {lat: 1.2827156284699024 ,lng:103.84397634403197 }
    var rlat1 = mk1.lat * (Math.PI/180); // Convert degrees to radians
    var rlat2 = mk2.lat * (Math.PI/180); // Convert degrees to radians
    var difflat = rlat2-rlat1; // Radian difference (latitudes)
    var difflon = (mk2.lng-mk1.lng) * (Math.PI/180); // Radian difference (longitudes)
    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    return d;
}



function recenterLogic(origin){
    map = window.map
    map.addListener("drag",()=>{
        centered= false
    })
    
    document.getElementById("recenter").addEventListener("click", () => {
        centered = true
        map.setCenter(origin)
        map.setZoom(18);
    })
    if (centered){
        map.setCenter(origin)
        map.setZoom(18);    
    }
}

function displayRoute(latlng,destination,travelMode){
    removeMarkers()
    directionsService.route({
        origin : latlng,
        destination : destination,   
        travelMode: google.maps.TravelMode[travelMode]
    }) .then((response)=>{
        directionRenderer.setDirections(response);
        const route = response.routes[0];
        var leg = route.legs[0]
        // instructions = leg["steps"][0].instructions + " "+ leg["steps"][0].distance.text + "  "+leg["steps"][0].duration.text
        instructions = ""
        document.getElementById("instructions").innerHTML = instructions
        gMarker = makeStartMarker(leg.start_location, leg.end_location)
        gMarkers.push(gMarker)  
    })  
}

var localStorage= window.localStorage 
if (localStorage.getItem('landmarkIndex')){ 
    var landmarkIndex=parseInt(localStorage.getItem('landmarkIndex')); 
} else{ 
    localStorage.setItem('landmarkIndex',0); 
    var landmarkIndex = 0
}


// getting places from REST APIs
function loadPlaceFromAPIs(position) {
    const params = {
        radius: 300,    // search places not farther than this value (in meters)
        clientId: 'CRDMPAGPE4KCZOMKKCLKKSJOKUKJZVE54LUROL2GLDS3UMTA',
        clientSecret: 'TCWSXDU33J30GFTTPDRVL4SXMGMT3ON0ZWZVXWQPPINDMMWD',
        version: '20300101',    // foursquare versioning, required but unuseful for this demo
    };

    // CORS Proxy to avoid CORS problems
    const corsProxy = 'https://cors-anywhere.herokuapp.com/';

    // Foursquare API
    const endpoint = `${corsProxy}https://api.foursquare.com/v2/venues/search?intent=checkin
        &ll=${position.latitude},${position.longitude}
        &radius=${params.radius}
        &client_id=${params.clientId}
        &client_secret=${params.clientSecret}
        &limit=15
        &v=${params.version}`;
    return fetch(endpoint)
        .then((res) => {
            return res.json()
                .then((resp) => {
                    return resp.response.venues;
                })
        })
        .catch((err) => {
            console.error('Error with places API', err);
        })
};


window.onload = () => {
    const scene = document.querySelector('a-scene');

    // first get current user location
    return navigator.geolocation.getCurrentPosition(function (position) {

        // then use it to load from remote APIs some places nearby


                Chinatown.forEach((place) => {
                    const latitude = place.location.lat;
                    const longitude = place.location.lng;
                    const content = place.content; 
                    const src = place.src;

                    // add place icon
                    const icon = document.createElement('a-image');
                    const text = document.createElement('a-text');
                    // text.setAttribute("name",place.name);
                    text.setAttribute("scale","20 20 20");
                    icon.setAttribute("scale",'40 40 40');
                    text.setAttribute("align","center");
                    text.setAttribute("baseline","top");
                    text.setAttribute("look-at",'[gps-camera]');
                    icon.setAttribute("look-at","[gps-camera]");
                    text.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude}`);
                    icon.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude}`);
                    text.setAttribute('value', place.name);
                    icon.setAttribute('src', './Trails/assets/map-marker.png');
                    icon.setAttribute('material','opacity:0.5;');
                    

                    // for debug purposes, just show in a bigger scale, otherwise I have to personally go on places...
                    // icon.setAttribute('scale', '120 120 120');
                    // icon.setAttribute('look-at','[gps-camera]');

                    text.addEventListener('loaded', () => window.dispatchEvent(new CustomEvent('gps-entity-place-loaded')));


                    // distanceMsg = setTimeout(function(){icon.getAttribute('distance');},5000);
                    // console.log(distanceMsg);



                    const clickListener = function(ev) {
                        ev.stopPropagation();
                        ev.preventDefault();

                        const name = ev.target.getAttribute('name');

                        const el = ev.detail.intersection && ev.detail.intersection.object.el;

                        if (el && el === ev.target) {
                            const label = document.createElement('span');
                            const container = document.createElement('div');
                            const para = document.createElement('p');
                            const butt = document.createElement('a');
                            const image = document.createElement('img'); 
                            image.setAttribute("style","width:0.8cm;height0.8cm;opacity:0.95;margin-right:10px;");                      
                            image.setAttribute("src","./Trails/assets/125-1258034_free-download-and-vector-speaker-icon-animated-gif-removebg-preview.png");
                            image.onclick = function(){
                                let utterance = new SpeechSynthesisUtterance(extraContent);
                                speechSynthesis.speak(utterance);
                            }                            
                            butt.setAttribute('class','button');
                            butt.setAttribute('href',src);
                            butt.setAttribute('style','border-radius:4px;background-color:#555555;text-color:#808080');                            
                            container.setAttribute('id', 'place-label');
                            label.innerText = place.name;
                            para.innerText = place.content;
                            extraContent= place.extraContent;
                            butt.innerText = "More Info";
                            container.appendChild(label);
                            label.appendChild(para);
                            label.appendChild(image);
                              
                            label.appendChild(butt);
                                                        
                            document.body.appendChild(container); 
                            image.addEventListener('click',textSPeech);                           
                            setTimeout(() => {
                                container.parentElement.removeChild(container);
                            }, 3500);
                        }
                    };
                    
                    icon.addEventListener('click', clickListener);
                    scene.appendChild(icon);
                    scene.appendChild(text);
                });
            
    },
        (err) => console.error('Error in retrieving position', err),
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 30000,
        }
    );
};

//code for the text to speech
function textSPeech(){
    console.log("hello world");
}


//code for the drop down menu
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  } 

$('#dialog').dialog({
height: "auto",
width: 400,
autoOpen: false,
modal:true,
buttons:[
        {
        text:"Ok" ,
        id:"Ok",
        click: function (){
            $(this).dialog("close")
        }
    }
]
})

function currentPositionSuccess(position){
    // Icons
    var icons = {
        marker:{
            labelOrigin:new google.maps.Point(11, -12),
            url : "https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_red.png",
            size: new google.maps.Size(22, 40),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(11, 40),
        }
    };
    origin = {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
    }
    console.log("ORIGIN",origin);
    window.map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: {lat: position.coords.latitude, lng:position.coords.longitude},
        zoomControl: false,
        disableDefaultUI: true,
        keyboardShortcuts: false,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        },
        styles: [
            {
                featureType: "poi",
                elementType: "labels",
                stylers: [
                      { visibility: "off" }
                ]
            },
            {
                featureType: "transit",
                elementType: "labels.icon",
                stylers: [{ visibility: "off" }],
              },
        ],
    });
    
    var backbtn = document.getElementById('back');
    google.maps.event.addListener(map, "click", function(event) {
        
        var mapdiv = document.getElementById('map');
        console.log("CLICKED",mapdiv);
        mapdiv.style.position = 'revert';
        mapdiv.style.height = '100%';
        mapdiv.style.width = '100%';
        window.map.controls[google.maps.ControlPosition.LEFT_TOP].push(backbtn);
        backbtn.onclick = function(){
            mapdiv.style.position = 'absolute';
            mapdiv.style.height = '20%';
            mapdiv.style.width = '40%';
            window.map.controls[google.maps.ControlPosition.LEFT_TOP].pop();
        }
    });
    // Set start button into the map also
    // var recetnerBtn = document.getElementById("recenter");
    // window.map.controls[google.maps.ControlPosition.TOP].push(recetnerBtn);
}

function success(position) {
    origin = {lat : position.coords.latitude , lng : position.coords.longitude}
    recenterLogic(origin)
    const map = window.map
    
    directionRenderer.setMap(map);
    icon = document.querySelector("a-image");
    distanceMsg = icon.getAttribute('distance')
    console.log(distanceMsg);

    if(distanceMsg  < 80){
        icon.setAttribute("src","./Trails/assets/map-marker-removebg-preview.png");
    }
    console.log("TRAIL:",Chinatown)
    console.log(flag);
    var queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    if(queryString == 'CHC'){
        destination = Chinatown[0].location;
    }
    if (flag){
        flag=false
        directionRenderer.set('directions', null)
        console.log("ROUTING");
        displayRoute(origin,destination,"WALKING")
    }
        
}
    function errorHandler(err) {
    if(err.code == 1) {
        alert("Error: Access is denied!");
    } else if( err.code == 2) {
        alert("Error: Position is unavailable!");
    }
    }


function currentPositionError(err){
    console.warn(`ERROR(${err.code}): ${err.message}`);
}