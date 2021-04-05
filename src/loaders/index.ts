import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import jobsLoader from './jobs';
import Logger from './logger';
//We have to import at least all the events once so they can be triggered
import './events';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  const userModel = {
    name: 'userModel',
    // Notice the require syntax and the '.default'
    model: require('../models/user').default,
  };
/////////////////////////////// NGO Profile Model
  const ngoProfileModel = {
    name: 'ngoProfileModel',
    // Notice the require syntax and the '.default'
    model: require('../models/ngoprofile').default,
  };
/////////////////////////////// DONOR Profile Model
  const donorProfileModel = {
    name: 'donorProfileModel',
    // Notice the require syntax and the '.default'
    model: require('../models/donorprofile').default,
  };
  ////////////////////////////// PROJECT Model
  const projectModel = {
    name: 'projectModel',
    // Notice the require syntax and the '.default'
    model: require('../models/project').default,
  };
  ///////////////////////////// CAMPAIGN MODEL
  const campaignModel = {
    name: 'campaignModel',
    // Notice the require syntax and the '.default'
    model: require('../models/campaign').default,
  };

  ////////////////////////////// CAHTBOX Model
  const chatBoxModel = {
    name: 'chatBoxModel',
    // Notice the require syntax and the '.default'
    model: require('../models/chatbox').default,
  };
  const reviewProjectModel = {
    name: 'reviewProjectModel',
    // Notice the require syntax and the '.default'
    model: require('../models/reviewproject').default,
  };

  // It returns the agenda instance because it's needed in the subsequent loaders
  const { agenda } = await dependencyInjectorLoader({
    mongoConnection,
    models: [
      userModel,
      ngoProfileModel,
      donorProfileModel,
      projectModel,
      campaignModel,
      chatBoxModel,
      reviewProjectModel,

      // salaryModel,
      // whateverModel
    ],
  });
  Logger.info('✌️ Dependency Injector loaded');

  await jobsLoader({ agenda });
  Logger.info('✌️ Jobs loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
