/**
 * Shows arbitrary text in a news ticker-like fashion.
 *
 * The widget is designed to have a very small height in comparison to its width. This can be
 * achieved by increasing the granularity of the widget sizes in the config, e.g. by setting the
 * `dim[1]` of the grid to a high value and scaling accordingly the heights of the existing
 * widgets.
 *
 * Expects data from sources as simple strings.
 */
Dashboard.TickerWidget = Dashboard.Widget.extend({
  sourceData: "",

  templateName: 'ticker_widget',
  classNames: ['widget', 'widget-ticker'],

  widgetView: function() {
    var widget = this;

    return this._super().reopen({
      didInsertElement: function() {
        var scaleFactor = 0.7;
        var widgetHeight = this.$().height();

        var fontSize = widgetHeight * scaleFactor;

        var widgetUnitWidth = (DashboardConfig.grid.width - DashboardConfig.widgetMargins) /
          DashboardConfig.dim[0] - DashboardConfig.widgetMargins;

        var widgetWidth = widgetUnitWidth * widget.get('sizex') +
          DashboardConfig.widgetMargins * (widget.get('sizex') - 1) - 5;

        this.$().css('font-size', fontSize + 'px');
        this.$().css('max-width', widgetWidth + 'px');
      }
    });
  }.property()
});
