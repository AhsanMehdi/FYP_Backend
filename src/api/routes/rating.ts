import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import RatingService from '../../services/rating';
import {IReviewProject} from '../../interfaces/IReviewProject';
import ReviewProjectService from '../../services/reviewproject';
import ProjectService from '../../services/project';
import { IRatingDTO } from '../../interfaces/IRating';

import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';

const route = Router();

export default (app: Router) => {
  app.use('/rating', route);

//////////////////// getting rating of a specific project
  route.get(
    '/:id',
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:Logger = Container.get('logger');
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body );
      try {
        var id = req.params.id;
       
        const reviewProjectServiceInstance = Container.get(ReviewProjectService);
        const  reviewProject = await reviewProjectServiceInstance.GetCommentsOfSpecificProject(id);
        //console.log("total comments are"+reviewProject.reviewProject)
        const ratingServiceInstance = Container.get(RatingService);
        const { rating} = await ratingServiceInstance.getRating(reviewProject.reviewProject);
        return res.status(201).json(rating);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  //////////////////// getting rating of a specific ngo
  route.get(
    '/ngo/:id',
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:Logger = Container.get('logger');
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body );
      try {
        var id = req.params.id; // here id is of an ngo
        ///  1. get all project of a specific ngo
        const projectServiceInstance = Container.get(ProjectService);
        const { project} = await projectServiceInstance.GetProjectByUserId(id);
        let x = 0 ;
        x = project.length;
        console.log (" total project are " + x)
        console.log ("one by one project"+project)
        ///
        var reviewProject: IReviewProject[];
        for (let i = 0; i < x; i++) {
          const reviewProjectServiceInstance = Container.get(ReviewProjectService);
          var ireviewProject = await reviewProjectServiceInstance.GetCommentsOfSpecificProject(project[i]._id);
         
         console.log ("value   "+ ireviewProject[i]) // reviewProject =    reviewProject.concat(ireviewProject.reviewProject)
        // reviewProject = $.extend (reviewProject, ireviewProject.reviewProject)
        // reviewProject = Object.assign (reviewProject, ireviewProject.reviewProject)
        }
        // const reviewProjectServiceInstance = Container.get(ReviewProjectService);
        // const  reviewProject = await reviewProjectServiceInstance.GetCommentsOfSpecificProject(id);

        const ratingServiceInstance = Container.get(RatingService);
        const { rating} = await ratingServiceInstance.getRating(reviewProject);
        //return res.status(201).json(rating);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );


};
