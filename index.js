'use strict';

/**
 * Module dependences
 */

var typeOf = require('kind-of');
var date = require('date.js');
var moment = require('moment');

module.exports = function dateHelper(str, pattern, options) {
  // if no args are passed, return a formatted date
  if (str == null && pattern == null) {
    return moment().format('MMMM DD, YYYY');
  }

  // if an options object is passed as the first arg, assume
  // it should be passed to moment
  if (typeOf(str) === 'object') {
    return moment(str).pattern(pattern);
  }

  // if both args are strings, this could apply to either lib.
  // so instead of doing magic we'll just ask the user to tell
  // us if the args should be passed to date.js or moment.
  if (typeof str === 'string' && typeof pattern === 'string') {
    if (options && options.datejs === false) {
      return moment(new Date(str)).format(pattern);
    }
    return moment(date(str)).format(pattern);
  }

  // if only a string is passed, assume it's a date pattern like `YYYY`
  if (typeof str === 'string') {
    return moment().format(str);
  }

  return moment(new Date(str)).format(pattern);
};
