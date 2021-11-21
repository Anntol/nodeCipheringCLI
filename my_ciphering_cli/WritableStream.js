import * as fs from 'fs';
import { Writable } from 'stream';

class WritableStream extends Writable {
  constructor(file) {
    super();
    this.file = file;
  }

  _construct(callback) {
    fs.open(this.file, 'a', (err, fd) => {
      if (err) {
        callback(err);
      } else {
        this.fd = fd;
        callback();
      }
    });
  }

  _write(chunk, encoding, callback) {
    fs.write(this.fd, chunk, callback);
  }

  _destroy(err, callback) {
    if (this.fd) {
      fs.close(this.fd, (er) => callback(er || err));
    } else {
      callback(err);
    }
  }

}

export default WritableStream;

