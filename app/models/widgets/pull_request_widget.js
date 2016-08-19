/**
 * Shows a list of pull requests and respective participants.
 *
 * Expects data from sources in the form:
 * [
 *   {
 *     title: "pull request title",
 *     author: {
 *       username: "author username",
 *       display_name: "author name",
 *       links: {
 *         avatar: {
 *           href: "url to author avatar"
 *         }
 *       }
 *     },
 *     participants: [
 *       {
 *         approved: true,
 *         user: {
 *           username: "participant username",
 *           display_name: "participant name",
 *           links: {
 *             avatar: {
 *               href: "url to participant avatar"
 *             }
 *           }
 *         }
 *       },
 *       (...)
 *     ]
 *   },
 *   (...)
 * ]
 */
Dashboard.PullRequestWidget = Dashboard.FlippableWidget.extend({
  sourceData: [],
  templateName: 'pull_request_widget',
  classNames: ['widget', 'widget-list', 'widget-pull-request'],

  rotatePeriod: 10000,

  maxRequests: 3,
  currReqIdx: 0,

  nextSlice: function(allData) {
    var start = this.get('currReqIdx');
    var rotated = allData.slice(start);

    var nextStart = start + this.get('maxRequests');
    this.set('currReqIdx', nextStart >= allData.length ? 0 : nextStart);

    return rotated.slice(0, this.get('maxRequests'));
  },

  rotateItem: function() {
    this.animateData(this.nextSlice(this.get('sourceData')));
  },

  sourceDataObserver: function() {
    var subsetData = this.nextSlice(this.get('sourceData'));
    this.animateData(subsetData);
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
