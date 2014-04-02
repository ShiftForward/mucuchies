/**
 * Shows an arbitrary number along with an indicator showing if the number increased or decreased in
 * relation to its previous update.
 *
 * Expects data from sources as a single number.
 */
Dashboard.NumberWidget = Dashboard.Widget.extend({
  sourceData: 0,
  previous: 0,
  templateName: 'number_widget',
  classNames: ['widget', 'widget-number'],
  preUnit: "",
  postUnit: "",

  formattedValue: function() {
    return this.get("preUnit") + this.get("content") + this.get("postUnit");
  }.property("content"),

  difference: function() {
    var res = "";
    if (this.get("previous") != 0) {
      res = Math.abs(Math.round((this.get("content") - this.get("previous")) / this.get("previous") * 100));
      res += "%";
    }
    this.set("previous", this.get("content"));
    return res;
  }.property("content"),

  arrow: function() {
    if (this.get("content") > this.get("previous"))
      return "icon-arrow-up";
    else
      return "icon-arrow-down";
  }.property("content")
});
