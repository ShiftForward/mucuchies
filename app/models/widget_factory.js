/**
 * An object that builds widgets given their definition as seen in the config examples.
 * Concretely, it accepts definitions with the following format:
 * {
 *   pos: [2, 2],                       // the widget position on the grid
 *   size: [1, 1],                      // the size of the widget in grid units
 *   widget: 'Dashboard.RssWidget',     // the widget class name
 *   source: 'Dashboard.RssSource',     // the source class name or interned source name
 *   args: { rotatePeriod: 15000 },     // the arguments passed to the widget
 *   sourceArgs: {                      // the arguments passed to the source, if a class was provided
 *     feedUrl: "http://rss.slashdot.org/Slashdot/slashdot"
 *   }
 */
Dashboard.WidgetFactory = Ember.Object.create({

  fromDef: function(widgetDef) {
    var pos = widgetDef.pos;
    var size = widgetDef.size || [1, 1];
    var widgetArgs = widgetDef.args || {};

    if (widgetDef.source) {
      widgetArgs.source = Dashboard.SourceFactory.fromDef({
        className: widgetDef.source,
        args: widgetDef.sourceArgs || {}
      });
    }

    return eval(widgetDef.widget).create($.extend(widgetArgs, {
      row: pos[0], col: pos[1], sizex: size[0], sizey: size[1]
    }));
  }
});
