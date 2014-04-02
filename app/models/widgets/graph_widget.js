/**
 * Widget plotting a simple XY chart.
 *
 * Expects data from sources in the form:
 * [
 *   { x: 1, y: 2 },
 *   { x: 2, y: 4 },
 *   (...)
 * ]
 */
Dashboard.GraphWidget = Dashboard.Widget.extend({
  sourceData: [],

  onContentUpdate: function() {
    if (!Ember.isNone(this.get("widgetView.graph"))) {
      this.get("widgetView.graph").series[0].data = this.get("content");
      this.get("widgetView.graph").render();
    }
  }.observes("content"),

  widgetView: function() {
    var that = this;
    return Ember.View.create({
      templateName: 'graph_widget',
      classNames: ['widget', 'widget-graph'],
      controller: that,
      graph: null,
      didInsertElement: function() {
        var points = that.get('content');
        var margins = Dashboard.GridsterView.get("widgetMargins");
        var dimensions = Dashboard.GridsterView.get("widgetBaseDimensions");
        var width = dimensions[0] * that.get("sizex") + margins[0] * 2 * (that.get("sizex") - 1);
        var height = dimensions[1] * that.get("sizey");
        var graph = new Rickshaw.Graph({
          element: this.$().get()[0],
          width: width,
          height: height,
          series: [{
            color: '#fff',
            data: points
          }]
        });

        var xAxis = new Rickshaw.Graph.Axis.X({ graph: graph });
        var yAxis = new Rickshaw.Graph.Axis.Y({ graph: graph, tickFormat: Rickshaw.Fixtures.Number.formatKMBT });

        graph.render();
        this.set('graph', graph);
      }
    });
  }.property()
});
