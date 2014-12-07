/*!
 * helper-date <https://github.com/jonschlinkert/helper-date>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var should = require('should');
var handlebars = require('handlebars');
var momentjs = require('moment');
var _ = require('lodash');
var moment = require('./');
var date = require('date.js');


describe('moment', function () {
  it('should return a default formatted moment date when nothing is passed:', function () {
    moment().should.eql(momentjs().format('MMMM DD, YYYY'));
  });

  it('should return a formatted moment date:', function () {
    moment('MMMM DD, YYYY').should.eql(momentjs().format('MMMM DD, YYYY'));
  });

  it('should parse a human-readable date with date.js and return a formatted moment date:', function () {
    moment('1 year ago', 'YYYY').should.eql((+momentjs().format('YYYY') - 1).toString());
    moment('1 year from now', 'YYYY').should.eql((+momentjs().format('YYYY') + 1).toString());
    moment('10 years ago', 'YYYY').should.eql((new Date().getFullYear() - 10).toString());
    moment('2005-12-25', 'YYYY', {datejs: false}).should.eql('2005');
    moment(date('1 year ago'), 'YYYY').should.eql((+moment('YYYY') - 1).toString());
    moment(date('1 year from now'), 'YYYY').should.eql((+moment('YYYY') + 1).toString());
    moment(date('10 years ago'), 'YYYY').should.eql((new Date().getFullYear() - 10).toString());
    moment(date('Next year.'), 'YYYY').should.eql((+moment('YYYY') + 1).toString());
    moment(date('This year.'), 'YYYY').should.eql(moment('YYYY'));
  });

  it('should work as a lodash helper:', function () {
    var ctx = {imports: {moment: moment, date: date}};

    _.template('<%= moment("MMMM DD, YYYY") %>', {}, ctx).should.eql(moment("MMMM DD, YYYY"));
    _.template('<%= moment("MMMM DD, YYYY") %>', {}, ctx).should.eql(moment("MMMM DD, YYYY"));
    _.template('<%= moment("MMMM DD, YYYY") %>', {}, ctx).should.eql(momentjs().format("MMMM DD, YYYY"));
    _.template('<%= moment("YYYY") %>', {}, {imports: {moment: moment}}).should.eql(new Date().getFullYear().toString());
  });

  it('should work as a handlebars helper:', function () {
    handlebars.registerHelper('moment', moment);

    handlebars.compile('{{moment date "MMMM DD, YYYY"}}')().should.eql(moment("MMMM DD, YYYY"));
    handlebars.compile('{{moment date "MMMM DD, YYYY"}}')({date: new Date()}).should.eql(momentjs().format("MMMM DD, YYYY"));
    handlebars.compile('{{moment date formatDate}}')({formatDate: "MMMM DD, YYYY", date: new Date()}).should.eql(momentjs().format("MMMM DD, YYYY"));
    handlebars.compile('{{moment date formatDate}}')({formatDate: "MMMM DD, YYYY"}).should.eql(moment("MMMM DD, YYYY"));
  });
});

