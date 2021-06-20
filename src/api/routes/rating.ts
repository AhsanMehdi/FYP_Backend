import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import RatingService from '../../services/rating';
import ReviewProjectService from '../../services/reviewproject';
import { IRatingDTO } from '../../interfaces/IRating';

import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';

const route = Router();

export default (app: Router) => {
  app.use('/rating', route);

//////////////////// signup section of ngo/donor
  route.get(
    '/:id',
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:Logger = Container.get('logger');
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body );
      try {
        var id = req.params.id;
       
        const reviewProjectServiceInstance = Container.get(ReviewProjectService);
        const  reviewProject = await reviewProjectServiceInstance.GetCommentsOfSpecificProject(id);

        const ratingServiceInstance = Container.get(RatingService);
        const { rating} = await ratingServiceInstance.getRating(reviewProject.reviewProject);
        return res.status(201).json(rating);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );


};
