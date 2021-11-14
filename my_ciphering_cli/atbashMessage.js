const LOW_A_CODE = 'a'.charCodeAt();
const LOW_Z_CODE = 'z'.charCodeAt();
const UPP_A_CODE = 'A'.charCodeAt();
const UPP_Z_CODE = 'Z'.charCodeAt();

const ALPHABET_LEN = LOW_Z_CODE - LOW_A_CODE + 1;

export function shiftMessage(message) {
  const result_arr = message.split('').map(letter => {
    const code = letter.charCodeAt();
    if (code >= LOW_A_CODE && code <= LOW_Z_CODE)
      return String.fromCharCode(LOW_A_CODE + LOW_Z_CODE - code);
    else if (code >= UPP_A_CODE && code <= UPP_Z_CODE)
      return String.fromCharCode(UPP_A_CODE + UPP_Z_CODE - code);
    else
      return letter;
  });
  return result_arr.join('');
}
