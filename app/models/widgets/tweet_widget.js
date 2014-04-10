/**
 * Shows tweets one by one from a list of tweets.
 *
 * Expects data from sources as arrays of Tweet
 * (https://dev.twitter.com/docs/platform-objects/tweets) objects.
 */
Dashboard.TweetWidget = Dashboard.FlippableWidget.extend({
  sourceData: [],
  templateName: 'twitter_widget',
  classNames: ['widget', 'widget-twitter'],

  rotatePeriod: 10000,
  nextItemIdx: 0,

  timeAgo: function() {
    return this.get('content') ? moment(this.get('content.created_at')).fromNow() : "";
  }.property('content'),

  nextItem: function(allData) {
    if (allData.length == 0)
      return null;

    var toShow = this.get('nextItemIdx');
    if (toShow >= allData.length) toShow = 0;
    this.set('nextItemIdx', (toShow + 1) % allData.length);

    return allData[toShow];
  },

  rotateItem: function() {
    this.animateData(this.nextItem(this.get('sourceData')));
  },

  sourceDataObserver: function() {
    this.set('nextItemIdx', 0);
    if (!this.get('content'))
      this.set('content', this.nextItem(this.get('sourceData')));
  }.observes('sourceData'),

  init: function() {
    this._super();
    this.set('content', null);
    setInterval(this.rotateItem.bind(this), this.get('rotatePeriod'));
  }
});
