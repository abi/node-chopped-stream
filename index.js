var through = require('through')

module.exports = function (chunkSize) {
  var chunk = new Buffer(0)

  var write = function (data) {
    // Ensure that it's a Buffer
    if (!Buffer.isBuffer(data)) {
      data = new Buffer(data)
    }

    // TODO: Reduce number of new chunk created created (every `data` resassign)
    // Does this even matter though?

    // The chunk might already have some data from the previous 'data' event
    // so fill it up and shorten `data` appropriately.
    var remainingSize = chunkSize - chunk.length
    chunk = Buffer.concat([chunk, data.slice(0, remainingSize)])
    data = data.slice(remainingSize)

    if (chunk.length === chunkSize) {
      this.queue(chunk)

      // Create as many full buffers of `chunkSize` as possible from `data`
      while (data.length > chunkSize) {
        this.queue(data.slice(0, chunkSize))
        data = data.slice(chunkSize)
      }

      // Whatever data remains, set the chunk to that so the next `data` event
      // or `end` event can queue it along
      chunk = data
    }
  }

  var end = function (data) {
    this.queue(chunk)
  }

  return through(write, end)
}