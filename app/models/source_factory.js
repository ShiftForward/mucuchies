/**
 * An object that builds sources given their definition as seen in the config examples.
 * Concretely, it accepts definitions with the following format:
 * {
 *   className: 'Dashboard.PeriodicSource', // the source class name or interned source name
 *   args: { period: 10000 }                // the arguments passed to the source, if a class was provided
 * }
 */
Dashboard.SourceFactory = Ember.Object.create({
  internedSources: {},

  fromDef: function(sourceDef) {
    var sourceArgs = sourceDef.args || {};
    return this.internedSources[sourceDef.className] ||
      eval(sourceDef.className).create(sourceArgs);
  },

  intern: function(name, source) {
    this.internedSources[name] = source;
  }
});
