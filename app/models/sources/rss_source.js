/**
 * Provides data from a RSS feed.
 *
 * The data is provided in the form:
 * {
 *   title: "feed title",
 *   entries: [
 *     {
 *       title: "item title",
 *       author: "optional author",
 *       publishedDate: "published date"
 *     },
 *     (...)
 *   ]
 * }
 */
Dashboard.RssSource = Dashboard.PeriodicSource.extend({
  period: 30 * 60000,
  feedUrl: "",

  loaded: false,

  feed: function() {
    return this.get('loaded') ? new google.feeds.Feed(this.get('feedUrl')) : null;
  }.property('feedUrl', 'loaded'),

  dataUpdate: function(callback) {
    if(this.get('feed')) {
      this.get('feed').load(function(result) {
        if (!result.error) callback(result.feed);
      }.bind(this));
    }
  },

  init: function() {
    this._super();
    google.load("feeds", "1", {
      callback: function() {
        this.set('loaded', true);
        this.dataUpdate(this.updateData.bind(this));
      }.bind(this)
    });
  }
});
