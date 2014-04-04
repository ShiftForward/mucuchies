/**
 * Shows a configurable circular gauge for showing an arbitrary metric.
 *
 * Expects data from sources in the form:
 * {
 *   value: 0                 // between the widget `min` and `max` values
 *   message: "some message"
 * }
 */
Dashboard.MeterWidget = Dashboard.Widget.extend(Dashboard.SmoothHelper, {
  sourceData: {
    value: 0,
    message: null
  },
  min: 0,
  max: 100,
  currentValue: 0,

  onChangeContentValue: function() {
    this.setSmooth('currentValue', this.get('content.value'));
  }.observes('content.value'),

  onChangeCurrentValue: function() {
    if (!Ember.isNone(this.get('widgetView').$('.meter'))) {
      this.get('widgetView').$('.meter').val(Math.round(this.get('currentValue'))).change();
    }
  }.observes('currentValue'),

  widgetView: function() {
    var that = this;
    return Ember.View.create({
      templateName: 'meter_widget',
      classNames: ['widget', 'widget-meter'],
      didInsertElement: function() {
        this.$('.meter').knob();
        that.onChangeCurrentValue();
      }
    });
  }.property()
});
