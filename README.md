# Replaceholder

> Used for replacing placeholder content with template tags.

This plugin was built for helping to create custom themes for Zendesk and is used for replacing placeholder content with the template tags that generate that content in production.

Take this sample markup that could be a file `topics.html`:

    <h2>List of topics</h2>
    <ul data-replaceholder="{{list_topics}}">
        <li>Just some dummy data</li>
        <li>Here to help us build the template.</li>
        <li>This whole <ul> element</li>
        <li>Will actually be output by the CMS</li>
        <li>Via the template tag {{list_topics}}</li>
    </ul>

So you would work on the above dummy markup to build your template and then run this Grunt plugin over your template files to replace any elements with a `data-replaceholder` attribute with the corresponding template tag that should actually be there.

At some point I'll build a Yo generator that will help scaffold an entire Zendesk theme dev environment as it'd be pretty useful and I've done a lot of the legwork towards it.

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

    npm install grunt-replaceholder --save-dev

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

    grunt.loadNpmTasks('grunt-replaceholder');

## The "replaceholder" task

### Usage
In your project's Gruntfile, add a section named `replaceholder` to the data object passed into `grunt.initConfig()`.

    grunt.initConfig({
      replaceholder: {
        options: {
          dataAttribute: 'replaceholder'
        },
        target: {
          files: 'path/to/destination' : 'path/to/source/**/*.html'
        },
      },
    })

## Release History
v0.0.1 - Built it. No tests, #lol.

## License
Copyright (c) 2015 Michael Parks. Licensed under the MIT license.
