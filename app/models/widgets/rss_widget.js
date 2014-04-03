/**
 * Shows the items of a RSS feed.
 *
 * Expects data from sources in the form:
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
Dashboard.RssWidget = Dashboard.FlippableWidget.extend({
  sourceData: { title: "", entries: [] },
  templateName: 'rss_widget',
  classNames: ['widget', 'widget-rss'],

  rotatePeriod: 10000,

  maxItems: 1,
  nextItemIdx: 0,

  title: function() {
    return this.get('sourceData').title;
  }.property('sourceData'),

  entries: function() {
    return this.get('sourceData').entries;
  }.property('sourceData'),

  nextItem: function(allData) {
    console.log("NEXT");
    if(allData.length == 0)
      return null;

    var toShow = this.get('nextItemIdx');
    if(toShow >= allData.length) toShow = 0;
    this.set('nextItemIdx', (toShow + 1) % allData.length);

    return allData[toShow];
  },

  rotateItem: function() {
    this.animateData(this.nextItem(this.get('entries')));
  },

  sourceDataObserver: function() {
    if(!this.get('content'))
      this.set('content', this.nextItem(this.get('entries')));
  }.observes('sourceData'),

  init: function() {
    this._super();
    this.set('content', null);

    var that = this;
    setTimeout(function loop() {
      that.rotateItem();
      setTimeout(loop, that.get('rotatePeriod'));
    }, that.get('rotatePeriod'));
  }
});
