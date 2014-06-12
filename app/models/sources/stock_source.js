/**
 *
 */
Dashboard.StockSource = Dashboard.PeriodicSource.extend({
  period: 10000,
  compNames: [],

  dataUpdate: function(callback) {
    var select = this.get("compNames");
    var query = "select * from yahoo.finance.quotes where symbol in(\""+select+"\")";
    var queryEnv = "store://datatables.org/alltableswithkeys";
    
    var url = "http://query.yahooapis.com/v1/public/yql?q=" +
      encodeURIComponent(query) + "&env="+encodeURIComponent(queryEnv)+"&format=json";

    $.get(url, function(data) {
      quotes = [];
      quotes = data.query.results.quote;

      callback(quotes);


    });
  }
});
