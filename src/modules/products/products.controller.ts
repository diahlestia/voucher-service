import _ from 'lodash';
import { logger } from '../../utils/logger';
import { APIResponse } from '../../interfaces';
import { ProductService } from './products/service';
import { NextFunction, Request, Response } from 'express';

class ProductController {
  private readonly service: ProductService;

  constructor() {
    this.service = new ProductService();
  }

  getAll = async (_req: Request, res: Response<APIResponse>, next: NextFunction) => {
    try {
      const data = await this.service.getAll();

      res.status(200).json({ success: true, data });
    } catch (error) {
      logger.error('product.getAll.error', error);
      next(error);
    }
  };
  getOne = async (req: Request, res: Response<APIResponse>, next: NextFunction) => {
    try {
      const id = _.get(req, 'params.id');

      const data = await this.service.getOne(+id);
      res.status(200).json({ success: true, data });
    } catch (error) {
      logger.error('product.getOne.error', error);
      next(error);
    }
  };
  create = async (req: Request, res: Response<APIResponse>, next: NextFunction) => {
    try {
      const body = _.get(req, 'body');
      const data = await this.service.create({ ...body });

      res.status(201).json({ success: true, data });
    } catch (error) {
      logger.error('product.create.error', error);
      next(error);
    }
  };
  update = async (req: Request, res: Response<APIResponse>, next: NextFunction) => {
    try {
      const id = _.get(req, 'params.id');
      const body = _.get(req, 'body');

      const data = await this.service.update({ ...body }, +id);

      res.status(200).json({ success: true, data });
    } catch (error) {
      logger.error('product.update.error', error);
      next(error);
    }
  };
  delete = async (req: Request, res: Response<APIResponse>, next: NextFunction) => {
    try {
      const id = _.get(req, 'params.id');

      await this.service.delete(+id);

      res.status(200).json({ success: true });
    } catch (error) {
      logger.error('product.delete.error', error);
      next(error);
    }
  };
}

export default ProductController;
