Dashboard.SmoothHelper = Ember.Mixin.create({
  interval: 10,

  properties: function() {
    return {};
  }.property(),

  setSmooth: function(property, value, duration) {
    var p = this.get('properties');
    var d = typeof duration !== 'undefined' ? duration : 1000;
    if (p[property] && p[property].intervalCall) {
      clearInterval(p[property].intervalCall);
    }
    p[property] = {
      initialValue: this.get(property),
      targetValue: value,
      currentX: 0,
      step: Math.PI / (d / this.get('interval') * 2)
    };
    var that = this;
    p[property].intervalCall = setInterval(function() {
      if (p[property].currentX >= Math.PI / 2)
        clearInterval(p[property].intervalCall);
      else {
        that.set(property, p[property].initialValue + (p[property].targetValue - p[property].initialValue) * Math.sin(p[property].currentX));
        p[property].currentX = p[property].currentX + p[property].step;
      }
    }, this.get('interval'));
  }
});
