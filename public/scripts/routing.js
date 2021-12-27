var watchID,geoLoc,target,travelMode,directionsService,directionRenderer;
var flag = false; 
var notAtTrail = true
var centered = false;
var completeButtonFlag = false;
var getRouteButtonFlag = false;
var gMarkers = []
var target = {latitude:1.379155,longitude:103.849828};
var landmarkIndex = 0
var trail = ""
var localStorage= window.localStorage 
var distance = 0

if (localStorage.getItem('trail')){ 
    var trail=localStorage.getItem('trail'); 
} 


// All of Chinatown's landmarks
const Chinatown = trails.nyp.landmarks ; 

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

function makeIncrementalMarker(landmark,i){
    i++
    
    marker = new google.maps.Marker({
        position: landmark.location,
        map: map,
        icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + i + '|33cc33|000000',
        title: landmark.name
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
    
{
    
}

function makeLandmarkMarkers(trail){
    removeMarkers()
    // See overview of all landmarks
    landmarks = trail.landmarks
    var keys = Object.keys(landmarks);
    for (let i = 0; i < keys.length; i++){
        
        marker = makeIncrementalMarker(landmarks[keys[i]],i) //position, i
        google.maps.event.addListener(marker, 'click', (function (marker,i){
            return function(){
                const infowindow = new google.maps.InfoWindow({content: landmarks[i].contentHTML});
    
                infowindow.open({
                anchor: marker,
                map,
                shouldFocus: false,
                });
            }
        })
        (marker,i));
        gMarkers.push(marker);
    }

    window.map.setCenter(trail.location)
    smoothZoom(window.map,18,window.map.getZoom())
    
}

var rad = function(x) {
    return x * Math.PI / 180;
};

function getDistance(mk1,mk2){
    var R = 6378137; // Radius of the Earth in miles
    var rlat1 = mk1.lat * (Math.PI/180); // Convert degrees to radians
    var rlat2 = mk2.lat * (Math.PI/180); // Convert degrees to radians
    var difflat = rlat2-rlat1; // Radian difference (latitudes)
    var difflon = (mk2.lng-mk1.lng) * (Math.PI/180); // Radian difference (longitudes)
    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    return d;
}

function showFarDialog(){
    $( "#fardialog" ).dialog( "open" );
    $("#farOk").click(function(){
        window.location.href = "https://finalyearproject-631fc.web.app/headphone.html"
    })
}

function showFarDialogOnClick(){
    flag = true
    showFarDialog()
}

function checkDistance(evt){
    origin = evt.currentTarget.origin
    if(trail == "China Town"){
        trail =trails.chinatown
    } else if(trail =="NYP"){
        trail = trails.nyp
    }
    distance = getDistance(origin,trail.location)
    
    // If not at trail yet
    if (distance>1600){
        flag = false
        if (flag){
            directionRenderer.set('directions', null)
            displayRoute(origin,Chinatown[0].location,travelMode)
        }
        flag = false
        $( "#dialog" ).dialog( "open" );
        $('#Ok').click(function(){
            flag = true
            travelMode = $('#option').val();
            displayRoute(origin,Chinatown[0].location,travelMode)
            map.setCenter(origin)
        })
        }
        
        // If at the trail already
        else{
            flag = false
            if (flag){
                $( "#fardialog" ).dialog( "open" );
                $("#farOk").click(function(){
                    window.location.href = "https://finalyearproject-631fc.web.app/headphone.html"

                })
            } 
            // Set get route button 
            getRouteButtonFlag = true
            flag = true
            $( "#fardialog" ).dialog( "open" );
            $("#farOk").click(function(){
                window.location.href = "https://finalyearproject-631fc.web.app/headphone.html"

            })
            
        }
}

function showDialog() {
    flag = false
    $( "#dialog" ).dialog( "open" );
    $('#Ok').click(function(){
        flag = true
        travelMode = $('#option').val();
        displayRoute(origin,Chinatown[0].location,travelMode)
        map.setCenter(origin)
    })
}

function createOptionDiv(name,id){
    var optDiv = new optionDiv({
        gmap: map,
        name: name,
        id: id,
        action: function(){
            var dropDown = document.getElementById("Choose Trail");
            var arrow = document.createElement('IMG');
            dropDown.innerHTML = name;
            arrow.src = "http://maps.gstatic.com/mapfiles/arrow-down.png";
            arrow.className = 'dropDownArrow';  
            dropDown.appendChild(arrow);
            if(name == "China Town"){
                trail =trails.chinatown
            } else if(name =="NYP"){
                trail = trails.nyp
            }
            localStorage.setItem('trail',trail.name)
            makeLandmarkMarkers(trail)
            cancelBtn=makecancelButton()
            window.map.controls[google.maps.ControlPosition.TOP].push(cancelBtn);
        }
    })
    optDiv.style="font-size:290%;width:180px"
    return optDiv
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

function makecancelButton(){
    cancelBtn = document.createElement("input")
    cancelBtn.value = "Cancel"
    cancelBtn.type = "submit"
    cancelBtn.style="text-align:center;font-size:larger;margin-top:11px;height:97px;border: 1px solid; padding: 1px 12px; font: bold 20px Roboto, Arial, sans-serif; color: #000000; background-color: #FFFFFF;"
    cancelBtn.addEventListener("click",function (){
        window.location.href = "https://finalyearproject-631fc.web.app/main.html"  
    })
    return cancelBtn
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
        instructions = leg["steps"][0].instructions + " "+ leg["steps"][0].distance.text + "  "+leg["steps"][0].duration.text
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

$('#fardialog').dialog({
    height: "auto",
    width: 400,
    autoOpen: false,
    modal:true,
    buttons:[
            {
            text:"Ok" ,
            id:"farOk",
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
            url : "https://i.ibb.co/MGJr4Mq/image-1.png",
            size: new google.maps.Size(34,65),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(11, 40),
        }
    };

    window.map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: {lat: 1.354887375010911, lng:103.8252658350733},
        zoomControl: false,
        mapTypeControl: true,
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

    // Resize stuff...
    google.maps.event.addDomListener(window, "resize", function() {
        var center = map.getCenter();
        google.maps.event.trigger(window.map, "resize");
        window.map.setCenter(center); 
    })

    // Make option markers with action
    var optionDiv1 = createOptionDiv('China Town','chinaTownOption')
    var optionDiv2 = createOptionDiv('Kampung Glam',"kampungGlamOption")
    var optionDiv3  = createOptionDiv('Little India',"littleIndiaOption")
    var optionDiv4 = createOptionDiv('Peranakan',"peranakanOption") 
    var optionDiv5 = createOptionDiv('NYP','nypOption')
    //var sep = new separator();
        
    var ddDivOptions = {
        items: [optionDiv1, optionDiv2,optionDiv3,optionDiv4,optionDiv5],
        id: "myddOptsDiv"        		
    }

    var dropDownDiv = new dropDownOptionsDiv(ddDivOptions);   
    var dropDownOptions = {
        gmap: window.map,
        name: 'Choose Trail',
        id: 'ddControl',
        position: google.maps.ControlPosition.TOP,
        dropDown: dropDownDiv ,
        style: "font-size:370%;width:180px",
    }
    var dropDown1 = new dropDownControl(dropDownOptions); 

    // Set start button into the map also
    var startBtn = document.getElementById("submit")
    var recetnerBtn = document.getElementById("recenter");
    window.map.controls[google.maps.ControlPosition.TOP].push(dropDown1);
    window.map.controls[google.maps.ControlPosition.TOP].push(startBtn);
    window.map.controls[google.maps.ControlPosition.TOP].push(recetnerBtn);
    
    var boundary= new google.maps.LatLngBounds();
    // Make Trail markers
    removeMarkers()

    var keys = Object.keys(trails);
    for (let i = 0; i < keys.length;i++){
        boundary.extend(trails[keys[i]].location)
        marker = makeMarker(trails[keys[i]].location,icons.marker,trails[keys[i]].name)  //position, icon, title
        google.maps.event.addListener(marker, 'click', function() {
            makeLandmarkMarkers(trails[keys[i]])
            dropDown = document.getElementById('Choose Trail')
            dropDown.innerHTML = (trails[keys[i]].name)
            trail = trails[keys[i]].name
            cancelBtn=makecancelButton()
            window.map.controls[google.maps.ControlPosition.TOP].push(cancelBtn);
            localStorage.setItem('trail',trails[keys[i]].name)
        });
        gMarkers.push(marker);
        
    }
    window.map.fitBounds(boundary)
}


function success(position) {
    origin = {lat : position.coords.latitude , lng : position.coords.longitude}
    recenterLogic(origin)
    const map = window.map
    
    directionsService = new google.maps.DirectionsService();
    directionRenderer = new google.maps.DirectionsRenderer({preserveViewport:true});

    directionRenderer.setMap(map);
    // Set complete button     
    if (!getRouteButtonFlag){
        getRouteButtonFlag = true
        document.getElementById("submit").origin = origin
        document.getElementById("submit").addEventListener("click", checkDistance)
    }

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
    if(err.code == 1) {
        alert("Error: Access is denied!");
    } else if( err.code == 2) {
        alert("Error: Position is unavailable!");
    }
    }


function currentPositionError(err){
    console.warn(`ERROR(${err.code}): ${err.message}`);
}