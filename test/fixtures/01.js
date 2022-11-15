'use strict'

var fs = require('fs')
var path = require('path')

module.exports = {
  results: [
    {
      filename: 'foo.js',
      messages: [
        {
          line: 1,
          column: 2,
          severity: 'warning',
          message: 'the quick'
        },
        {
          line: 3,
          column: 4,
          severity: 'error',
          message: 'brown fox'
        }
      ]
    },
    {
      filename: 'bar.js',
      messages: [
        {
          line: 5,
          column: 6,
          severity: 'warning',
          message: 'jumped over'
        },
        {
          line: 7,
          column: 8,
          severity: 'error',
          message: 'the lazy dog'
        },
        {
          line: 9,
          column: 10,
          severity: 'error',
          message: '& " \' < >',
          source: 'eslint.indent',
          unexpectedKey: 'should not appear in output'
        },
        {
          line: 11,
          column: 12,
          severity: 'error',
          message: 'message\nwith\r\nnewlines and\ttabs'
        }
      ]
    }
  ],
  expected: fs.readFileSync(path.join(__dirname, '01.xml'), 'utf8')
}
