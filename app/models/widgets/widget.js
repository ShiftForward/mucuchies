/**
 * Base class of all widgets.
 */
Dashboard.Widget = Ember.Object.extend({
  row: 1,
  col: 1,
  sizex: 1,
  sizey: 1,
  sourceData: null,
  source: null,
  title: null,
  classNames: ['widget'],
  showLastUpdated: false,
  lastUpdate: null,

  widgetView: function() {
    var that = this;
    return Ember.View.extend({
      templateName: that.get('templateName'),
      classNames: that.get('classNames'),
      controller: that
    });
  }.property(),

  content: function() {
    return this.get('sourceData');
  }.property('sourceData'),

  updateLastUpdated: function() {
    this.set('lastUpdate', new Date().getTime());
  }.observes('content'),

  lastUpdatedMessage: function() {
    return "Last updated at " + moment(this.get('lastUpdate')).format('HH:mm');
  }.property('lastUpdate'),

  init: function() {
    if (!Ember.isNone(this.get('source')))
      this.get('source.widgets').pushObject(this);
  }
});
