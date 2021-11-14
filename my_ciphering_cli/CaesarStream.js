import { Transform } from 'stream';
import { shiftMessage } from './shiftMessage.js';

class CaesarStream extends Transform {
  constructor(action) {
    super();
    this.action = action;
    this.shift = 1;
  }

  _transform(chunk, encoding, callback) {
    const source = chunk.toString();
    const shiftedMessage = shiftMessage(source, (this.action === '1') ? this.shift : -this.shift);
    this.push(shiftedMessage);
    callback();
  }
}

export default CaesarStream;
