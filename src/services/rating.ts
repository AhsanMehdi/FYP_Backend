import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import MailerService from './mailer';
import config from '../config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import {  IRating,IRatingDTO } from '../interfaces/IRating';
import {  IReviewProject } from '../interfaces/IReviewProject';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import events from '../subscribers/events';
import { isElement } from 'lodash';

@Service()
export default class RatingService {
  constructor(
       @Inject('logger') private logger,
       @Inject('axios') private axios,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {
  }

  public async getRating(reviews: IReviewProject[]): Promise<IRating> {
    try {

      var FormData = require('form-data');
      var data = new FormData();
      
      reviews.forEach(element => {

        data.append('comment',element.comment)
        console.log("data going to python"+ data)
        console.log("comments one by one"+ element.comment)
      });
        //console.log("all comments are: "+FormData)
        
        var config = {
          
          method: 'post',
          url: 'http://127.0.0.1:5000/get_rating',
          headers: { 
            'Content-Type': 'application/json', 
            ...data.getHeaders()
          },
          data : data
          
          
        };

      let result = await  this.axios(config)

      const responce = {
        rating: result.data 
      }
  
      return responce;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

 
  
}
