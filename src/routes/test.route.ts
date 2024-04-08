import { Request, Response, Router } from 'express';
import formidable from 'formidable';
import { useDeleteFile, useUploadFile } from '@/utils/io';
export class TestRoute {
  public router = Router();
  public path = '/test';

  constructor() {
    this.initialize();
  }

  private initialize() {
    this.router.get(`${this.path}`, (req: Request, res: Response) => {
      res.send('this get');
    });

    // Test post
    this.router.post(`${this.path}`, async (req: Request, res: Response) => {
      const form = formidable({});
      const [fields, files] = await form.parse(req);
      const newFilename = await useUploadFile(files.file);

      useDeleteFile(['10773ca4fb4fe910c4a4ac602.png', '10773ca4fb4fe910c4a4ac606.png']);

      res.json({ status: true, data: null });
    });
  }
}
