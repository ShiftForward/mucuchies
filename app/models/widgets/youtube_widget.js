/**
 * Shows YouTube videos.
 *
 * Expects data from sources in the form:
 * {
 *   youtubeId: "kxopViU98Xo"     // the special id "stop" stops the video currently playing
 *   fullscreen: false
 * }
 */
Dashboard.YoutubeWidget = Dashboard.EmbedWidget.extend({

  youtubeUrl: function() {
    return "";
  }.property(),

  embedUrl: function() {
    return "";
  }.property(),

  updateEmbedUrl: function(key, value, oldValue) {
    var data = this.get('sourceData');
    if (Ember.isNone(data) || (!Ember.isNone(data.youtubeId) && data.youtubeId == "stop")) {
      this.set('title', "");
      this.set('embedUrl', "");
    } else {
      if (!Ember.isNone(data.youtubeId)) {
        this.get('widgetView').$().toggleClass('full-screen', data.fullscreen);
        this.get('widgetView').$().parent().css("z-index", data.fullscreen ? "3" : "2");

        this.set('title', "YouTube");
        this.set('embedUrl', "//www.youtube.com/embed/" + data.youtubeId +
          "?autoplay=1&controls=0&rel=0&showinfo=0&iv_load_policy=3");
      }
    }
  }.observes('sourceData')
});
