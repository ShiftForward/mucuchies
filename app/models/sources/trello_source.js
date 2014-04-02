/**
 * Provides data from a Trello list. Requires creating a Trello app key and adding its client
 * library (https://trello.com/docs/gettingstarted/clientjs.html) to the javascript dependencies.
 * It recognizes points done/to do in task names as used by the Scrum for Trello
 * (https://chrome.google.com/webstore/detail/scrum-for-trello/jdbcdblgjdpmfninkoogcfpnkjmndgje?hl=en)
 * plugin, but its use is not mandatory.
 *
 * Provides data in the form:
 * [
 *   {
 *     task: "task name",
 *     pointsTotal: 200,                                  // or "?" if not defined
 *     pointsDone: 100,                                   // or 0 if not defined
 *     assignedTo: [
 *       { name: "username", emailHash: "email_hash" },   // Dashboard.TrelloMember instance
 *       { name: "username2", emailHash: "email_hash2" },
 *       (...)
 *     ]
 *   },
 *   (...)
 * ]
 */
Dashboard.TrelloMember = Ember.Object.extend({
  name: null,
  emailHash: null,

  avatarUrl: function() {
    return "http://www.gravatar.com/avatar/" + this.get('emailHash') + ".jpg?s=30";
  }.property('emailHash')
});

Dashboard.TrelloSource = Dashboard.PeriodicSource.extend({
  period: 45000,

  token: null,
  listId: null,

  apiPath: function() {
    return "lists/" + this.get('listId') + "/cards?" + "&token=" + this.get('token');
  }.property('token', 'listId'),

  dataUpdate: function(callback) {
    var that = this;
    Trello.get(this.get('apiPath'), function(data) {
      var patt = /(?:\((\d*)\) )?(?:\[(\d*)\] )?(.*)/;

      var tasks = [];
      for(var i = 0; i < data.length; i++) {
        var assignedTo = [];
        for(var j = 0; j < data[i].idMembers.length; j++) {
          assignedTo.push(Dashboard.TrelloMember.create(that.get('userInfo')[data[i].idMembers[j]]));
        }

        var parsedTask = data[i].name.match(patt);
        tasks.push({
          task: parsedTask[3],
          pointsTotal: Ember.isNone(parsedTask[1]) ? "?" : parseInt(parsedTask[1]),
          pointsDone: parseInt(parsedTask[2] || "0"),
          assignedTo: assignedTo
        });
      }
      callback(tasks);
    });
  }
});
