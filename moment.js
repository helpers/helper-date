'use strict';

/**
 * Module dependences
 */

var typeOf = require('kind-of');
var moment = require('moment');

module.exports = function momentHelper(str, pattern, options) {
  // if no args are passed, return a formatted date
  if (str == null && pattern == null) {
    return moment().format('MMMM DD, YYYY');
  }

  // if an options object is passed as the first arg, assume
  // it should be passed to moment
  if (typeOf(str) === 'object') {
    return moment(str).pattern(pattern);
  }

  // if only a string is passed, assume it's a date pattern like `YYYY`
  if (typeof str === 'string') {
    return moment().format(str);
  }

  return moment(str).format(pattern);
};
