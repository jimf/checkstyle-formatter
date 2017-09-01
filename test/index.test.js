'use strict'

var test = require('tape')
var checkstyleFormatter = require('..')
var cases = [
  require('./fixtures/01')
]

test('checkstyle formatter', function (assert) {
  cases.forEach(function (testcase) {
    var actual = checkstyleFormatter(testcase.results).trim()
    var expected = testcase.expected.toString().trim()

    assert.equal(actual, expected, 'should return expected xml')
  })

  assert.end()
})
