/**
 * Provides bitcoin ticker data from Bitstamp.
 *
 * The data is provided to widgets as single floating point values.
 */
Dashboard.WorldCupSource = Dashboard.PeriodicSource.extend({
 
  inGame: false,
 
  period: function() {
    return this.get('inGame') ? 30000 : 5 * 60000;
  }.property(),
 
  dataUpdate: function(callback) {
    $.get("http://worldcup.sfg.io/matches/today", function(data) {
      callback(data.map(function(match) {

        return match.home_team.code + " " + match.home_team.goals + "-" +
          match.away_team.goals + " " + match.away_team.code;
          
      }));
    });
  }
});
