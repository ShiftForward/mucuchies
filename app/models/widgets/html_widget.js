/**
 * Widget showing arbitrary HTML code.
 *
 * Expects data from sources as HTML strings or elements.
 */
Dashboard.HtmlWidget = Dashboard.Widget.extend({
  templateName: 'html_widget',
  classNames: ['widget', 'widget-text']
});
