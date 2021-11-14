import * as path from 'path';
import { accessSync } from 'fs';

export function isFileAccessible(filePath) {
    if (filePath) {
      try {
        if (!path.isAbsolute(filePath)) {
          filePath = path.resolve(filePath);
        }
        accessSync(filePath);
      } 
      catch (error) {
        console.error(`No access to file ${filePath}`);
        return false;
      }
    }
    return true;
  } 