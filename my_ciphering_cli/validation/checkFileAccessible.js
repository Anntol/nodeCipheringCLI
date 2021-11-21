import * as path from 'path';
import { accessSync } from 'fs';
import CustomError from '../CustomError.js';

export function checkFileAccessible(filePath) {
  if (filePath) {
    try {
      if (!path.isAbsolute(filePath)) {
        filePath = path.resolve(filePath);
      }
      accessSync(filePath);
    } 
    catch (error) {
      throw new CustomError(`No access to file ${filePath}`);
    }
  }
}
