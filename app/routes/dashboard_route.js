Dashboard.DashboardRoute = Ember.Route.extend({
  setupController: function(controller) {

    var sources = {};
    $.each(DashboardConfig.grid.sources || {}, function(name, sourceDef) {
      var sourceArgs = sourceDef.args || {};
      sources[name] = eval(sourceDef.className).create(sourceArgs);
    });

    var widgets = DashboardConfig.grid.widgets.map(function(widgetDef) {
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
    });

    controller.set('content', widgets);
  },

  renderTemplate: function() {
    this.render('dashboard');
  }
});
