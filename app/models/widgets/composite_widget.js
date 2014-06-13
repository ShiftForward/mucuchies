Dashboard.CompositeWidget = Dashboard.Widget.extend({
  sourceData: 0,
  widgets: [],

  autoRotate: true,
  rotatePeriod: 10000,

  widgetInstances: function() {
    var overrideArgs = {
      pos: [this.get('row'), this.get('col')],
      size: [this.get('sizex'), this.get('sizey')]
    };

    return this.get('widgets').map(function(widgetDef) {
      return Dashboard.WidgetFactory.fromDef(
        $.extend(widgetDef, overrideArgs));
    });
  }.property('widgets'),

  currentWidget: function() {
    return this.get('widgetInstances')[this.get('content')];
  }.property('widgetInstances', 'content'),

  widgetView: function() {
    return this.get('currentWidget.widgetView');
  }.property('currentWidget'),

  init: function() {
    this._super();

    if(this.get('autoRotate')) {
      var that = this;
      setInterval(function() {
        var next = (that.get('sourceData') + 1) % that.get('widgets').length;
        that.set('sourceData', next);
      }, this.get('rotatePeriod'));
    }
  }
});
