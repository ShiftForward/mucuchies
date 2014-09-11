/**
 * Provides data from an an Atmosphere (https://github.com/Atmosphere/atmosphere) socket.
 *
 * The data is provided to widgets as returned in the response body of the received messages.
 */
Dashboard.AtmosphereSource = Dashboard.Source.extend({
  url: null,
  contentType: null,
  onOpen: function(request) {},
  preMessage: function(data) { return data; },

  subSocket: null,

  send: function(data) {
    this.get('subSocket').send(data);
  },

  init: function() {
    this._super();
    if (!Ember.isEmpty(this.get('url'))) {
      var socket = $.atmosphere;

      var request = {
        url: this.get('url'),
        contentType: this.get("contentType"),
        logLevel: "debug",
        transport: "websocket",
        trackMessageLength : true,
        fallbackTransport: "long-polling"
      };

      var that = this;

      request.onOpen = function(request) {
        if (!Ember.isNone(that.get('onOpen')))
          that.onOpen(that.get('subSocket'));
      };

      request.onMessage = function(rs) {
        if (!Ember.isNone(rs.responseBody))
          that.updateData(that.preMessage(rs.responseBody));
      };

      this.set('subSocket', socket.subscribe(request));
    }
  }
});
