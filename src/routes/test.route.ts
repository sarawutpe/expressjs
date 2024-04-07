import { Request, Response, Router } from 'express';

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

    this.router.post(`${this.path}`, (req: Request, res: Response) => {
      console.log(req.query.q);
      console.log(req.body);
      res.json({ status: 'ok', data: 'this post...' });
    });
  }
}
