/**
 * An "abstract" widget class that adds to implementations a flipping animation every time the
 * source data changes. See the last.fm widget for an example.
 */
Dashboard.FlippableWidget = Dashboard.Widget.extend({

  widgetView: function() {
    var that = this;
    return Ember.ContainerView.create({
      classNames: ['flippable-widget'],
      childViews: [
        Ember.ContainerView.create({
          classNames: ['rot0', 'flipper'],
          childViews: [
            Ember.View.create({
              templateName: that.get('templateName'),
              classNames: that.get('classNames').concat('front'),
              controller: that
            })
          ]
        })
      ],

      didInsertElement: function() {
        // TODO extract these calculations to a global location
        var widgetUnitWidth = (DashboardConfig.grid.width - DashboardConfig.widgetMargins) /
          DashboardConfig.dim[0] - DashboardConfig.widgetMargins;

        var widgetWidth = widgetUnitWidth * that.get('sizex') +
          DashboardConfig.widgetMargins * (that.get('sizex') - 1) - 5;

        var widgetUnitHeight = (DashboardConfig.grid.height - DashboardConfig.widgetMargins) /
          DashboardConfig.dim[1] - DashboardConfig.widgetMargins;

        var widgetHeight = widgetUnitHeight * that.get('sizey') +
          DashboardConfig.widgetMargins * (that.get('sizey') - 1) - 5;

        this.$('.front').css('width', widgetWidth + "px");
        this.$('.front').css('height', widgetHeight + "px");
      }
    });
  }.property(),

  sourceDataObserver: function() {
    this.animateData(this.get('sourceData'));
  }.observes('sourceData'),

  animateData: function(newData) {
    if(JSON.stringify(newData) == JSON.stringify(this.get('content'))) {
      return;
    }
    var that = this;
    if (!Ember.isNone(this.get('widgetView'))) {
      this.get('widgetView').$(".flipper").removeClass("disable-animation");
      this.get('widgetView').$(".rot0").removeClass("rot0").addClass("rot90");

      Ember.run.later(this, function() {
        this.get('widgetView').$(".flipper").addClass("disable-animation");
        this.get('widgetView').$(".rot90").addClass("invert");
        that.set('content', newData);

        Ember.run.next(this, function() {
          this.get('widgetView').$(".flipper").removeClass("disable-animation");
          this.get('widgetView').$(".rot90").removeClass("rot90").addClass("rot180");

          Ember.run.later(this, function() {
            this.get('widgetView').$(".flipper").addClass("disable-animation");
            this.get('widgetView').$(".rot180").removeClass("rot180").addClass("rot0").removeClass("invert");
          }, 600);
        });
      }, 600);
    }
  },

  content: function() {
    return {};
  }.property(),

  init: function() {
    this._super();
    this.set('content', this.get('sourceData'));
  }
});
