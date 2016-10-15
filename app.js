
<!-- data -->
var map;
var myAdd = {lat:41.763424, lng: -72.675313};
var markers = [];





<!-- the view -->


function initMap(){
  var style =
  [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#263c3f"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6b9a76"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#38414e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#212a37"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9ca5b3"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#1f2835"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#f3d19c"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2f3948"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#515c6d"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  }
]


  map = new google.maps.Map(document.getElementById("map"),{
    center: {lat: 41.7637, lng:  -72.6851},
    zoom: 18,
    styles: style,
    mapTypeControl: false,


  });

  var locations =[
    {title:'hartfordHospital', location:{lat: 41.754582, lng:-72.678633} },
    {title:'school', location:{lat: 41.755042, lng:-72.665532} },
    {title:'park', location:{lat: 41.757419, lng:-72.664175} },
    {title:'house', location:{lat: 41.764117, lng:-72.671873} },
    {title:'condo', location:{lat: 41.767228, lng:-72.676470} }

  ];

  var largeInfowindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();

  //Styles the markers a too when you hover over it it changes color.
  var defaultMarker = makeMarkerIcon("0091ff");
  var highlightMark = makeMarkerIcon("FFFF4");

  for(var i = 0; i < locations.length;i++){
    // gets the positions & titles from the location array.
    var position = locations[i].location;
    var title = locations[i].title;

    // adds markers to the map using the correct locations above.
    var marker = new google.maps.Marker({
      position: position,
      title: title,
      id: i,
      animation: google.maps.Animation.DROP,
      icon: defaultMarker



    });
    marker.addListener('click', toggleBounce);

    marker.addListener('mouseover', function(){
      this.setIcon(highlightMark);
    });

    marker.addListener('mouseout', function(){
      this.setIcon(defaultMarker);
    });


  //pushes the marker above to the markers array
    markers.push(marker);
// opens infowindow when marker is clicked
  marker.addListener('click', function(){
    populateInfoWindow(this, largeInfowindow);

  });
//tells the map to fit itself to th
  map.fitBounds(bounds);

//Adds event listeners to the buttons show and hide listings.
  document.getElementById('showListings').addEventListener('click', showListings);
  document.getElementById('hideListings').addEventListener('click', hideListings);

};

//this function will populate the infowindow whenever the marker is clicked.
//will allow only one infowindow to populate, and populate based on markers position.

function populateInfoWindow(marker, infowindow){
//checks if the infowindow is not already open on the marker.
  if(infowindow != marker){
    infowindow.marker = marker;
    infowindow.setContent('<div>'+ marker.title+'</div>');
    infowindow.open(map, marker);
  //makes sure the marker prop. is cleared when infowindow is closed
    infowindow.addListener('closeclick', function(){
      infowindow.setMarker(null);
    });

  };

};

//Once button is clicked, it itrates through the marker array and places marker
// on map.
  function showListings(){
    var bounds = new google.maps.LatLngBounds();

    for(var i = 0; i < markers.length;i++){
        markers[i].setMap(map);

        bounds.extend(markers[i].position);


    }
    map.fitBounds(bounds);
  }


//Once clicked, takes all the markers on the map and sets them to null,
// thus hiding it in the map.

  function hideListings(){
    for(var i = 0; i < markers.length;i++){
    markers[i].setMap(null)

  };
};

//When you click the marker, it starts bouncing untill you click it again.
function toggleBounce(){

  for(var i = 0; i < locations.length;i++){

        if(markers[i].getAnimation() !== null){
          markers[i].setAnimation(null);
        }
        else{
          markers[i].setAnimation(google.maps.Animation.BOUNCE);
        }
    };
  };
  function makeMarkerIcon(markerColor) {
          var markerImage = new google.maps.MarkerImage('http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=1.15|0|'+ markerColor + '|40|_|%E2%80%A2',

            new google.maps.Size(21, 34),
            new google.maps.Point(0, 0),
            new google.maps.Point(10, 34),
            new google.maps.Size(21,34));
          return markerImage;

        };

  };
