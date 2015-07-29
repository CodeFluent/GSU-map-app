//Most code from here: https://stackoverflow.com/questions/9855067/toggle-kml-layers-in-google-maps-v3

var map;

//Add KML (CAUTION: KML layer is to CodeFluent direct drive. KML options must be directed through url link instead of local directory)
var kml = {
  academic: {
    name: "Academic Buildings",
    url: "https://docs.google.com/uc?export=download&id=0BzWKUFriQmXleW5NR3ZVeFJ6ajA"
  },
  tech: {
    name: "Tech Facilities",
    url: "https://docs.google.com/uc?export=download&id=0BzWKUFriQmXlemRoT3lmTlpLLWs"
  },
  cars: {
    name: "Parking",
    url: "https://docs.google.com/uc?export=download&id=0BzWKUFriQmXlT1B0cG5zNlE2MEU"
  },
  school: {
    name: "Colleges",
    url: "https://docs.google.com/uc?export=download&id=0BzWKUFriQmXlOGl6UVJ4WTZ4LTA"
  }



};

function initialize() {

  //See API for options (use Ctrl+F instead of main search): https://developers.google.com/maps/documentation/javascript/3.exp/reference
  var mapOptions = {
    center: new google.maps.LatLng(33.753475, -84.385301),
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  //Initialize Map
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  console.log('Map loaded.');

  createTogglers();


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



  // For Traffic; add button to UI
  // var trafficLayer = new google.maps.TrafficLayer();
  // trafficLayer.setMap(map);

  // For Bikes once bikes map is stylized; delete main road gray lines; add button to UI
  // var bikeLayer = new google.maps.BicyclingLayer();
  //   bikeLayer.setMap(map);

}

google.maps.event.addDomListener(window, 'load', initialize);

// the important function... kml[id].xxxxx refers back to the top
function toggleKML(checked, id) {

  if (checked) {

    var layer = new google.maps.KmlLayer(kml[id].url, {
      preserveViewport: true,
      suppressInfoWindows: false
    });
    // store kml as obj
    kml[id].obj = layer;
    kml[id].obj.setMap(map);
  } else {
    kml[id].obj.setMap(null);
    delete kml[id].obj;
  }

};

// create the controls dynamically because it's easier, really
function createTogglers() {

  var html = "<form><ul>";
  for (var prop in kml) {
    html += "<li id=\"selector-" + prop +
      "\"><input type='checkbox' id='" + prop + "'" +
      " onclick='highlight(this,\"selector-" + prop +
      "\"); toggleKML(this.checked, this.id)' \/>" +
      kml[prop].name + "<\/li>";
  }
  html +=
    "<li class='control'><a href='#' onclick='removeAll();return false;'>" +
    "Remove all layers<\/a><\/li>" +
    "<\/ul><\/form>";

  document.getElementById("toggle_box").innerHTML = html;
};

// easy way to remove all objects
function removeAll() {
  for (var prop in kml) {
    if (kml[prop].obj) {
      kml[prop].obj.setMap(null);
      delete kml[prop].obj;
    }

  }
};

// Append Class on Select
function highlight(box, listitem) {
  var selected = 'selected';
  var normal = 'normal';
  document.getElementById(listitem).className = (box.checked ? selected :
    normal);
};


function startup() {
  console.log("Startup Complete.");
  // for example, this toggles kml [tech] on load and updates the menu selector
  var checkit = document.getElementById('tech');
  checkit.checked = true;
  toggleKML(checkit, 'tech');
  highlight(checkit, 'selector1');

}
