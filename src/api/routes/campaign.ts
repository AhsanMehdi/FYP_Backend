import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import CampaignService from '../../services/campaign';
import { IUserInputDTO } from '../../interfaces/IUser';
import { ICampaignInputDTO } from '../../interfaces/ICampaign';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';

const route = Router();

export default (app: Router) => {
  app.use('/campaign', route);



  // custom API to create campaign
  route.post(
    '/',   //// next sub route
    middlewares.isAuth, middlewares.attachCurrentUser,
    celebrate({
      body: Joi.object({           //// postman verified

        nickName: Joi.string().required(),
        subject: Joi.string().required(),
        descriptionStory:Joi.string().required(),
        objective: Joi.string().required(),
        country: Joi.string().required(),
        status: Joi.string().required(),
        visibility: Joi.string().required(),
        dateOfCreation: Joi.string().required(),
        imageUrl: Joi.string().required() 
    
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:Logger = Container.get('logger');
      logger.debug('Calling Campaign endpoint with body: %o', req.body );
      try {
        let user = req.currentUser ;
        req.body.userId = user._id ;
        const campaignServiceInstance = Container.get(CampaignService);
        const { campaign} = await campaignServiceInstance.CreateCampaign(req.body as ICampaignInputDTO);
        return res.status(201).json({ campaign });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

    // custom API to get campaign
    route.get(
        '/',
        async (req: Request, res: Response, next: NextFunction) => {
          const logger:Logger = Container.get('logger');
          logger.debug('Calling Campaign endpoint with body: %o', req.body );
          try {
            const campaignServiceInstance = Container.get(CampaignService);
            const { campaigns} = await campaignServiceInstance.GetCampaigns();
            return res.status(201).json({ campaigns });
          } catch (e) {
            logger.error('🔥 error: %o', e);
            return next(e);
          }
        },
      );
    

          // custom API to get a specific campaign
          route.get(
            '/:id',
            async (req: Request, res: Response, next: NextFunction) => {
              const logger:Logger = Container.get('logger');
              logger.debug('Calling Project endpoint with body: %o', req.body );
              try {
      
                var id = req.params.id;
                const campaignServiceInstance = Container.get(CampaignService);
                const { campaign} = await campaignServiceInstance.GetCampaignById(id);
                return res.status(201).json({ campaign });
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
