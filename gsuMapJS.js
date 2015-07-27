function initialize() {

    //See API for options (use Ctrl+F instead of main search): https://developers.google.com/maps/documentation/javascript/3.exp/reference
    var mapOptions = {
        center: new google.maps.LatLng(33.753475, -84.385301),
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    //Initialize Map
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    //Add geojson (XHR Request)
    map.data.loadGeoJson('./GSUmap.geojson');

    //Initialize Search Box UI
    var input = (document.getElementById("places-input"));
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    //Initialize Search Box Function
    var BoxofSearch = new google.maps.places.SearchBox((input));

    //Add an Event Listener where the user searches and picks an option from the autocomplete list.
    google.maps.event.addListener(BoxofSearch, 'places_changed', function markPlaces() {



        // Not needed loop? Causes TypeError.

        // if (places.length == 0) {
        //   return null;
        // }
        // for (var i = 0, marker; marker = markers[i]; i++) {
        //   marker.setMap(null);
        // }
        var places = BoxofSearch.getPlaces();
        var mainMarkers = [];
        var bounds = new google.maps.LatLngBounds();

        for (var i = 0, place; place = places[i]; i++) {
            var image = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            //Place a new marker where the search item(s) is/are
            var marker = new google.maps.Marker({
                map: map,
                icon: image,
                title: place.name,
                position: place.geometry.location
            });

            //push out new search marker to mainMarkers array
            mainMarkers.push(marker);

            bounds.extend(place.geometry.location);
        }
        map.fitBounds(bounds);
    });

    //Fix to Pan to search
    google.maps.event.addListener(map, 'bounds_changed', function() {
        var bounds = map.getBounds();
        BoxofSearch.setBounds(bounds);
    });
}

// For Traffic; add button to UI
// var trafficLayer = new google.maps.TrafficLayer();
// trafficLayer.setMap(map);

// For Bikes once bikes map is stylized; delete main road gray lines; add button to UI
// var bikeLayer = new google.maps.BicyclingLayer();
//   bikeLayer.setMap(map);



google.maps.event.addDomListener(window, 'load', initialize);
