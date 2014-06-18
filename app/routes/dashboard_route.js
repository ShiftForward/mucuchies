Dashboard.DashboardRoute = Ember.Route.extend({
  setupController: function(controller) {

    $.each(DashboardConfig.grid.sources || {}, function(name, sourceDef) {
      Dashboard.SourceFactory.intern(name, Dashboard.SourceFactory.fromDef(sourceDef));
    });

    var widgets = DashboardConfig.grid.widgets.map(function(widgetDef) {
      return Dashboard.WidgetFactory.fromDef(widgetDef);
    });

    controller.set('content', widgets);
  },

  renderTemplate: function() {
    this.render('dashboard');
  }
});
