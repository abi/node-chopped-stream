node-chunked-stream
===================

[![Build Status](https://travis-ci.org/abi/node-chunked-stream.png)](https://travis-ci.org/abi/node-chunked-stream)

Convert any stream into one that gives you data in user-defined sized chunks.

```javascript
var assert = require('assert')
var chunkedStream = require('../.')
var fs = require('fs')
var path = require('path')

var numChunks = 0
fs.createReadStream(path.join(__dirname, 'data/data.txt'))
  .pipe(chunkedStream(1000))
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
```

Install
------------

`npm install node-chunked-stream`