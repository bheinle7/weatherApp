$(document).ready(function() {
  var temp;
  var hi;
  var lo;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      $.ajax({
        url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
          lat +
          "," +
          lon +
          "&key=AIzaSyBhjujJO7PSaHpsG4Ab9Y-iPQZb0i9czio",
        dataType: "json",
        success: function(locationData) {
          $("#cityState").html(
            locationData.results[0].address_components[2].short_name +
              ", " +
              locationData.results[0].address_components[4].short_name
          );
        }
      });
      $.ajax({
        url: "https://api.darksky.net/forecast/e7f8b6c907efe5aacff9b70d8b6ab98c/" +
          lat +
          "," +
          lon,
        dataType: "jsonp",
        success: function(weatherData) {
          $("#crntCond").html(weatherData.currently.summary);
          temp = Math.round(weatherData.currently.temperature);
          $("#temp").html(
            Math.round(weatherData.currently.temperature) + "\xB0F"
          );
          hi = Math.round(weatherData.daily.data[0].temperatureMax);
          $("#hiT").html(
            "Hi " +
              Math.round(weatherData.daily.data[0].temperatureMax) +
              "\xB0\u2191"
          );
          lo = Math.round(weatherData.daily.data[0].temperatureMin);
          $("#loT").html(
            "Lo " +
              Math.round(weatherData.daily.data[0].temperatureMin) +
              "\xB0\u2193"
          );

          var monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
          ];
          var date = new Date();
          var month = monthNames[date.getMonth()];
          var day = date.getDate();
          var hrs = date.getHours();
          var min = date.getMinutes();
          if (hrs > 12) {
              hrs -= 12;
              if (min < 10) {
                $("#date").html(month +" "+ day + ", " + hrs + ":" + "0" + min + " PM")
              } else {
                $("#date").html(month +" "+ day + ", " + hrs + ":" + min + " PM")
              }

            } else {
              if (min < 10) {
                $("#date").html(month +" "+ day + ", " + hrs + ":" + "0" + min + " AM")
              } else {
                $("#date").html(month +" "+ day + ", " + hrs + ":" + min + " AM")
              }
            }

          //alert(min);
          var icon = weatherData.daily.data[0].icon;
          switch (icon) {
            case "clear-day":
              $("#icon").attr("class", "wi wi-day-sunny");
              $("body").css(
                "background-image",
                "url(" +
                  "https://github.com/bheinle7/weatherApp/blob/master/img/clearDay.JPEG?raw=true" +
                  ")"
              );
              break;
            case "clear-night":
              $("#icon").attr("class", "wi wi-night-clear");
              $("body").css(
                "background-image",
                "url(" +
                  "https://github.com/bheinle7/weatherApp/blob/master/img/clearNight.JPG?raw=true" +
                  ")"
              );
              break;
            case "rain":
              $("#icon").attr("class", "wi wi-sprinkle");
              $("body").css(
                "background-image",
                "url(" +
                  "https://github.com/bheinle7/weatherApp/blob/master/img/rain.JPG?raw=true" +
                  ")"
              );
              break;
            case "snow":
              $("#icon").attr("class", "wi wi-snow");
              $("body").css(
                "background-image",
                "url(" +
                  "https://github.com/bheinle7/weatherApp/blob/master/img/snow.JPG?raw=true" +
                  ")"
              );
              break;
            case "sleet":
              $("#icon").attr("class", "wi wi-sleet");
              $("body").css(
                "background-image",
                "url(" +
                  "https://github.com/bheinle7/weatherApp/blob/master/img/rain.JPG?raw=true" +
                  ")"
              );
              break;
            case "wind":
              $("#icon").attr("class", "wi wi-strong-wind");
              $("#icon").css("color", "black");
              $("body").css("color", "black");
              $("a").css("color", "black");
              $("body").css(
                "background-image",
                "url(" +
                  "https://github.com/bheinle7/weatherApp/blob/master/img/wind.JPGraw=true" +
                  ")"
              );
              break;
            case "fog":
              $("#icon").attr("class", "wi wi-fog");
              $("#icon").css("color", "black");
              $("body").css("color", "black");
              $("a").css("color", "black");
              $("body").css(
                "background-image",
                "url(" +
                  "https://github.com/bheinle7/weatherApp/blob/master/img/foggyDay.JPEG?raw=true" +
                  ")"
              );
              break;
            case "cloudy":
              $("#icon").attr("class", "wi wi-cloud");
              $("body").css(
                "background-image",
                "url(" +
                  "https://github.com/bheinle7/weatherApp/blob/master/img/cloudy.JPEG?raw=true" +
                  ")"
              );
              break;
            case "partly-cloudy-day":
              $("#icon").attr("class", "wi wi-day-cloudy");
              $("#icon").css("color", "black");
              $("body").css("color", "black");
              $("a").css("color", "black");
              $("body").css(
                "background-image",
                "url(" +
                  "https://github.com/bheinle7/weatherApp/blob/master/img/partlyCloudy.JPEG?raw=true" +
                  ")"
              );
              break;
            case "partly-cloudy-night":
              $("#icon").attr("class", "wi wi-night-alt-cloudy");
              $("body").css(
                "background-image",
                "url(" +
                  "https://github.com/bheinle7/weatherApp/blob/master/img/partlyCloudyNight.JPG" +
                  ")"
              );
              break;
          }
        }
      });
    });
  } else {
    alert("No Location Service");
  }
  $("#degC").click(function() {
    $("#degF").attr("class", "btn btn-default");
    $("#degC").attr("class", "btn btn-primary");
    $("#temp").html(Math.round((temp - 32) * (5 / 9)) + "\xB0C");
    $("#hiT").html("Hi " + Math.round((hi - 32) * (5 / 9)) + "\xB0\u2191");
    $("#loT").html("Lo " + Math.round((lo - 32) * (5 / 9)) + "\xB0\u2193");
  });
  $("#degF").click(function() {
    $("#degC").attr("class", "btn btn-default");
    $("#degF").attr("class", "btn btn-primary");
    $("#temp").html(temp + "\xB0F");
    $("#hiT").html("Hi " + hi + "\xB0\u2191");
    $("#loT").html("Lo " + lo + "\xB0\u2193");
  });
});
