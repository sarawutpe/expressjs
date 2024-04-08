import formidable from 'formidable';
import fs from 'fs-extra';
import path from 'path';
import mime from 'mime-types';

const __rootdir = path.resolve(process.cwd());
const __rootfile = path.join(__rootdir, 'public');

const useUploadFile = async (files: formidable.File[], options?: {}): Promise<null | string | string[]> => {
  try {
    if (files.length === 0) return;

    const newFilenames = [];
    for (let i = 0; i < files.length; i++) {
      const item = files[i];
      const fileName = item.newFilename + '.' + mime.extension(item.mimetype);
      newFilenames.push(fileName);
      await fs.move(item.filepath, path.join(__rootfile, fileName));
    }

    if (newFilenames.length === 1) return newFilenames[0];
    return newFilenames;
  } catch (error) {
    console.error('Error moving files:', error);
    throw error;
  }
};

const useDeleteFile = async (src: string | string[]): Promise<void> => {
  try {
    if (typeof src === 'string') {
      const fullPath = path.join(__rootfile, src);
      if (!(await fs.pathExists(fullPath))) return;
      await fs.unlink(path.join(__rootfile, src));
      return;
    }

    if (Array.isArray(src) && src.length > 0) {
      for (let i = 0; i < src.length; i++) {
        const fullPath = path.join(__rootfile, src[i]);
        if (!(await fs.pathExists(fullPath))) continue;
        await fs.unlink(fullPath);
      }
    }

    return;
  } catch (error) {
    console.error('Error moving files:', error);
    throw error;
  }
};

export { useUploadFile, useDeleteFile };
