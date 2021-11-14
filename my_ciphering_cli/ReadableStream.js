import * as fs from 'fs';
import { Readable } from 'stream';

class ReadableStream extends Readable {
  constructor(file) {
    super();
    this.file = file;
    this.fd = null;
  }

  _construct(callback) {
    fs.open(this.file, (err, fd) => {
        if (err) {
            callback(err);
        } else {
            this.fd = fd;
            callback();
        }
    });
  }

  _read(len) {
    const buf = Buffer.alloc(len);
    fs.read(this.fd, buf, 0, len, null, (err, bytesRead) => {
        if (err) {
            this.destroy(err);
        } else {
            this.push(bytesRead > 0 ? buf.slice(0, bytesRead) : null);
        }
    });
  }

  _destroy(err, callback) {
    if (this.fd) {
        fs.close(this.fd, (er) => callback(er || err));
    } else {
        callback(err);
    }
  }

}

export default ReadableStream;

