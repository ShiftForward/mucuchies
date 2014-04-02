/**
 * "Abstract" source providing an easy way to implement sources that yield data periodically.
 */
Dashboard.PeriodicSource = Dashboard.Source.extend({
  period: null,
  dataUpdate: null,

  init: function() {
    this._super();
    if (!Ember.isNone(this.get('period')) && !Ember.isNone(this.get('dataUpdate'))) {
      (function periodicCall() {
        var data = this.dataUpdate(this.updateData.bind(this));
        setTimeout(periodicCall.bind(this), this.get('period'));
      }.bind(this))();
    }
  }
});
