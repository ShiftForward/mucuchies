/**
 * Shows an arbitrary number along with an indicator showing if the number increased or decreased in
 * relation to its previous update.
 *
 * Expects data from sources as a single number.
 */
Dashboard.NumberWidget = Dashboard.Widget.extend(Dashboard.SmoothHelper, {
  sourceData: 0,
  previous: 0,
  templateName: 'number_widget',
  classNames: ['widget', 'widget-number'],
  preUnit: "",
  postUnit: "",
  currentValue: 0,
  differencePercentage: 0,
  arrow: 'icon-arrow-down',

  onChangeContent: function() {
    this.setSmooth('currentValue', this.get('content'));
    if (this.get('previous') != 0)
      this.setSmooth('differencePercentage', Math.abs(Math.round((this.get('content') - this.get('previous')) / this.get('previous') * 100)));
    if (this.get('content') > this.get('previous'))
      this.set('arrow', 'icon-arrow-up');
    else
      this.set('arrow', 'icon-arrow-down');
    this.set('previous', this.get('content'));
  }.observes('content'),

  formattedValue: function() {
    return this.get('preUnit') + Math.round(this.get('currentValue')) + this.get('postUnit');
  }.property('currentValue'),

  difference: function() {
    return Math.round(this.get('differencePercentage')) + "%";
  }.property('differencePercentage')
});
