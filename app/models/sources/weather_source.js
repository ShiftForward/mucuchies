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
Dashboard.WeatherSource = Dashboard.PeriodicSource.extend(Dashboard.YqlHelper, {
  period: 300000,
  woeId: null,

  extendDay: function(str) {
    switch (str) {
      case "Sun": return "Sunday";
      case "Mon": return "Monday";
      case "Tue": return "Tuesday";
      case "Wed": return "Wednesday";
      case "Thu": return "Thursday";
      case "Fri": return "Friday";
      case "Sat": return "Saturday";
    }
  },

  dataUpdate: function(callback) {
    var query = "select * from weather.forecast WHERE woeid=" + this.get('woeId') +
      " and u='c'";

    var that = this;

    $.get(this.queryUrl(query), function(data) {
      var results = data.query.results;
      var condition = results.channel.item.condition;
      var forecasts = results.channel.item.forecast.splice(1);
      forecasts.splice(2);

      callback({
        today: {
          temperature: condition.temp,
            code: condition.code,
            city: results.channel.location.city
        },
        tomorrow: {
          title: "Tomorrow",
          code: forecasts[0].code
        },
        aftertomorrow: {
          title: that.extendDay(forecasts[1].day),
          code: forecasts[1].code
        }})
    });
  }
});
