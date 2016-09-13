var openWeatherAppId = 'bba60bd2ddb3a8830bd9fb48c76e6de1', openWeatherUrl = 'http://api.openweathermap.org/data/2.5/forecast';
var prepareData = function (units) {
    // Replace loading image
    var cityName = $('#city-name').val();
    // Make ajax call, callback
    if (cityName && cityName != '') {
        cityName = cityName.trim();
        getData(openWeatherUrl, cityName, openWeatherAppId, units);
    }
    else {
        alert('Please enter the city name');
    }
};
$(document).ready(function () {
    $('.button1').click(function () {
        prepareData('metric');
    });
    $('.button2').click(function () {
        prepareData('imperial');
    });
});
function getData(url, cityName, appId, units) {
    var request = $.ajax({
        url: url,
        dataType: "jsonp",
        data: { q: cityName, appid: appId, units: units },
        jsonpCallback: "fetchData",
        type: "GET"
    }).fail(function (error) {
        console.error(error);
        alert('Error sending request');
    });
}
function fetchData(forecast) {
    console.log(forecast);
    var html = '', cityName = forecast.city.name, country = forecast.city.country;
    html += '<h2> Weather Forecast for ' + cityName + ', ' + country + '</h2>';
    forecast.list.forEach(function (forecastEntry, index, list) {
        html += '<p>' + forecastEntry.dt_txt + ': ' + forecastEntry.main.temp + "°" + '</p>';
    });
    $('#log').html(html);
}
