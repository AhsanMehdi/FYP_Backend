import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import ChatBoxService from '../../services/chatbox';
import { IUserInputDTO } from '../../interfaces/IUser';
import { IChatBoxInputDTO } from '../../interfaces/IChatBox';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';

const route = Router();

export default (app: Router) => {
  app.use('/message', route);



  // custom API to create chatbox
  route.post(
    '/',
    middlewares.isAuth, middlewares.attachCurrentUser,
    celebrate({
      body: Joi.object({

        subject: Joi.string().required(),
        message: Joi.string().required(),
        createdAt:Joi.string().required(),
        to: Joi.string().required(),
     
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {

      let user = req.currentUser ;
      req.body.from = user._id ;
      const logger:Logger = Container.get('logger');
      logger.debug('Calling ChatBox endpoint with body: %o', req.body );
      try {
        const chatBoxServiceInstance = Container.get(ChatBoxService);
        const { chatBox} = await chatBoxServiceInstance.communicateUser(req.body as IChatBoxInputDTO);
        return res.status(201).json({ chatBox });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

    // // custom API to create project
    // route.get(
    //     '/',
    //     async (req: Request, res: Response, next: NextFunction) => {
    //       const logger:Logger = Container.get('logger');
    //       logger.debug('Calling Project endpoint with body: %o', req.body );
    //       try {
    //         const projectServiceInstance = Container.get(ProjectService);
    //         const { projects} = await projectServiceInstance.GetProjects();
    //         return res.status(201).json({ projects });
    //       } catch (e) {
    //         logger.error('🔥 error: %o', e);
    //         return next(e);
    //       }
    //     },
    //   );
    




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
