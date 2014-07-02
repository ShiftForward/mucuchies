/**
 * A pseudo-source that transforms and provides the data coming from another source. It allows
 * users to use widgets requiring a certain data type with sources that provide data in
 * another.
 */
Dashboard.AdapterSource = Dashboard.Source.extend({
  source: {},
  sourceData: null,

  transform: function(data) {
    return data;
  },

  sourceInstance: function() {
    return Dashboard.SourceFactory.fromDef(this.get('source'));
  }.property('source'),

  onUpdateData: function() {
    this.updateData(this.transform(this.get('sourceData')));
  }.observes('sourceData'),

  init: function() {
    if (!Ember.isNone(this.get('source')))
      this.get('sourceInstance.widgets').pushObject(this);
  }
});
