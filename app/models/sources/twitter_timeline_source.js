/**
 * Provides tweet data from the timeline of an user. Uses Yahoo's YQL platform as a proxy for the
 * Twitter API in order to avoid cross-origin browser policies.
 *
 * Provides data as an array of Tweet (https://dev.twitter.com/docs/platform-objects/tweets)
 * objects.
 */
Dashboard.TwitterTimelineSource = Dashboard.PeriodicSource.extend({
  period: 30000,

  apiKey: "",
  apiSecret: "",
  accessToken: "",
  accessTokenSecret: "",

  username: "",

  dataUpdate: function(callback) {
    var query = "SELECT * FROM twitter.statuses.user_timeline " +
      "WHERE consumer_key='" + this.get('apiKey') + "' " +
      "AND consumer_secret='" + this.get('apiSecret') + "' " +
      "AND access_token='" + this.get('accessToken') + "' " +
      "AND access_token_secret='" + this.get('accessTokenSecret') + "' " +
      "AND screen_name='" + this.get('username') + "' ";

    var store = "store://datatables.org/alltableswithkeys";

    var url = "https://query.yahooapis.com/v1/public/yql?q=" +
      encodeURIComponent(query) + "&env=" + encodeURIComponent(store) + "&format=json";

    $.get(url, function(data) {
      callback(data.query.results.json.json);
    });
  }
});
