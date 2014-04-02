# Mucuchies

Mucuchies is ShiftForward's dashboard.

## Build instructions

You'll be needing node as a development dependency. Refer to [node's site][1] to
help you with installation instructions.

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
any changes. `Gruntfile.js` orchestrates things here.

The application will be available in the `dist/` folder. Temporary files will be
stored on `build/`.

[1]: http://nodejs.org/

## Copyright

Copyright (c) 2014 ShiftForward, Lda. See LICENSE for details.
