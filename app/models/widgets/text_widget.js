/**
 * Shows arbitrary text.
 *
 * Expects data from sources as strings.
 */
Dashboard.TextWidget = Dashboard.Widget.extend({
  sourceData: "",
  templateName: 'text_widget',
  classNames: ['widget', 'widget-text']
});
