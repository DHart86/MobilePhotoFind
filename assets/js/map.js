jQuery(function(){
		var map, infoWindow, origin;

  function clickGo() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          origin = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          infoWindow.setContent("You are here.");
          infoWindow.open(map);
        },
        function() {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
      );
      infoWindow.open(map);
    }
  }

  var ClickEventHandler = function(map, start) {
    this.origin = start;
    this.map = map;
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.directionsDisplay.setMap(map);
    this.placesService = new google.maps.places.PlacesService(map);
    this.infowindow = new google.maps.InfoWindow();
    this.infowindowContent = document.getElementById("infowindow-content");
    this.infowindow.setContent(this.infowindowContent);

    // Listen for clicks on the map.
    this.map.addListener("click", this.handleClick.bind(this));
  };

  $("#submit").click(function() {

// Geocode Address
	var whereTo = $('#whereTo').val();
  var radius = ($('#radius').val() * 1609);
  localStorage.setItem("storeWhere", whereTo);
  localStorage.setItem("storeRadius", radius);
	var geocoder = new google.maps.Geocoder();
          window.onload = geocodeAddress(geocoder, map, radius);

    function initMap() {
      var start = { lat: 43.6156, lng: -84.2472 };
      var marker;
      map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: start
      });
    }


    ClickEventHandler.prototype.handleClick = function(event) {
      if (event.placeId) {
        this.calculateAndDisplayRoute(event.placeId);
      }
    };


    ClickEventHandler.prototype.calculateAndDisplayRoute = function(placeId) {
      var me = this;
      this.directionsService.route(
        {
          origin: origin,
          destination: { placeId: placeId },
          travelMode: "DRIVING"
        },
        function(response, status) {
          if (status === "OK") {
            me.directionsDisplay.setDirections(response);
          } else {
            window.alert("Directions request failed due to " + status);
          }
        }
      );
    };


   function geocodeAddress(geocoder, resultsMap, rad) {

        geocoder.geocode({'address': whereTo}, function(results, status) {
          if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            var theMarker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
       originPoint = results[0].geometry.location;
       getStore(originPoint, rad);
          }

          else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      
}

////////////
function getStore(a, b) {
      var request = {
       location: a,
        radius: b,
        type: ["electronics-store"]
      };


      var clickHandler = new ClickEventHandler(map, a);
      infoWindow = new google.maps.InfoWindow();

      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, callback);

      function callback(results, status) {
      	//alert(results);
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          directionsDisplay.setMap(map);
          for (var i = 0; i < 1; i++) {
            marker = new google.maps.Marker({
              map: map,
              position: results[i].geometry.location
            });
            marker.addListener("click", function() {
              //alert(marker.getPosition());
              var request = {
                origin: origin,
                destination: marker.getPosition(),
                travelMode: "DRIVING"
          };
              directionsService.route(request, function(result, status) {
                if (status == "OK") {
                  directionsDisplay.setDirections(result);
                }
              });
            });
          }
        }
      }
  }
/////////////

    initMap();
  });









 setTimeout(function storedMap() {

// Geocode Address
  var whereTo = localStorage.getItem("storeWhere");
  var radius = localStorage.getItem("storeRadius");

  var geocoder = new google.maps.Geocoder();
  window.onload = geocodeAddress(geocoder, map, radius);

    function initMap() {
      var start = { lat: 43.6156, lng: -84.2472 };
      var marker;
      map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: start
      });
    }


    ClickEventHandler.prototype.handleClick = function(event) {
      if (event.placeId) {
        this.calculateAndDisplayRoute(event.placeId);
      }
    };


    ClickEventHandler.prototype.calculateAndDisplayRoute = function(placeId) {
      var me = this;
      this.directionsService.route(
        {
          origin: origin,
          destination: { placeId: placeId },
          travelMode: "DRIVING"
        },
        function(response, status) {
          if (status === "OK") {
            me.directionsDisplay.setDirections(response);
          } else {
            window.alert("Directions request failed due to " + status);
          }
        }
      );
    };


   function geocodeAddress(geocoder, resultsMap, rad) {

        geocoder.geocode({'address': whereTo}, function(results, status) {
          if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            var theMarker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
       originPoint = results[0].geometry.location;
          }

          else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      
}

////////////
/////////////

    initMap();
  }, 1000);




   if(localStorage.getItem("storeWhere") != null && localStorage.getItem("storeRadius") != null) {
      alert(localStorage.getItem("storeWhere") + " and " + localStorage.getItem("storeRadius"));
     storedMap();
    }







  clickGo();
});
