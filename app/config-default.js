DashboardConfig = {
  configName: 'default',

  dim: [4, 2],

  widgetMargins: 5,

  grid: {
    width: 1480,
    height: 820,

    sources: {
      tasksSource: {
        className: 'Dashboard.PeriodicSource',
        args: {
          period: 10000,
          dataUpdate: function(callback) {
            callback([
              {
                task: "Random task",
                pointsTotal: 3,
                pointsDone: 1,
                assignedTo: [{
                  name: "ruippeixotog",
                  avatarUrl: "https://s.gravatar.com/avatar/77db744fe19ef16f523eb97d98d13459?s=30"
                }]
              },
              {
                task: "Considerable stuff",
                pointsTotal: 8,
                pointsDone: 4,
                assignedTo: [{
                  name: "jcazevedo",
                  avatarUrl: "https://s.gravatar.com/avatar/7724a3ee1890f271f424878b0524ae15?s=30"
                }, {
                  name: "andrebeat",
                  avatarUrl: "https://s.gravatar.com/avatar/63537cab97f0190f063c49da088bb509?s=30"
                }]
              },
              {
                task: "Serious biz",
                pointsTotal: 15,
                pointsDone: 3,
                assignedTo: [{
                  name: "andrebeat",
                  avatarUrl: "https://s.gravatar.com/avatar/63537cab97f0190f063c49da088bb509?s=30"
                }]
              },
              {
                task: "Minor thing",
                pointsTotal: 1,
                pointsDone: 0,
                assignedTo: [{
                  name: "ruippeixotog",
                  avatarUrl: "https://s.gravatar.com/avatar/77db744fe19ef16f523eb97d98d13459?s=30"
                }]
              }
            ])
          }
        }
      }
    },

    widgets: [
      {
        pos: [1, 1],
        widget: 'Dashboard.WeatherWidget',
        source: 'Dashboard.WeatherSource',
        sourceArgs: { woeId: 746203 }
      },
      {
        pos: [1, 2],
        widget: 'Dashboard.TweetWidget',
        source: 'Dashboard.TwitterTimelineSource',
        sourceArgs: {
          username: "shift_forward",

          // Get your Twitter API keys and secrets by creating a new app at
          // https://apps.twitter.com. Please avoid using the keys in the demo!
          apiKey: "YOUR_API_KEY_HERE",
          apiSecret: "YOUR_API_SECRET_HERE",
          accessToken: "YOUR_ACCESS_TOKEN_HERE",
          accessTokenSecret: "YOUR_ACCESS_TOKEN_SECRET_HERE"
        }
      },
      {
        pos: [1, 3],
        widget: 'Dashboard.ClockWidget',
        source: 'Dashboard.TimeSource'
      },
      {
        pos: [1, 4],
        size: [1, 2],
        widget: 'Dashboard.BuildWidget',
        source: 'Dashboard.JenkinsSource',
        sourceArgs: {
          baseUrl: "https://jenkins.qa.ubuntu.com",
          view: "PS"
        }
      },
      {
        pos: [2, 1],
        widget: 'Dashboard.ScrumWidget',
        source: 'tasksSource',
        args: { title: "Sprint" }
      },
      {
        pos: [2, 2],
        widget: 'Dashboard.RssWidget',
        source: 'Dashboard.RssSource',
        args: { rotatePeriod: 15000 },
        sourceArgs: {
          feedUrl: "http://rss.slashdot.org/Slashdot/slashdot"
        }
      },
      {
        pos: [2, 3],
        widget: 'Dashboard.SongWidget',
        source: 'Dashboard.LastFmSource',
        sourceArgs: {
          lastFmUsers: ["ruippeixotog", "jcazevedo", "beat1", "bytter", "skyh0rse"],

          // Get your Last.fm API key at http://www.last.fm/api/account/create. Please avoid using
          // the keys in the demo!
          apiKey: "YOUR_API_KEY_HERE"
        }
      }
    ]
  }
};
