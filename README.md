# Mucuchies

Mucuchies is ShiftForward's dashboard. Following a fully client-side
architecture, it needs nothing more than a simple HTTP server to work. It
combines [Dashing][dash]'s beautiful style with the [Ember.js][ember]' great
object model and [Handlebars][hbars]' templating capabilities.

TODO links to demos

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

    grunt

This will build development versions of the application and start watching for
any changes. `Gruntfile.js` orchestrates things here. If you simply want to build
the application once, just do

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

### Developing new components

TODO

### Contributing

TODO

## Copyright

Copyright (c) 2014 ShiftForward, Lda. See LICENSE for details.

[dash]: https://github.com/Shopify/dashing
[ember]: http://emberjs.com
[hbars]: http://handlebarsjs.com
[node]: http://nodejs.org
