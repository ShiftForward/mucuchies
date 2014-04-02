/**
 * Shows the information about Scrum tasks.
 *
 * Expects data from sources in the form:
 * [
 *   {
 *     task: "task name",
 *     pointsTotal: 200,
 *     pointsDone: 100,
 *     assignedTo: [
 *       { name: "person assigned to the task", avatarUrl: "http://url.to.his.her.avatar" },
 *       { name: "other person", avatarUrl: "http://url.to.his.her.avatar" },
 *       (...)
 *     ]
 *   },
 *   (...)
 * ]
 */
Dashboard.ScrumWidget = Dashboard.FlippableWidget.extend({
  sourceData: [],
  templateName: 'scrum_widget',
  classNames: ['widget', 'widget-list', 'widget-scrum'],

  maxTasks: 3,
  currTaskIdx: 0,

  nextSlice: function(allData) {
    var start = this.get('currTaskIdx');
    var rotated = allData.slice(start);

    var nextStart = start + this.get('maxTasks');
    this.set('currTaskIdx', nextStart >= allData.length ? 0 : nextStart);

    return rotated.slice(0, this.get('maxTasks'));
  },

  sourceDataObserver: function() {
    var subsetData = this.nextSlice(this.get('sourceData'));
    this.animateData(subsetData);
  }.observes('sourceData'),

  init: function() {
    this._super();
    this.set('content', this.nextSlice(this.get('sourceData')));
  }
});
