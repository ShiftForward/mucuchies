/**
 * Provides the current time every second.
 *
 * The data is provided as timestamps.
 */
Dashboard.TimeSource = Dashboard.PeriodicSource.extend({
  period: 1000,
  dataUpdate: function(callback) {
    callback(new Date().getTime());
  }
});
