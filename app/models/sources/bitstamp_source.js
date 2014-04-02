/**
 * Provides bitcoin ticker data from Bitstamp.
 *
 * The data is provided to widgets as single floating point values.
 */
Dashboard.BitstampSource = Dashboard.PeriodicSource.extend({
  period: 5000,
  dataUpdate: function(callback) {
    $.get("https://www.bitstamp.net/api/ticker", function(data) {
      callback(data.last);
    });
  }
});
