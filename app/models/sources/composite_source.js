/**
 * A pseudo-source that combines multiple given sources into one. It allows the option of declaring
 * a namespace where each individual source data will stored in the combined source.
 */
Dashboard.CompositeSource = Dashboard.Source.extend({
  sources: [],
  compositeData: {},

  sourceInstances: function() {
    return this.get('sources').map(function(source){
      var namespace = Ember.isNone(source.namespace) ? "" : "." +  source.namespace;
      return { source: Dashboard.SourceFactory.fromDef(source), namespace: namespace }
    });
  }.property('sources'),

  updateData: function(data, namespace) {
    this.get('widgets').forEach(function(widget) {
      widget.set('sourceData', data);
      widget.notifyPropertyChange('sourceData' + namespace);
    });
    this.set('latestData', data);
  },

  init: function() {
    var that = this;
    this.get('sourceInstances').forEach(function (srcDef) {
      srcDef.source.get('widgets').pushObject(Ember.Object.createWithMixins({
        sourceData: null,
        onUpdateData: function () {
          that.set('compositeData' + srcDef.namespace, this.get('sourceData'));
          that.updateData(that.get('compositeData'), srcDef.namespace);
        }.observes('sourceData')
      }));
    });
  }
});
