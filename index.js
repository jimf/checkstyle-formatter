'use strict'

var xmlEscape = require('xml-escape')

/**
 * Escapes an XML attribute value.
 *
 * @param {string} value Attribute value to escape
 * @return {string}
 */
function xmlEscapeAttr (value) {
  return xmlEscape(value)
    .replace(/\n/g, '&#xA;')
    .replace(/\r/g, '&#xD;')
    .replace(/\t/g, '&#x9;')
}

/**
 * Extract property and return as an XML attribute.
 *
 * Example:
 *   attr({ foo: 1 }, 'foo') => 'foo="1"'
 *
 * @param {object} message Message object to generate attribute from
 * @param {string} prop Property on message to extract
 * @return {string}
 */
function attr (message, prop) {
  return ' ' + prop + '="' + xmlEscapeAttr('' + message[prop]) + '"'
}

/**
 * Format error line.
 *
 * @param {object} message Message object to format
 * @return {string}
 */
function formatMessage (message) {
  return '<error' +
    attr(message, 'line') +
    attr(message, 'column') +
    attr(message, 'severity') +
    attr(message, 'message') +
    ('source' in message ? attr(message, 'source') : '') +
    ' />'
}

/**
 * Format results for a single file.
 *
 * @param {object} result Results for a single file
 * @param {string} result.filename Filename for these results
 * @param {object[]} result.messages Warnings/errors for file
 * @return {string} XML representation for file and results
 */
function formatResult (result) {
  return [
    '<file name="' + result.filename + '">',
    result.messages.map(formatMessage).join('\n'),
    '</file>'
  ].join('\n')
}

/**
 * Format Checkstyle results for a series of { filename, messages } objects.
 *
 * @param {object[]} results Array of { filename, messages } objects
 * @return {string}
 */
module.exports = function (results) {
  return [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<checkstyle version="4.3">',
    results.map(formatResult).join('\n'),
    '</checkstyle>'
  ].join('\n')
}
