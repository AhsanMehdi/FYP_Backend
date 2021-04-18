import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import ProjectService from '../../services/project';
import ReviewProjectService from '../../services/reviewproject';
import { IUserInputDTO } from '../../interfaces/IUser';
import { IProjectInputDTO } from '../../interfaces/IProject';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import { IReviewProject, IReviewProjectInputDTO } from '../../interfaces/IReviewProject';

const route = Router();

export default (app: Router) => {
  app.use('/feedback', route);



  // custom API to create project
  route.post(
    '/:id',  /* the sub path of */
    celebrate({
      body: Joi.object({
                              /* verified by postman*/
        comment: Joi.string().required(),
        like: Joi.string().required(),
        dislike: Joi.string().required(),
        noOfLikes: Joi.number().required(),
        noOfDisLikes: Joi.number().required()
 
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:Logger = Container.get('logger');
      logger.debug('Calling Project endpoint with body: %o', req.body );
      try {
         req.body.projectId =  req.params.id ;
        const reviewProjectServiceInstance = Container.get(ReviewProjectService);
        const { reviewProject} = await reviewProjectServiceInstance.GiveFeedback(req.body as IReviewProjectInputDTO);
        return res.status(201).json({ reviewProject });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  /* api to get the comments on a particular project */
  route.get(
    '/:id',  /* the sub path of */

    async (req: Request, res: Response, next: NextFunction) => {
      const logger:Logger = Container.get('logger');
      logger.debug('Calling Project endpoint with body: %o', req.body );
      try {
        var id = req.params.id;
        const reviewProjectServiceInstance = Container.get(ReviewProjectService);
        const { reviewProject} = await reviewProjectServiceInstance.GetCommentsOfSpecificProject(id);
        return res.status(201).json({ reviewProject });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

};
