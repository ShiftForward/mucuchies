/**
 * Shows information about the stock of a publically traded company.
 *
 */
Dashboard.StockWidget = Dashboard.Widget.extend({
  sourceData: [],
    
  stockerFiller: function(){
    var c = this.get("content");

    for(var i=0; i < c.lenght; i++){

     c[i].symbol;
     c[i].LastTradePriceOnly;
     c[i].PercentChange;
     c[i].MarketCapitalization;

                                   }
  return c;
  }.property("content"),


  title: 'Ad Tech Stocks',
  showLastUpdated: true,

  
  templateName: 'stock_widget',
  classNames: ['widget', 'widget-stock']
 

});
