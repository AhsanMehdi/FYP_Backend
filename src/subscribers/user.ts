import { Container } from 'typedi';
import { EventSubscriber, On } from 'event-dispatch';
import events from './events';
import { IUser } from '../interfaces/IUser';
import mongoose from 'mongoose';
import { Logger } from 'winston';

@EventSubscriber()
export default class UserSubscriber {

  @On(events.user.signIn)
  public onUserSignIn({ _id }: Partial<IUser>) {
    const Logger: Logger = Container.get('logger');

    try {
      const UserModel = Container.get('UserModel') as mongoose.Model<IUser & mongoose.Document>;

      UserModel.update({ _id }, { $set: { lastLogin: new Date() } });
    } catch (e) {
      Logger.error(`🔥 Error on event ${events.user.signIn}: %o`, e);

      // Throw the error so the process die (check src/app.ts)
      throw e;
    }
  }

  @On(events.user.signUp)
  public onUserSignUp({ name, email, _id }: Partial<IUser>) {
    const Logger: Logger = Container.get('logger');

    try {
      /**
       * @TODO implement this
       */
      // Call the tracker tool so your investor knows that there is a new signup
      // and leave you alone for another hour.
      // TrackerService.track('user.signup', { email, _id })
      // Start your email sequence or whatever
      // MailService.startSequence('user.welcome', { email, name })
    } catch (e) {
      Logger.error(`🔥 Error on event ${events.user.signUp}: %o`, e);

      // Throw the error so the process dies (check src/app.ts)
      throw e;
    }
  }
}
