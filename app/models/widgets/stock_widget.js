/**
 * Shows information about the stock of publicly traded companies.
 */
Dashboard.StockWidget = Dashboard.Widget.extend({
  sourceData: [],

  showLastUpdated: true,

  templateName: 'stock_widget',
  classNames: ['widget', 'widget-stock']
});
