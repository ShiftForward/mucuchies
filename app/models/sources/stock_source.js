/**
 * Provides stock data from the Yahoo API.
 *
 * Provides as an array of objects in the given format:
 * {
 *   symbol: "RUBI",
 *   LastTradePriceOnly: 10.01,
 *   PercentChange: "+1.01%",
 *   MarketCapitalization: "464.4M"
 * }
 */
Dashboard.StockSource = Dashboard.PeriodicSource.extend(Dashboard.YqlHelper, {
  period: 10000,
  compNames: [],

  dataUpdate: function(callback) {
    var select = this.get("compNames").toString();
    var query = "select * from yahoo.finance.quotes where symbol in(\""+select+"\")";

    $.get(this.queryUrl(query), function(data) {
      callback(data.query.results.quote);
    });
  }
});
