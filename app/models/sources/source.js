/**
 * Base class of all sources.
 */
Dashboard.Source = Ember.Object.extend({
  widgets: function() {
    return Ember.A([]);
  }.property(),

  latestData: null,

  updateData: function(data) {
    this.get("widgets").forEach(function(widget) {
      widget.set("sourceData", data);
    });
    this.set("latestData", data);
  },

  updateWidgetOnAdd: function() {
    if (!Ember.isNone(this.get('latestData'))) {
      this.updateData(this.get('latestData'));
    }
  }.observes('widgets.@each')
});
