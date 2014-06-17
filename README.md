# Mucuchies

Mucuchies is the engine behind [ShiftForward][shiftforward]'s dashboard. It
follows a client-side architecture, with an optional HTTP server to serve the
assets. It combines [Dashing][dash]'s beautiful style with [Ember.js][ember]'
great object model and [Handlebars][hbars]' templating capabilities.

You can find a demo for the default configuration
[here](http://shiftforward.github.io/mucuchies/). An alternative demo which is
optimized for 1080p screens is available
[here](http://shiftforward.github.io/mucuchies/1080p/).

![Mucuchies default configuration](https://raw.githubusercontent.com/ShiftForward/mucuchies/master/screenshot.png)

## Getting started

### Building

You'll be needing node as a development dependency. Refer to [node's site][node]
to help you with installation instructions.

Once node is installed, run

    npm install -g grunt-cli

This will install the grunt task execution script, available through `grunt`. It
might be necessary to use `sudo` to run this command.

To install the development dependencies listed in the `package.json` file and
store them locally in the `node_modules/` folder, run in the project folder

    npm install

The `node_modules/` folder is not tracked by version control.

Once all development dependencies are installed, the development tasks can be
started with

    grunt --dev

This will build development versions of the application and start watching for
any changes. `Gruntfile.js` orchestrates things here and the `--dev` option skips
minification of JavaScript code. If you simply want to build the application once
with minification enabled, just do

    grunt build

Either way, the application will be available through the `index.html` in the root
of the project, with the application code in the `dist/` folder and static assets
in the `assets/` folder. Temporary build files will be stored on `build/`.

### Configuring your dashboard

The rectangles shown in the dashboard are *widgets*. A widget is a component that
is defined by a parameterizable class, such as `Dashboard.WeatherWidget` or
`Dashboard.ClockWidget`. A dashboard configuration can have several widgets of
the same type with different parameters.

Each widget is associated with a *source*. Sources are components that get data
from internal (e.g. the current time) or external resources (e.g. APIs), possibly
process it in some way and push it to widgets. As widgets, sources are defined by
classes such as `Dashboard.JenkinsSource` or `Dashboard.WeatherSource`.

The file `app/config-default.js`, together with the `app/less/config-default.less`
stylesheet, defines the layout of the dashboard and the widgets to be shown. Among
other configurations, you can set:

  * The number of widgets to show vertically and horizontally;
  * The width and height, in pixels, of the grid area;
  * Custom data sources used by the widgets. Useful when a source is to be shared
  by more than one widget;
  * A list of widgets and associated sources to show, along with their parameters.

See the provided configuration examples to get a grasp of the way you can
configure your dashboard.

If you run `grunt --config=<config_name>` instead of `grunt`, the dashboard is
built using the configuration file `app/config-<config_name>.js` and the respective
LESS stylesheet. That way, you can have multiple configurations in the same
project.

## Developing new components

When developing a new component for your dashboard, you will most frequently be
implementing a new widget, a new source or a combination of both.

In order to implement a new widget, you should create an
[Ember.js class][ember-class] that extends `Dashboard.Widget` inside the
`app/models/widgets/` folder. The `templateName` property of the class should
point to the handlebars template. Templates should go in the `app/templates/`
folder. Widgets should watch the `content` property for the data that comes from
the linked source.

In order to implement a new source, you should create an
[Ember.js class][ember-class] that extends `Dashboard.Source` inside the
`app/models/sources/` folder. Whenever the `updateData` method of a source is
called, its argument is propagated to the linked widgets through their `content`
property.

For example, imagine that you want to create a widget that displays a static
string. You start by defining the widget:

```javascript
Dashboard.StaticStringWidget = Dashboard.Widget.extend({
  templateName: 'static_string_widget'
});
```

Then, put the `static_string_widget.hbs` file inside the `app/templates/`
folder. We're simply interested in displaying the content, so the template is
straighforward:

```
{{content}}
```

We also need a source to supply the widget with the string to display. We're
assigning the `"Hello World!"` string to the source data on its creation:

```javascript
Dashboard.StaticHelloWorldSource = Dashboard.Source.extend({
  init: function() {
    this._super();
    this.updateData("Hello World!");
  }
});
```

Wiring things together, require the widget and source files in the `app/app.js`
file:

```javascript
require('app/models/widgets/static_string_widget');
require('app/models/sources/static_hello_world_source');
```

And define the widget settings in the `grid.widgets` list of the config file:

```javascript
(...)
widgets: [
  {
    pos: [1, 1],
    widget: 'Dashboard.StaticStringWidget',
    source: 'Dashboard.StaticHelloWorldSource'
  },
  (...)
],
(...)
```

The dashboard should now display the `Hello World!` string in its top left
corner!

## Contributing

We encourage you to contribute to Mucuchies! Submit bug reports and suggestions
for improvements through GitHub's issues and your own improvements through pull
requests. We particularly welcome new widgets and sources.

## Copyright

Copyright (c) 2014 ShiftForward, Lda. See LICENSE for details.

[dash]: https://github.com/Shopify/dashing
[ember]: http://emberjs.com
[hbars]: http://handlebarsjs.com
[node]: http://nodejs.org
[ember-class]: http://emberjs.com/guides/object-model/classes-and-instances/
[shiftforward]: http://www.shiftforward.eu/
