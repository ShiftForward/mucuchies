/**
 * Shows a list of projects with icons representing their status. If the source provides a list with
 * many projects, the widget may require more than one unit of vertical size.
 *
 * Expects data from sources in the form:
 * [
 *   { name: "Project 1", color: "blue" },
 *   { name: "Project 2", color: "red" },
 *   { name: "Project 3", color: "disabled" },
 *   (...)
 * ]
 */
Dashboard.BuildWidget = Dashboard.Widget.extend({
  title: 'Build Status',
  showLastUpdated: true,

  sourceData: [],
  templateName: 'build_widget',
  classNames: ['widget', 'widget-build'],

  // FIXME This is ugly.
  formattedContent: function() {
    var c = this.get("content");
    var data = [];
    for (var i = 0; i < c.length; i++) {
      var elem = "";

      if (c[i].color == "blue")
        elem += '<li class="item passed">';
      else if (c[i].color == "red")
        elem += '<li class="item failed">';
      else
        elem += '<li class="item pending">';

      elem += '<span class="label repo">';
      elem += c[i].name;
      elem += '</span>';
      elem += '<i class="avatar icon-large ';

      if (c[i].color == "blue")
        elem += 'icon-ok-sign';
      else if (c[i].color == "red")
        elem += 'icon-remove-sign';
      else if (c[i].color.indexOf("anime", c[i].color.length - "anime".length) !== -1)
        elem += 'icon-refresh';
      else
        elem += 'icon-question-sign';

      elem += '"></i><div class="clearfix" /></li>';

      data.push(elem);
    }
    return data;
  }.property("content")
});
