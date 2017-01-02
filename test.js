/*!
 * helper-date <https://github.com/jonschlinkert/helper-date>
 *
 * Copyright (c) 2014-2015 Jon Schlinkert.
 * Licensed under the MIT License
 */

'use strict';

require('mocha');
var assert = require('assert');
var handlebars = require('handlebars');
var momentjs = require('moment');
var date = require('date.js');
var moment = require('./');
var _ = require('lodash');

describe('moment', function () {
  it('should return a default formatted moment date when nothing is passed:', function () {
    assert.deepEqual(moment(), momentjs().format('MMMM DD, YYYY'));
  });

  it('should return a formatted moment date:', function () {
    assert.deepEqual(moment('YYYY'), momentjs().format('YYYY'));
    assert.deepEqual(moment('MMMM DD, YYYY'), momentjs().format('MMMM DD, YYYY'));
  });

  it('should parse a human-readable date with date.js and return a formatted moment date:', function () {
    assert.deepEqual(moment('1 year ago', 'YYYY'), (+momentjs().format('YYYY') - 1).toString());
    assert.deepEqual(moment('1 year from now', 'YYYY'), (+momentjs().format('YYYY') + 1).toString());
    assert.deepEqual(moment('10 years ago', 'YYYY'), (new Date().getFullYear() - 10).toString());
    assert.deepEqual(moment('2005-12-25', 'YYYY', {datejs: false}), '2005');
    assert.deepEqual(moment(date('1 year ago'), 'YYYY'), (+moment('YYYY') - 1).toString());
    assert.deepEqual(moment(date('1 year from now'), 'YYYY'), (+moment('YYYY') + 1).toString());
    assert.deepEqual(moment(date('10 years ago'), 'YYYY'), (new Date().getFullYear() - 10).toString());
    assert.deepEqual(moment(date('Next year.'), 'YYYY'), (+moment('YYYY') + 1).toString());
    assert.deepEqual(moment(date('This year.'), 'YYYY'), moment('YYYY'));
  });

  it('should work as a lodash helper:', function () {
    var locals = {imports: {moment: moment, date: date}};
    assert.deepEqual(_.template('<%= moment(date("5 years ago"), "YYYY") %>', locals)(), (moment("YYYY") - 5).toString());
    assert.deepEqual(_.template('<%= moment("5 years ago", "YYYY") %>', locals)(), (moment("YYYY") - 5).toString());
    assert.deepEqual(_.template('<%= moment("MMMM DD, YYYY") %>', locals)(), moment("MMMM DD, YYYY"));
    assert.deepEqual(_.template('<%= moment("MMMM DD, YYYY") %>', locals)(), momentjs().format("MMMM DD, YYYY"));
    assert.deepEqual(_.template('<%= moment("YYYY") %>', locals)(), new Date().getFullYear().toString());
  });

  it('should work as a handlebars helper:', function () {
    handlebars.registerHelper('date', moment);
    var locals = {formatDate: "MMMM DD, YYYY", time: new Date()};

    assert.deepEqual(handlebars.compile('{{date "5 years ago" "YYYY"}}')(), (moment("YYYY") - 5).toString());
    assert.deepEqual(handlebars.compile('{{date time "MMMM DD, YYYY"}}')(), moment("MMMM DD, YYYY"));
    assert.deepEqual(handlebars.compile('{{date time "MMMM DD, YYYY"}}')({time: new Date()}), momentjs().format("MMMM DD, YYYY"));
    assert.deepEqual(handlebars.compile('{{date time formatDate}}')(locals), momentjs().format("MMMM DD, YYYY"));
    assert.deepEqual(handlebars.compile('{{date time formatDate}}')(locals), moment("MMMM DD, YYYY"));
  });
});

