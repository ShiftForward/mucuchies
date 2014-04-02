/**
 * Widget showing information about a song. Typically it is used for showing the songs currently
 * being played or recently played.
 *
 * Expects data from sources in the form:
 * {
 *   status: "now playing, recently played, ..."
 *   by: "person listening to the song",
 *   imageUrl: "http://url.to.album.art",
 *   track: "track name",
 *   artist: "artist name"
 * }
 */
Dashboard.SongWidget = Dashboard.FlippableWidget.extend({
  title: "",

  sourceData: {
    status: "",
    by: "",
    imageUrl: "",
    track: "",
    artist: ""
  },

  templateName: 'song_widget',
  classNames: ['widget', 'widget-song'],

  coverSize: (DashboardConfig.configName == "1080p" ? "240" : "200")
});
