
<!-- data -->
var map;
var myAdd = {lat:41.763424, lng: -72.675313};
var markers = [];




<!-- the view -->


function initMap(){
  var style = 
           [
             {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
             {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
             {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
             {
               featureType: 'administrative',
               elementType: 'geometry.stroke',
               stylers: [{color: '#c9b2a6'}]
             },
             {
               featureType: 'administrative.land_parcel',
               elementType: 'geometry.stroke',
               stylers: [{color: '#dcd2be'}]
             },
             {
               featureType: 'administrative.land_parcel',
               elementType: 'labels.text.fill',
               stylers: [{color: '#ae9e90'}]
             },
             {
               featureType: 'landscape.natural',
               elementType: 'geometry',
               stylers: [{color: '#dfd2ae'}]
             },
             {
               featureType: 'poi',
               elementType: 'geometry',
               stylers: [{color: '#dfd2ae'}]
             },
             {
               featureType: 'poi',
               elementType: 'labels.text.fill',
               stylers: [{color: '#93817c'}]
             },
             {
               featureType: 'poi.park',
               elementType: 'geometry.fill',
               stylers: [{color: '#a5b076'}]
             },
             {
               featureType: 'poi.park',
               elementType: 'labels.text.fill',
               stylers: [{color: '#447530'}]
             },
             {
               featureType: 'road',
               elementType: 'geometry',
               stylers: [{color: '#f5f1e6'}]
             },
             {
               featureType: 'road.arterial',
               elementType: 'geometry',
               stylers: [{color: '#fdfcf8'}]
             },
             {
               featureType: 'road.highway',
               elementType: 'geometry',
               stylers: [{color: '#f8c967'}]
             },
             {
               featureType: 'road.highway',
               elementType: 'geometry.stroke',
               stylers: [{color: '#e9bc62'}]
             },
             {
               featureType: 'road.highway.controlled_access',
               elementType: 'geometry',
               stylers: [{color: '#e98d58'}]
             },
             {
               featureType: 'road.highway.controlled_access',
               elementType: 'geometry.stroke',
               stylers: [{color: '#db8555'}]
             },
             {
               featureType: 'road.local',
               elementType: 'labels.text.fill',
               stylers: [{color: '#806b63'}]
             },
             {
               featureType: 'transit.line',
               elementType: 'geometry',
               stylers: [{color: '#dfd2ae'}]
             },
             {
               featureType: 'transit.line',
               elementType: 'labels.text.fill',
               stylers: [{color: '#8f7d77'}]
             },
             {
               featureType: 'transit.line',
               elementType: 'labels.text.stroke',
               stylers: [{color: '#ebe3cd'}]
             },
             {
               featureType: 'transit.station',
               elementType: 'geometry',
               stylers: [{color: '#dfd2ae'}]
             },
             {
               featureType: 'water',
               elementType: 'geometry.fill',
               stylers: [{color: '#b9d3c2'}]
             },
             {
               featureType: 'water',
               elementType: 'labels.text.fill',
               stylers: [{color: '#92998d'}]
             }
           ];

  map = new google.maps.Map(document.getElementById("map"),{
    center: {lat: 41.7637, lng:  -72.6851},
    zoom: 18,
    styles: style

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

  for(var i = 0; i < locations.length;i++){
    // gets the positions & titles from the location array.
    var position = locations[i].location;
    var title = locations[i].title;

    // adds markers to the map using the correct locations above.
    var marker = new google.maps.Marker({
      position: position,
      title: title,
      id: i,
      animation: google.maps.Animation.DROP

    });
  //pushes the marker above to the markers array
    markers.push(marker);
  //extends the bounds to the markers.



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
};
