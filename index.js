if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    $.ajax({
      url: "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lon+"&key=AIzaSyBhjujJO7PSaHpsG4Ab9Y-iPQZb0i9czio",
      dataType: "json",
      success: function(locationData) {
      $("#cityState").html(locationData.results[0].address_components[2].short_name+", "+locationData.results[0].address_components[4].short_name);
      }
    });
    $.ajax({
      url: "https://api.darksky.net/forecast/e7f8b6c907efe5aacff9b70d8b6ab98c/"+lat+","+lon,
      dataType: "jsonp",
      success: function(weatherData) {
        $("#crntCond").html(weatherData.currently.summary)
        $("#temp").html(Math.round(weatherData.currently.temperature)+"\xB0")
        $("#hiT").html("Hi "+Math.round(weatherData.daily.data[0].temperatureMax)+"\xB0\u2191")
        $("#loT").html("Lo "+Math.round(weatherData.daily.data[0].temperatureMin)+"\xB0\u2193")
        //alert(weatherData.daily.data[0].icon)
        var skycons = new Skycons({"color": "black"});
        skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);
        skycons.play();
      }
    });
  });
}
