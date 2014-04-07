Dashboard.SmoothHelper = Ember.Mixin.create({
  _smoothHelperInterval: 10,
  _smoothHelperDuration: 1000,

  _smoothHelperProperties: function() {
    return {};
  }.property(),

  setSmooth: function(property, value, duration) {
    var p = this.get('_smoothHelperProperties');
    var d = typeof duration !== 'undefined' ? duration : this.get('_smoothHelperDuration');
    if (p[property] && p[property].intervalCall) {
      clearInterval(p[property].intervalCall);
    }
    p[property] = {
      initialValue: this.get(property),
      targetValue: value,
      currentX: 0,
      step: Math.PI / (d / this.get('_smoothHelperInterval') * 2)
    };
    var that = this;
    p[property].intervalCall = setInterval(function() {
      if (p[property].currentX >= Math.PI / 2)
        clearInterval(p[property].intervalCall);
      else {
        that.set(property, p[property].initialValue + (p[property].targetValue - p[property].initialValue) * Math.sin(p[property].currentX));
        p[property].currentX = p[property].currentX + p[property].step;
      }
    }, this.get('_smoothHelperInterval'));
  }
});
