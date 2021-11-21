import { Transform } from 'stream';
import { shiftMessage } from './shiftMessage.js';

class Rot8Stream extends Transform {
  constructor(action) {
    super();
    this.action = action;
    this.shift = 8;
  }

  _transform(chunk, encoding, callback) {
    const source = chunk.toString();
    const shiftedMessage = shiftMessage(source, (this.action === '1') ? this.shift : -this.shift);
    this.push(shiftedMessage);
    callback();
  }
}

export default Rot8Stream;
