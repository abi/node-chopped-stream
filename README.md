node-chunked-stream
===================

Pick a chunk size and get a stream that gives you data in right-sized chunks

```javascript
fs.readFile('data')
  .pipe(bufferedStream(1000))
  .on('data', function (chunk) {
    assert(chunk.length === 1000)
  })
  .on('end', function (chunk) {
    assert(chunk.length <= 1000)
  })
```