var assert = require('assert')
var choppedStream = require('../.')
var fs = require('fs')
var path = require('path')

var numChunks = 0,
	writeEnd = false, writeClose = false

var readable = fs.createReadStream(path.join(__dirname, 'data/data.txt'));

readable.on('close', function() {
	assert(writeEnd, 'write stream should emit end');
	assert(writeClose, 'write stream should emit close');
})

readable
  .pipe(choppedStream(1000))
  .on('data', function (chunk) {
    numChunks++
    if (numChunks < 20) {
      assert(chunk.length === 1000,
             'Each chunk except for the last one should be 1000 bytes long')
    } else {
      assert(chunk.length === 660,
             'Last chunk should be 660 bytes long')
    }
	})
	.on('end', function() {
		writeEnd = true;
	})
	.on('close', function() {
		writeClose = true;
	})