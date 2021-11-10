jQuery(function(){
		  var apiurl, myresult, apiurl_size, selected_size;
      var page = 1;
  if(localStorage.getItem("searchImage") != null) {
    var savedSearch = localStorage.getItem("searchImage");
        runSearch(savedSearch);
  };


  $("#button").click(function() {
    runSearch($('#searchQuery').val());
});

  function runSearch(a) {
    $( "#results" ).empty();
      localStorage.setItem("searchImage", $('#searchQuery').val());

    $("#hider").toggleClass("hidden");
    apiurl =
    "https://api.flickr.com/services/rest/?method=flickr.photos.search&tags=" + a + "&api_key=c15a06b9496701f80231ada5af5f5199&per_page=10&format=json&nojsoncallback=1";
  flickThatR();
};



  $("#next").click(function() {
    $("#results").empty();
    page++;
    apiurl =
    "https://api.flickr.com/services/rest/?method=flickr.photos.search&tags=" + $('#searchQuery').val() + "&page=" + page + "&api_key=c15a06b9496701f80231ada5af5f5199&per_page=10&format=json&nojsoncallback=1";
  flickThatR();
  })

   $("#prev").click(function() {
    if (page > 1) {
    $("#results").empty();
    page--;
    apiurl =
    "https://api.flickr.com/services/rest/?method=flickr.photos.search&tags=" + $('#searchQuery').val() + "&page=" + page + "&api_key=c15a06b9496701f80231ada5af5f5199&per_page=10&format=json&nojsoncallback=1";
  flickThatR();
}
  })



function flickThatR() {
  if (page >= 1) {
   $.getJSON(apiurl, function(json) {
      $.each(json.photos.photo, function(i, myresult) {
        apiurl_size =
          "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=ca370d51a054836007519a00ff4ce59e&photo_id=" +
          myresult.id +
          "&format=json&nojsoncallback=1";
        $.getJSON(apiurl_size, function(size) {
          $.each(size.sizes.size, function(i, myresult_size) {
            if (myresult_size.width == 640) {
              $("#results").append(
                '<p><a href="' +
                  myresult_size.url +
                  '" target="_blank"><img class="resultImg" src="' +
                  myresult_size.source +
                  '"/></a></p>'
              );
            }
          });
        });
      });
    });
}
}


});
