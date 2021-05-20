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
        dateOfCreation: Joi.string().required(),
        imageUrl: Joi.string()
    
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

    // custom API to get all campaigns
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
    
    // custom API to update  a specific campaign
    route.put (
      '/:id',
      middlewares.isAuth, middlewares.attachCurrentUser,
      celebrate({
        body: Joi.object({
    
          nickName: Joi.string().required(),
          subject: Joi.string().required(),
          descriptionStory:Joi.string().required(),
          objective: Joi.string().required(),
          country: Joi.string().required(),
          status: Joi.string().required(),
          dateOfCreation: Joi.string().required(),
          imageUrl: Joi.string().required() 
        }),
      }),
      async (req: Request, res: Response, next: NextFunction) => {
        const logger:Logger = Container.get('logger');
        logger.debug('Calling DONOR-Profile endpoint with body: %o', req.body );
        try { 
            let user = req.currentUser ;
            req.body.userId = user._id ;
           const campaignServiceInstance = Container.get(CampaignService);
           const { campaign} = await campaignServiceInstance.CampaignUpdate(req.body as ICampaignInputDTO);
          return res.status(201).json({ campaign });
        } catch (e) {
          logger.error('🔥 error: %o', e);
          return next(e);
        }
      },
    )

           // custom API to get all campaigns of specific subject or domain
           route.get(
            '/subject/:subject',
          
            async (req: Request, res: Response, next: NextFunction) => {
              
              const logger:Logger = Container.get('logger');
              logger.debug('Calling Ngos endpoint with body: %o', req.body );
              try {
                var subject = req.params.subject;
                console.log ( " received subject is " + subject)
                const campaignServiceInstance = Container.get(CampaignService);
                const { campaign} = await campaignServiceInstance.GetCampaignsByDomain(subject); /* service get ngos with specific domain*/
                return res.status(201).json({ campaign });
              } catch (e) {
                logger.error('🔥 error: %o', e);
                return next(e);
              }
            },
          );
           // custom API to get all campaigns of specific country or state
           route.get(
            '/country/:country',
          
            async (req: Request, res: Response, next: NextFunction) => {
              
              const logger:Logger = Container.get('logger');
              logger.debug('Calling Ngos endpoint with body: %o', req.body );
              try {
                var country = req.params.country;
                console.log ( " received subject is " + country)
                const campaignServiceInstance = Container.get(CampaignService);
                const { campaign} = await campaignServiceInstance.GetCampaignsByCountry(country); /* service get ngos with specific domain*/
                return res.status(201).json({ campaign });
              } catch (e) {
                logger.error('🔥 error: %o', e);
                return next(e);
              }
            },
          );

                    // custom API to get all campaigns of specific status
           route.get(
            '/status/:status',
          
            async (req: Request, res: Response, next: NextFunction) => {
              
              const logger:Logger = Container.get('logger');
              logger.debug('Calling campaign endpoint with body: %o', req.body );
              try {
                var status = req.params.status;
                console.log ( " received subject is " + status)
                const campaignServiceInstance = Container.get(CampaignService);
                const { campaign} = await campaignServiceInstance.GetCampaignsByStatus(status); /* service get ngos with specific domain*/
                return res.status(201).json({ campaign });
              } catch (e) {
                logger.error('🔥 error: %o', e);
                return next(e);
              }
            },
          );
      // api in which user send the user id & then we will give all the corresponding campaigns
route.get(
  '/userId/:userId',
  async (req: Request, res: Response, next: NextFunction) => {
    const logger:Logger = Container.get('logger');
    logger.debug('Calling Project endpoint with body: %o', req.body );
    try {

      var id = req.params.userId;
      const campaignServiceInstance = Container.get(CampaignService);
      const { campaign} = await campaignServiceInstance.GetCampaignByUserId(id);
      return res.status(201).json({ campaign });
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  },
);
                    // custom API to get all campaigns of specific nickName
           route.get(
            '/nickName/:nickName',
          
            async (req: Request, res: Response, next: NextFunction) => {
              
              const logger:Logger = Container.get('logger');
              logger.debug('Calling campaign endpoint with body: %o', req.body );
              try {
                var nickName = req.params.nickName;
                console.log ( " received subject is " + nickName)
                const campaignServiceInstance = Container.get(CampaignService);
                const { campaign} = await campaignServiceInstance.GetCampaignsByNickName(nickName); /* service get ngos with specific domain*/
                return res.status(201).json({ campaign });
              } catch (e) {
                logger.error('🔥 error: %o', e);
                return next(e);
              }
            },
          );
// api in which user send the campaign id then get the user id********************
route.get(
  '/id/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const logger:Logger = Container.get('logger');
    logger.debug('Calling campaign endpoint with body: %o', req.body );
    try {

      var id = req.params.id;
      const campaignServiceInstance = Container.get(CampaignService);
      const { campaign} = await campaignServiceInstance.GetCampaignOwnerId(id);
      var userId = campaign[0].userId;
      return res.status(201).json({ userId });
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  },
);
/*api to update a campaign*/
route.put (
  '/donor',
  middlewares.isAuth, middlewares.attachCurrentUser,
  celebrate({
    body: Joi.object({

      firstName: Joi.string().required(),
      middleName: Joi.string().required(),
      lastName:Joi.string().required(),
      dob:Joi.string().required(),
      cellNumber: Joi.string().required(),
      interestedDomain: Joi.string().required(),
      cnic:Joi.string().required(),
      country: Joi.string().required(),
      visibility: Joi.string().required(),
      occupation: Joi.string().required()
    }),
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    const logger:Logger = Container.get('logger');
    logger.debug('Calling DONOR-Profile endpoint with body: %o', req.body );
    try { 
        let user = req.currentUser ;
        req.body.userId = user._id ;
       const profileServiceInstance = Container.get(ProfileService);
       const { donorProfile} = await profileServiceInstance.DonorProfileUpdate(req.body as IDonorProfileInputDTO);
      return res.status(201).json({ donorProfile });
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  },
)
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
