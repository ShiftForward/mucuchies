Dashboard.WidgetFactory = Ember.Object.create({

  fromDef: function(widgetDef, sources) {
    sources = sources || {};
    var pos = widgetDef.pos;
    var size = widgetDef.size || [1, 1];
    var widgetArgs = widgetDef.args || {};

    if (widgetDef.source) {
      var sourceArgs = widgetDef.sourceArgs || {};
      widgetArgs.source =
        sources[widgetDef.source] || eval(widgetDef.source).create(sourceArgs);
    }

    return eval(widgetDef.widget).create($.extend(widgetArgs, {
      row: pos[0], col: pos[1], sizex: size[0], sizey: size[1]
    }));
  }
});
