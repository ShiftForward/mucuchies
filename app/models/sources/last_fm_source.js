/**
 * Provides data about the songs currently being listened or recently listened by some last.fm
 * members.
 *
 * The data is provided in the form:
 * {
 *   status: "Now playing", // or "Recently played"
 *   by: "last.fm username",
 *   imageUrl: "http://url.to.album.art",
 *   track: "track name",
 *   artist: "artist name"
 * }
 */
Dashboard.LastFmSource = Dashboard.PeriodicSource.extend({
  period: 30000,

  lastFmGroup: null,
  lastFmUsers: [],
  apiKey: null,
  defaultImageUrl: "http://farm1.staticflickr.com/173/436459372_439d5c098c_z.jpg?zz=1",

  currUserIdx: null,

  parseTrack: function(element, username) {
    return {
        status: Boolean(element.attr("nowplaying")) ? "Now playing" : "Recently played",
        by: username,
        imageUrl: $("image[size=extralarge]", element).text() ? $("image[size=extralarge]", element).text() : this.get("defaultImageUrl"),
        track: $("name", element).text(),
        artist: $("artist", element).text(),
        date: Number($("date", element).attr("uts"))
    };
  },

  dataUpdate: function(callback, firstUserIdx, mostRecent) {
    var currUserIdx = this.get("currUserIdx");
    currUserIdx = Ember.isNone(currUserIdx) ? Math.floor(Math.random() * this.get("lastFmUsers").length) : currUserIdx;

    if (currUserIdx == firstUserIdx)
      callback(mostRecent);
    else {
      var username = this.get("lastFmUsers")[currUserIdx];
      firstUserIdx = firstUserIdx || currUserIdx;

      var url = "http://ws.audioscrobbler.com/2.0?method=user.getRecentTracks&api_key=" +
        this.get('apiKey') + "&limit=1&user=" + username;

      var that = this;
      $.get(url, function(data) {
        that.set("currUserIdx", (currUserIdx + 1) % that.get("lastFmUsers").length);

        var nowPlayingTrack = $('recenttracks > track[nowplaying=true]', data);
        if (nowPlayingTrack.length == 1) {
          callback(that.parseTrack(nowPlayingTrack, username));
        } else {
          var recentTrack = that.parseTrack($('recenttracks > track', data), username);
          if (!mostRecent || recentTrack.date > mostRecent.date) {
            mostRecent = recentTrack;
          }

          that.dataUpdate(callback, firstUserIdx, mostRecent);
        }
      });
    }
  },

  init: function() {
    this._super();
    if(!this.get("lastFmUsers") && this.get("lastFmGroup")) {
      console.log("TODO: call API method to retrieve the list of members of the group");
    }
  }
});
