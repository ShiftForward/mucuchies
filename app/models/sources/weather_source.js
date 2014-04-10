/**
 * Provides weather data from the Yahoo API. The ID of a location can be found at
 * http://woeid.rosselliot.co.nz/.
 *
 * Provides data in the form:
 * {
 *   temperature: "14"               // in Celsius
 *   code: "weather_condition_code"  // one from http://developer.yahoo.com/weather/#codes
 *   city: "city name"
 * }
 */
Dashboard.WeatherSource = Dashboard.PeriodicSource.extend({
  period: 300000,
  woeId: null,

  dataUpdate: function(callback) {
    var query = "select * from weather.forecast WHERE woeid=" + this.get('woeId') +
      " and u='c'";

    var url = "http://query.yahooapis.com/v1/public/yql?q=" +
      encodeURIComponent(query) + "&format=json";

    $.get(url, function(data) {
      var results = data.query.results;
      var condition = results.channel.item.condition;

      callback({
        temperature: condition.temp,
        code: condition.code,
        city: results.channel.location.city
      })
    });
  }
});
