/**
 * Shows an iframe with arbitrary content.
 *
 * Expects data from sources in the form:
 * {
 *   embedUrl: "http://src.url.to.show.in.iframe"
 * }
 */
Dashboard.EmbedWidget = Dashboard.Widget.extend({
  src: null,
  templateName: 'embed_widget',
  classNames: ['widget', 'widget-embed']
});
