Dashboard.AbstractGridsterView = Ember.View.extend({
  templateName: 'gridster',

  screenSize: [DashboardConfig.grid.width, DashboardConfig.grid.height],
  widgetMargins: [DashboardConfig.widgetMargins, DashboardConfig.widgetMargins],

  gridSize: Ember.A(DashboardConfig.dim),

  widgetBaseDimensions: function() {
    var ss = this.get("screenSize");
    var wm = this.get("widgetMargins");
    var gs = this.get("gridSize");

    return [Math.floor(ss[0] / gs[0] - wm[0] * 2),
      Math.floor(ss[1] / gs[1] - wm[1] * 2)];
  }.property("screenSize", "widgetMargins", "gridSize"),

  gridStyle: function() {
    return "width: " + this.get('screenSize')[0] + "px";
  }.property('screenSize.0'),

  didInsertElement: function() {
    this.$(".gridster ul:first").gridster({
      widget_margins: this.get("widgetMargins"),
      widget_base_dimensions: this.get("widgetBaseDimensions")
    });

    var widgetSize = this.get("widgetBaseDimensions");

    // TODO still kind of hardcoded; doesn't work with widgets with size other than 1x1
    $(".front").css("width", widgetSize[0] + "px");
    $(".front").css("height", widgetSize[1] + "px");
  }
});

Dashboard.GridsterView = Dashboard.AbstractGridsterView.create({});
