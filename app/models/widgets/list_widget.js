/**
 * Shows an arbitrary list.
 *
 * Expects data from sources in the form:
 * [
 *   { label: "title 1", value: "subtitle 1" },
 *   { label: "title 2", value: "subtitle 2" },
 *   (...)
 * ]
 */
Dashboard.ListWidget = Dashboard.Widget.extend({
  sourceData: [],
  templateName: 'list_widget',
  classNames: ['widget', 'widget-list']
});
