/**
 * Provides data from an websocket.
 *
 * The data is provided to widgets as returned in the response body of the received messages.
 * By default, messages are parsed and sent as JSON. That setting can be changed by setting the
 * `jsonContentType` property to false.
 */
Dashboard.WebsocketSource = Dashboard.Source.extend({
  uri: null,
  jsonContentType: true,

  socket: null,

  onOpen: function(evt) {
    console.log('Websocket to ' + this.get('uri') + ' opened');
    this.send(this.get('jsonContentType') ? {} : "");
  },

  onClose: function(evt) {
    console.log('Websocket to ' + this.get('uri') + ' closed');
  },

  onError: function(evt) {
    console.log('Trying to reestablish websocket to ' + this.get('uri') + ' in 3 seconds');
    setTimeout(function() { this.connect(); }.bind(this), 3000);
  },

  preMessage: function(data) { return data; },

  connect: function() {
    socket = new WebSocket(this.get('uri'));
    socket.onopen = this.onOpen.bind(this);
    socket.onclose = this.onClose.bind(this);
    socket.onerror = this.onError.bind(this);

    socket.onmessage = function(evt) {
      if (!Ember.isNone(evt.data)) {
        var data = this.get('jsonContentType') ? JSON.parse(evt.data) : evt.data;
        this.updateData(this.preMessage(data));
      }
    }.bind(this);

    this.set('socket', socket);
  },

  send: function(data) {
    if(this.get('jsonContentType'))
      data = JSON.stringify(data);

    this.get('socket').send(data);
  },

  init: function() {
    this._super();
    if (!Ember.isEmpty(this.get('uri'))) {
      this.connect();
    }
  }
});
