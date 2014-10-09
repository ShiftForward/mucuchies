/**
 * Provides tweets shown in a given Twitter query. Uses Yahoo's YQL platform as a proxy for the
 * Twitter API in order to avoid cross-origin browser policies.
 *
 * Provides data as an array of Tweet (https://dev.twitter.com/docs/platform-objects/tweets)
 * objects.
 */
Dashboard.TwitterSearchSource = Dashboard.PeriodicSource.extend(Dashboard.YqlHelper, {
  period: 30000,

  apiKey: "",
  apiSecret: "",
  accessToken: "",
  accessTokenSecret: "",

  query: "",

  dataUpdate: function(callback) {
    var query = "SELECT * FROM twitter.search.tweets " +
      "WHERE consumer_key='" + this.get('apiKey') + "' " +
      "AND consumer_secret='" + this.get('apiSecret') + "' " +
      "AND access_token='" + this.get('accessToken') + "' " +
      "AND access_token_secret='" + this.get('accessTokenSecret') + "' " +
      "AND q='" + this.get('query') + "' ";

    $.get(this.queryUrl(query), function(data) {
      callback(data.query.results.json.statuses);
    });
  }
});
