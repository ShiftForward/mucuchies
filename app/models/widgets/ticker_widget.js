/*
//
//
*/
Dashboard.TickerWidget = Dashboard.Widget.extend({
  sourceData: "",

  showLastUpdated: true,
  templateName: 'ticker_widget',
  classNames: ['widget', 'widget-ticker'],

  widgetView: function() {
  	return this._super().reopen({
  	  didInsertElement: function() {
        var span = this.$();
        var that = this;

		var setScale = function() {
    		var scaleFactor = 0.5;
    		var scaleSource = span.height();

    		var fontSize = scaleSource * scaleFactor;

    		that.$().css('font-size', fontSize + 'px');
		}

      	setScale();
      }
  	});
  }.property()
});
