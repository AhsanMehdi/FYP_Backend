import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import MailerService from './mailer';
import config from '../config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { IProject, IProjectInputDTO } from '../interfaces/IProject';
import { IReviewProject, IReviewProjectInputDTO } from '../interfaces/IReviewProject';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import events from '../subscribers/events';

@Service()
export default class ReviewProjectService {
  constructor(
    @Inject('reviewProjectModel') private reviewProjectModel: Models.ReviewProjectModel,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {
  }

  public async GiveFeedback(reviewProjectInputDTO: IReviewProjectInputDTO): Promise<{ reviewProject: IReviewProjectInputDTO }> { /* project interface*/
    try {
  

      this.logger.silly('project');
      this.logger.silly('Creating ngo profile db record');
      const reviewProjectRecord = await this.reviewProjectModel.create({
        ...reviewProjectInputDTO
      });
      this.logger.silly('Generating JWT');
  

      if (!reviewProjectRecord) {
        throw new Error('Project cannot be created');
      }

      /**
       * @TODO This is not the best way to deal with this
       * There should exist a 'Mapper' layer
       * that transforms data from layer to layer
       * but that's too over-engineering for now
       */
      const reviewProject = reviewProjectRecord.toObject(); 
      return { reviewProject };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  
}
