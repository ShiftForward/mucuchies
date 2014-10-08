Dashboard.YqlHelper = Ember.Mixin.create({
  yqlBaseEndpoint: "http://query.yahooapis.com/v1/public/yql",
  queryEnv: "store://datatables.org/alltableswithkeys",

  queryUrl: function(query) {
    return this.get('yqlBaseEndpoint') +
      "?q=" + encodeURIComponent(query) +
      "&env=" + encodeURIComponent(this.get('queryEnv')) +
      "&format=json";
  }
});
