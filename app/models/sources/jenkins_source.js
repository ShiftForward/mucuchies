/**
 * Provides data about the build statuses in a Jenkins server. Requires JSONP to be active.
 *
 * The data is provided in the form:
 * [
 *   { name: "Project 1", color: "blue" },
 *   { name: "Project 2", color: "red" },
 *   { name: "Project 3", color: "disabled" },
 *   (...)
 * ]
 */
Dashboard.JenkinsSource = Dashboard.PeriodicSource.extend({
  period: 60000,

  baseUrl: null,
  username: null,
  password: null,
  view: "All",

  dataUpdate: function(callback) {
    var url = this.get('baseUrl') + "/view/" + this.get('view') + "/api/json";

    $.ajax({
      url: url,
      dataType: "jsonp",
      jsonp: "jsonp",
      success: function(data) {
        callback(
          data.jobs.filter(function(job) {
            return job.color != "disabled";
          }).map(function (job) {
            return { name: job.name, color: job.color };
          }));
      },
      beforeSend: function(req) {
        if(this.get('username')) {
          var authString = btoa(this.get('username') + ":" + this.get('password'));
          req.setRequestHeader('Authorization', "Basic " + authString);
        }
      }.bind(this)
    });
  }
});
