'use strict';

var utils = require('handlebars-utils');
var moment = require('moment');
var date = require('date.js');

module.exports = function dateHelper(str, pattern, options) {
  // if no args are passed, return a formatted date
  if (str == null && pattern == null) {
    moment.locale('en');
    return moment().format('MMMM DD, YYYY');
  }

  options = options || {};
  var defaults = {lang: 'en', date: new Date()};
  var opts = Object.assign({}, this, defaults, options, options.hash);

  // set the language to use
  moment.locale(opts.lang);

  if (opts.datejs === false) {
    return moment(new Date(str)).format(pattern);
  }

  // if both args are strings, this could apply to either lib.
  // so instead of doing magic we'll just ask the user to tell
  // us if the args should be passed to date.js or moment.
  if (typeof str === 'string' && typeof pattern === 'string') {
    return moment(date(str)).format(pattern);
  }

  // If handlebars, expose moment methods as hash properties
  if (opts.hash) {
    if (opts.context) {
      opts.hash = Object.assign({}, opts.hash, opts.context);
    }

    var res = moment(str);
    for (var key in opts.hash) {
      if (res[key]) {
        return res[key](opts.hash[key]);
      } else {
        console.log('moment.js does not support "' + key + '"');
      }
    }
  }

  if (utils.isObject(str)) {
    return moment(str).format(pattern);
  }

  // if only a string is passed, assume it's a date pattern ('YYYY')
  if (typeof str === 'string' && !pattern) {
    return moment().format(str);
  }

  return moment(str).format(pattern);
};
