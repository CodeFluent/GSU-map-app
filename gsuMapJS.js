
function initialize () {
var mapOptions = {
  center: new google.maps.LatLng(33.753475, -84.385301),
  zoom: 16,
  mapTypeId: google.maps.MapTypeId.ROADMAP
 };

 var map = new google.maps.Map(document.getElementById("map"), mapOptions);

 var markerOptions = {
  position: new google.maps.LatLng(33.75428, -84.39016),
  map: map
 };
 var marker = new google.maps.Marker(markerOptions);
 	marker.setMap(map);

 var infoWindowOptions = {
  content: 'Andrew Young School of Policy Studies'
 };

 var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
 google.maps.event.addListener(marker,'click',function(e){

  infoWindow.open(map, marker);

});
}
google.maps.event.addDomListener(window, 'load', initialize);
