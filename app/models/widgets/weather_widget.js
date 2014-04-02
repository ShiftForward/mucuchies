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
Dashboard.WeatherWidget = Dashboard.Widget.extend({
  sourceData: {
    temperature: "",
    code: "",
    city: ""
  },

  showLastUpdated: true,

  codeClass: function() {
    return "widget-weather-code-" + this.get('content.code');
  }.property('content.code'),

  templateName: 'weather_widget',
  classNames: ['widget', 'widget-weather']
});