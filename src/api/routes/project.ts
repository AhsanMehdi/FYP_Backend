import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import ProjectService from '../../services/project';
import { IUserInputDTO } from '../../interfaces/IUser';
import { IProjectInputDTO } from '../../interfaces/IProject';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';

const route = Router();

export default (app: Router) => {
  app.use('/project', route);



  // custom API to create project
  route.post(
    '/',  /* the sub path of */
    middlewares.isAuth, middlewares.attachCurrentUser,
    celebrate({
      body: Joi.object({
                              /* verified by postman*/
        tittle: Joi.string().required(),
        projectType: Joi.string().required(),
        estimatedBudget:Joi.number().required(),
        //totalDonation: Joi.number().required(),
        //collectedDonation: Joi.number().required(),
        descriptionStory: Joi.string().required(),
        objective: Joi.string().required(),
        country: Joi.string().required(),
        //expectedEndDate: Joi.string().required(),
        //visibility: Joi.string().required(),
        //currentExpenses: Joi.number().required(),
        startDate: Joi.string().required(),
        registerationNumber: Joi.string().required(),
        //totalDonors: Joi.number().required(),
        //visibleDonors: Joi.string().required(),
        imageUrl: Joi.string().required() 
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:Logger = Container.get('logger');
      logger.debug('Calling Project endpoint with body: %o', req.body );
      try {
        let user = req.currentUser ;
        req.body.userId = user._id ;
        const projectServiceInstance = Container.get(ProjectService);
        const { project} = await projectServiceInstance.CreateProject(req.body as IProjectInputDTO);
        return res.status(201).json({ project });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

    // custom API to get all project
    route.get(
        '/',
        async (req: Request, res: Response, next: NextFunction) => {
          const logger:Logger = Container.get('logger');
          logger.debug('Calling Project endpoint with body: %o', req.body );
          try {
            const projectServiceInstance = Container.get(ProjectService);
            const { projects} = await projectServiceInstance.GetProjects(); /* call move to service function via interface*/
            return res.status(201).json({ projects });
          } catch (e) {
            logger.error('🔥 error: %o', e);
            return next(e);
          }
        },
      );

          // custom API to get a specific project
    route.get(
      '/:id',
      async (req: Request, res: Response, next: NextFunction) => {
        const logger:Logger = Container.get('logger');
        logger.debug('Calling Project endpoint with body: %o', req.body );
        try {

          var id = req.params.id;
          const projectServiceInstance = Container.get(ProjectService);
          const { project} = await projectServiceInstance.GetProjectById(id);
          return res.status(201).json({ project });
        } catch (e) {
          logger.error('🔥 error: %o', e);
          return next(e);
        }
      },
    );
    // custom api to get a project of specific type or domain
    route.get(
      '/tittle/:tittle',
    
      async (req: Request, res: Response, next: NextFunction) => {
        
        const logger:Logger = Container.get('logger');
        logger.debug('Calling project endpoint with body: %o', req.body );
        try {
          var tittle = req.params.tittle;
          console.log ( " received subject is " + tittle)
          const projectServiceInstance = Container.get(ProjectService);
          const { project} = await projectServiceInstance.GetProjectsBytittle(tittle); /* service get ngos with specific domain*/
          return res.status(201).json({ project });
        } catch (e) {
          logger.error('🔥 error: %o', e);
          return next(e);
        }
      },
    );



//
  /**
   * @TODO Let's leave this as a place holder for now
   * The reason for a logout route could be deleting a 'push notification token'
   * so the device stops receiving push notifications after logout.
   *
   * Another use case for advance/enterprise apps, you can store a record of the jwt token
   * emitted for the session and add it to a black list.
   * It's really annoying to develop that but if you had to, please use Redis as your data store
   */
  route.post('/logout', middlewares.isAuth, (req: Request, res: Response, next: NextFunction) => {
    const logger:Logger = Container.get('logger');
    logger.debug('Calling Sign-Out endpoint with body: %o', req.body);
    try {
      //@TODO AuthService.Logout(req.user) do some clever stuff
      return res.status(200).end();
    } catch (e) {
      logger.error('🔥 error %o', e);
      return next(e);
    }
  });
};
