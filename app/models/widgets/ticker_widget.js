Dashboard.TickerWidget = Dashboard.Widget.extend({
  sourceData: "",

  templateName: 'ticker_widget',
  classNames: ['widget', 'widget-ticker'],

  widgetView: function() {
    var widget = this;

  	return this._super().reopen({
  	  didInsertElement: function() {
        var scaleFactor = 0.5;
        var scaleSource = this.$().height();

        var fontSize = scaleSource * scaleFactor;

        var widgetUnitWidth = (DashboardConfig.grid.width - DashboardConfig.widgetMargins) /
          DashboardConfig.dim[0] - DashboardConfig.widgetMargins;

        var widgetWidth = widgetUnitWidth * widget.get('sizex') +
          DashboardConfig.widgetMargins * (widget.get('sizex') - 1) - 5;

        this.$().css('font-size', fontSize + 'px');
        this.$('.marquee').css('max-width', widgetWidth + 'px');
      }
  	});
  }.property()
});
