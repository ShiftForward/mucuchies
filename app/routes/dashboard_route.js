Dashboard.DashboardRoute = Ember.Route.extend({
  setupController: function(controller) {

    var sources = {};
    $.each(DashboardConfig.grid.sources || {}, function(name, sourceDef) {
      var sourceArgs = sourceDef.args || {};
      sources[name] = eval(sourceDef.className).create(sourceArgs);
    });

    var widgets = DashboardConfig.grid.widgets.map(function(widgetDef) {
      return Dashboard.WidgetFactory.fromDef(widgetDef, sources);
    });

    controller.set('content', widgets);
  },

  renderTemplate: function() {
    this.render('dashboard');
  }
});
