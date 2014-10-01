/**
 * Shows information about the weather in a given location.
 *
 * Expects data from sources in the form:
 * {
 *   temperature: "14"               // in Celsius
 *   code: "weather_condition_code"  // one from http://developer.yahoo.com/weather/#codes
 *   city: "city name"
 * }
 */
Dashboard.WeatherExtendedWidget = Dashboard.Widget.extend({
  sourceData: {
    today: {
      temperature: "",
      code: "",
      city: ""
    },
    tomorrow: {
      title: "",
      code: ""
    },
    aftertomorrow: {
      title: "",
      code: ""
    }
  },

  showLastUpdated: true,

  todayCodeClass: function() {
    return "widget-weather-code-" + this.get('content.today.code');
  }.property('content'),

  tomorrowCodeClass: function() {
    return "widget-weather-code-" + this.get('content.tomorrow.code');
  }.property('content'),

  aftertomorrowCodeClass: function() {
    return "widget-weather-code-" + this.get('content.aftertomorrow.code');
  }.property('content'),

  templateName: 'weather_ext_widget',
  classNames: ['widget', 'widget-weather', 'widget-weather-ext']
});
