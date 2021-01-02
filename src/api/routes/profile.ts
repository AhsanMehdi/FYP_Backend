import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import ProfileService from '../../services/profile';
import { IUserInputDTO } from '../../interfaces/IUser';
import { INgoProfileInputDTO } from '../../interfaces/INgoProfile';
import { IDonorProfileInputDTO } from '../../interfaces/IDonorProfile';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';

const route = Router();

export default (app: Router) => {
  app.use('/profile', route);



  // custom API to edit profile page of ngo
  route.post(
    '/ngo',
    middlewares.isAuth, middlewares.attachCurrentUser,
    celebrate({
      body: Joi.object({

        nickName: Joi.string().required(),
        branchId: Joi.string().required(),
        totalBranches:Joi.number().required(),
        completedProjects: Joi.number().required(),
        interestedDomain: Joi.string().required(),
        averageReceivedDonationYear: Joi.number().required(),
        contactNumber: Joi.string().required(),
        country: Joi.string().required(),
        startDate: Joi.string().required(),
        visibility: Joi.string().required(),
        registerationNumber: Joi.string().required(),
        imageUrl: Joi.string()
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:Logger = Container.get('logger');
      logger.debug('Calling NGO-Profile endpoint with body: %o', req.body );
      try { 
        let user = req.currentUser ;
        req.body.userId = user._id ;
        const profileServiceInstance = Container.get(ProfileService);
        const { ngoProfile} = await profileServiceInstance.NgoProfile(req.body as INgoProfileInputDTO);
        return res.status(201).json({ ngoProfile });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );


    // custom API to get all Ngos
    route.get(
      '/ngo',
      async (req: Request, res: Response, next: NextFunction) => {
        const logger:Logger = Container.get('logger');
        logger.debug('Calling Project endpoint with body: %o', req.body );
        try {
          const profileServiceInstance = Container.get(ProfileService);
          const { ngoProfile} = await profileServiceInstance.GetNgos();
          return res.status(201).json({ ngoProfile });
        } catch (e) {
          logger.error('🔥 error: %o', e);
          return next(e);
        }
      },
    );

// update ngo profile
route.put(
  '/ngo',
  middlewares.isAuth, middlewares.attachCurrentUser,
  celebrate({
    body: Joi.object({

      nickName: Joi.string().required(),
      branchId: Joi.string().required(),
      totalBranches:Joi.number().required(),
      completedProjects: Joi.number().required(),
      interestedDomain: Joi.string().required(),
      averageReceivedDonationYear: Joi.number().required(),
      contactNumber: Joi.string().required(),
      country: Joi.string().required(),
      startDate: Joi.string().required(),
      visibility: Joi.string().required(),
      registerationNumber: Joi.string().required()
    }),
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    const logger:Logger = Container.get('logger');
    logger.debug('Calling NGO-Profile endpoint with body: %o', req.body );
    try {
       let user = req.currentUser ;
        req.body.userId = user._id ;
      const profileServiceInstance = Container.get(ProfileService);
      const { ngoProfile} = await profileServiceInstance.NgoProfileUpdate(req.body as INgoProfileInputDTO);
      return res.status(201).json({ ngoProfile });
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  },
);

////////////////////////////////////// Donor Profile post function
route.post(
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
       const { donorProfile} = await profileServiceInstance.DonorProfile(req.body as IDonorProfileInputDTO);
      return res.status(201).json({ donorProfile });
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  },
);
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
