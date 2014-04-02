/**
 * Shows a simple date and time clock.
 *
 * Expects data from sources as a timestamp.
 */
Dashboard.ClockWidget = Dashboard.Widget.extend({

  date: function() {
    var t = this.get('content');
    return t ? moment(t).format("ddd MMM DD YYYY") : "";
  }.property('content'),

  time: function() {
    var t = this.get('content');
    return t ? moment(t).format("HH:mm:ss") : "";
  }.property('content'),

  templateName: 'clock_widget',
  classNames: ['widget', 'widget-clock']
});
