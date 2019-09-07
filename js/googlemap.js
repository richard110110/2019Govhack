var APIKEY = "AIzaSyBUWZh6W3ABvJ52_aYXqptDyKtj7y-wefM";


// The following example creates complex markers to indicate beaches near
// Sydney, NSW, Australia. Note that the anchor is set to (0,32) to correspond
// to the base of the flagpole.

var url = "../assests/cartodb-query.geojson";




function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {
            lat: -33.9,
            lng: 151.2
        }
    });
    infoWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var icon = {
                url: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png", // url
                scaledSize: new google.maps.Size(20, 32), // scaled size
                origin: new google.maps.Point(0, 0), // origin
                anchor: new google.maps.Point(0, 32) // anchor
            };


            infoWindow.setPosition(pos);
            var local = new google.maps.Marker({
                position: pos,
                map: map,
                icon: icon
            })
            //   infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
    fetch(url).then(function (res) {
            return res.json();
        })
        .then(function (data) {

            console.log(data);
            console.log(data.features.length);
            console.log(data.features[0].properties);
            console.log(data.features[0].properties.wgs84_latitude);
            console.log(data.features[0].properties.wgs84_longitude);


            setMarkers(map, data);

        });
}

// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

function rating(data) {

    for (var i = 0; i < data.features.length; i++) {

        if (data.features[i].properties.quality_rating == 0) {
            var stars = null;
        }
        if (data.features[i].properties.quality_rating == 1) {
            var stars = '<span class="fa fa-star checked"></span>';
        }
        if (data.features[i].properties.quality_rating == 2) {
            var stars = '<span class="fa fa-star checked"></span>' +
                '<span class="fa fa-star checked"></span>';
        }
        if (data.features[i].properties.quality_rating == 3) {
            var stars = '<span class="fa fa-star checked"></span>' +
                '<span class="fa fa-star checked"></span>' +
                '<span class="fa fa-star checked"></span>';
        }
        if (data.features[i].properties.quality_rating == 4) {
            var stars = '<span class="fa fa-star checked"></span>' +
                '<span class="fa fa-star checked"></span>' +
                '<span class="fa fa-star checked"></span>' +
                '<span class="fa fa-star checked"></span>';
        }
        if (data.features[i].properties.quality_rating == 5) {
            var stars = '<span class="fa fa-star checked"></span>' +
                '<span class="fa fa-star checked"></span>' +
                '<span class="fa fa-star checked"></span>' +
                '<span class="fa fa-star checked"></span>' +
                '<span class="fa fa-star checked"></span>';
        }
        return stars;
    }

}

function check(data) {

    for (var i = 0; i < data.features.length; i++) {

        if (data.features[i].properties.heavy_vehicle_checking_station == true) {
            var content = '<i class="fa fa-exclamation-square"></i>';
        }
        if (data.features[i].properties.heavy_vehicle_checking_station == false) {
            var content = '<i class="fa fa-check-square"></i>';
        }
        return content;
    }

}

function createOptions(data){
    
    var options = "<option value='0'>Select</option>";
    for(var i=0; i<data.features.length;i++){
        options+= '<option value='+ data.features[i].properties.full_name + '>'+data.features[i].properties.common_road_name+'</option>';
    }
    document.getElementById('start').innerHTML = options;
    document.getElementById('end').innerHTML = options;

}

function setMarkers(map, data) {
    // Adds markers to the map.
    var beaches = [
        ['Bondi Beach', -33.890542, 151.274856, 4],
        ['Coogee Beach', -33.923036, 151.259052, 5],
        ['Cronulla Beach', -34.028249, 151.157507, 3],
        ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
        ['Maroubra Beach', -33.950198, 151.259302, 1]
    ];

    // Marker sizes are expressed as a Size of X,Y where the origin of the image
    // (0,0) is located in the top left of the image.

    // Origins, anchor positions and coordinates of the marker increase in the X
    // direction to the right and in the Y direction down.
    var image = {
        url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(20, 32),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32)
    };
    // Shapes define the clickable region of the icon. The type defines an HTML
    // <area> element 'poly' which traces out a polygon as a series of X,Y points.
    // The final coordinate closes the poly by connecting to the first coordinate.
    var shape = {
        coords: [1, 1, 1, 20, 18, 20, 18, 1],
        type: 'poly'
    };
    createOptions(data);

    for (var i = 0; i < data.features.length; i++) {
        var contentString = '<div id="iw-container">' +
            '<div class="iw-title">' + data.features[i].properties.full_name + '</div>' +
            '<div class="iw-content">' +
            '<div class="iw-subTitle">info</div>' +
            '<p>intersection:' + '<br>' + data.features[i].properties.intersection + '<br>' + '</p>' +
            '<p>suburb:' + '<br>' + data.features[i].properties.suburb + '<br>' + '</p>' +
            '<p>postcode:' + '<br>' + data.features[i].properties.post_code + '<br>' + '</p>' +
            '<p>road_classification_type:' + '<br>' + data.features[i].properties.road_classification_type + '<br>' + '</p>' +
            '<p>lga:' + '<br>' + data.features[i].properties.lga + '<br>' + '</p>' +

            rating(data) +
            '<p>heavy_vehicle_checking_station:' + '<br>' + check(data)+ '<br>' + '</p>' +

            

            '</div>' +

            '<div class="iw-bottom-gradient"></div>' +
            '</div>';


        var marker = new google.maps.Marker({
            position: {
                lat: data.features[i].properties.wgs84_latitude,
                lng: data.features[i].properties.wgs84_longitude
            },
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            icon: image,
            shape: shape,
            title: data.features[i].properties.full_name,
            // zIndex: data.features[i].properties.quality_rating,
            info: contentString
        });

        // var directionsRenderer = new google.maps.DirectionsRenderer({map: map});

        // // Instantiate an info window to hold step text.
        // var stepDisplay = new google.maps.InfoWindow;

        // // Display the route between the initial start and end selections.
        // calculateAndDisplayRoute(
        //     directionsRenderer, directionsService, markerArray, stepDisplay, map);
        // // Listen to change events from the start and end lists.
        // var onChangeHandler = function() {
        //   calculateAndDisplayRoute(
        //       directionsRenderer, directionsService, markerArray, stepDisplay, map);
        // };
        // document.getElementById('start').addEventListener('change', onChangeHandler);
        // document.getElementById('end').addEventListener('change', onChangeHandler);


        google.maps.event.addListener(marker, 'click', function () {

            infoWindow.setContent(this.info);
            infoWindow.open(map, this);

        });



    }

}

// function calculateAndDisplayRoute(directionsRenderer, directionsService,
//     markerArray, stepDisplay, map) {
//   // First, remove any existing markers from the map.
//   for (var i = 0; i < markerArray.length; i++) {
//     markerArray[i].setMap(null);
//   }

//   // Retrieve the start and end locations and create a DirectionsRequest using
//   // WALKING directions.
//   directionsService.route({
//     origin: document.getElementById('start').value,
//     destination: document.getElementById('end').value,
//     travelMode: 'WALKING'
//   }, function(response, status) {
//     // Route the directions and pass the response to a function to create
//     // markers for each step.
//     if (status === 'OK') {
//       document.getElementById('warnings-panel').innerHTML =
//           '<b>' + response.routes[0].warnings + '</b>';
//       directionsRenderer.setDirections(response);
//       showSteps(response, markerArray, stepDisplay, map);
//     } else {
//       window.alert('Directions request failed due to ' + status);
//     }
//   });
// }

// function showSteps(directionResult, markerArray, stepDisplay, map) {
//   // For each step, place a marker, and add the text to the marker's infowindow.
//   // Also attach the marker to an array so we can keep track of it and remove it
//   // when calculating new routes.
//   var myRoute = directionResult.routes[0].legs[0];
//   for (var i = 0; i < myRoute.steps.length; i++) {
//     var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
//     marker.setMap(map);
//     marker.setPosition(myRoute.steps[i].start_location);
//     attachInstructionText(
//         stepDisplay, marker, myRoute.steps[i].instructions, map);
//   }
// }

// function attachInstructionText(stepDisplay, marker, text, map) {
//   google.maps.event.addListener(marker, 'click', function() {
//     // Open an info window when the marker is clicked on, containing the text
//     // of the step.
//     stepDisplay.setContent(text);
//     stepDisplay.open(map, marker);
//   });
// }