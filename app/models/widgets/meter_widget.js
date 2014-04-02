/**
 * Shows a configurable circular gauge for showing an arbitrary metric.
 *
 * Expects data from sources in the form:
 * {
 *   value: 0                 // between the widget `min` and `max` values
 *   message: "some message"
 * }
 */
Dashboard.MeterWidget = Dashboard.Widget.extend({
  sourceData: {
    value: 0,
    message: null
  },
  min: 0,
  max: 100,

  onChangeValue: function() {
    if (!Ember.isNone(this.get('widgetView').$('.meter'))) {
      this.get('widgetView').$('.meter').val(this.get('content.value')).change();
    }
  }.observes('content.value'),

  widgetView: function() {
    var that = this;
    return Ember.View.create({
      templateName: 'meter_widget',
      classNames: ['widget', 'widget-meter'],
      didInsertElement: function() {
        this.$('.meter').knob();
        that.onChangeValue();
      }
    });
  }.property()
});
