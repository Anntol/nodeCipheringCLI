import { Transform } from 'stream';
import { shiftMessage } from './atbashMessage.js';

class AtbashStream extends Transform {
  constructor() {
    super();
  }

  _transform(chunk, encoding, callback) {
    const source = chunk.toString();
    const shiftedMessage = shiftMessage(source);
    this.push(shiftedMessage);
    callback();
  }
}

export default AtbashStream;
