/**
 * Provides the list of open merge requests for a given GitLab project.
 *
 * Provides data in the form:
 * [
 *   {
 *     title: "merge request title",
 *     repository: "repository name"
 *     repository_avatar: "url to repository avatar"
 *     author: {
 *       username: "author username",
 *       display_name: "author name",
 *       links: {
 *         avatar: {
 *           href: "url to author avatar"
 *         }
 *       }
 *     },
 *     participants: [
 *       {
 *         approved: true,
 *         user: {
 *           username: "participant username",
 *           display_name: "participant name",
 *           links: {
 *             avatar: {
 *               href: "url to participant avatar"
 *             }
 *           }
 *         }
 *       },
 *       (...)
 *     ]
 *   },
 *   (...)
 * ]
 */
Dashboard.GitLabMergeRequestSource = Dashboard.PeriodicSource.extend({
  period: 120000,

  gitLabHost: "https://gitlab.com",
  privateToken: "",
  repoOwner: "",
  repoName: "",

  baseUrl: function() {
    return this.get('gitLabHost') + "/api/v3/projects/" + this.get('repoOwner') + "%2F" + this.get('repoName');
  }.property('gitLabHost', 'repoOwner', 'repoName'),

  dataUpdate: function(callback) {
    var that = this;

    var apiGet = function(path, callback) {
      $.ajax({
        url: that.get('baseUrl') + path,
        type: "GET",
        beforeSend: function(xhr) {
          xhr.setRequestHeader('PRIVATE-TOKEN', that.get('privateToken'));
        },
        success: callback
      })
    };

    apiGet("", function(proj) {
      apiGet("/merge_requests?state=opened", function(pullRequests) {
        callback(
          pullRequests.map(function(pr) {
            return {
              title: pr.title,
              repository: proj.name,
              repository_avatar: proj.avatar_url,
              author: {
                username: pr.author.username,
                display_name: pr.author.name,
                links: { avatar: { href: pr.author.avatar_url } }
              },
              // TODO fill this with the list of approvers when there is an API for that
              participants: !pr.assignee ? [] : [
                {
                  approved: false,
                  user: {
                    username: pr.assignee.username,
                    display_name: pr.assignee.display_name,
                    links: { avatar: { href: pr.assignee.avatar_url } }
                  }
                }
              ]
            }
          })
        );
      });
    });
  }
});
