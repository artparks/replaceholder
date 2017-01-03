/*
 * Replaceholder
 *
 *
 * Copyright (c) 2015 Michael Parks
 * Licensed under the MIT license.
 */

'use strict';

var cheerio = require('cheerio');
var path = require('path');

module.exports = function(grunt) {

    grunt.registerMultiTask('replaceholder', 'Used for replacing placeholder content with template tags.', function() {

        var options = this.options({
            dataAttribute: 'replaceholder',
            templates: false
        });

        if (options.templates && typeof options.templates === 'string') {
            // this is obviously unreliable as hell: just expect it to be json and to hell with
            // it if it's not...
            var templates = grunt.file.readJSON(options.templates);
        }

        this.files.forEach(function(f) {
            var src = f.src.filter(function(filepath) {
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function(filepath) {
                var html, $, nodes, selector, out, filename;

                html = grunt.file.read(filepath);
                $ = cheerio.load(html);
                selector = '*[data-' + options.dataAttribute + ']';


                $(selector).each(function() {
                    var $this = $(this),
                        replaceWith;

                    replaceWith = $this.data(options.dataAttribute);

                    if (replaceWith.startsWith('template:')) {
                        var templateName = replaceWith.substring(9);
                        replaceWith = typeof templates[templateName] !== 'undefined' ? templates[templateName] : '';
                    }

                    $this.replaceWith(replaceWith);
                })

                out = $.html();
                filename = path.basename(filepath);

                grunt.file.write(f.dest + '/' + filename, out);
                grunt.log.writeln('File "' + filename + '" fiddled with.');
            });
        });

    });

};