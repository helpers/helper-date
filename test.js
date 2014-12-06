/*!
 * helper-date <https://github.com/jonschlinkert/helper-date>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var should = require('should');
var moment = require('moment');
var handlebars = require('handlebars');
var _ = require('lodash');

var helper = require('./');

describe('date', function () {
  it('should return a default formatted moment date when nothing is passed:', function () {
    helper().should.eql(moment().format('MMMM DD, YYYY'));
  });

  it('should return a formatted moment date:', function () {
    helper('MMMM DD, YYYY').should.eql(moment().format('MMMM DD, YYYY'));
  });

  it('should parse a human-readable date with date.js and return a formatted moment date:', function () {
    helper('2005-12-25', 'YYYY', {datejs: false}).should.eql('2005');
    helper('10 years ago', 'YYYY').should.eql((new Date().getFullYear() - 10).toString());
    helper('1 year from now', 'YYYY').should.eql((+moment().format('YYYY') + 1).toString());
    helper('1 year ago', 'YYYY').should.eql((+moment().format('YYYY') - 1).toString());
  });

  it('should work as a lodash helper:', function () {
    _.template('<%= date("MMMM DD, YYYY") %>', {}, {imports: {date: helper}}).should.eql(moment().format("MMMM DD, YYYY"));
    _.template('<%= date("YYYY") %>', {}, {imports: {date: helper}}).should.eql(new Date().getFullYear().toString());
  });

  it('should work as a handlebars helper:', function () {
    handlebars.registerHelper('date', helper);
    handlebars.compile('{{date "MMMM DD, YYYY"}}')().should.eql(moment().format("MMMM DD, YYYY"));
    handlebars.compile('{{date formatDate}}')({formatDate: "MMMM DD, YYYY"}).should.eql(moment().format("MMMM DD, YYYY"));
  });
});
