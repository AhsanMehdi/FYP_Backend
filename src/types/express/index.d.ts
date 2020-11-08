import { Document, Model } from 'mongoose';
import { IUser } from '../../interfaces/IUser';
import { INgoProfile } from '../../interfaces/INgoProfile';
declare global {
  namespace Express {
    export interface Request {
      currentUser: IUser & Document;
     // ngoProfile: INgoProfile & Document ;
    }    
  }

  namespace Models {
    export type UserModel = Model<IUser & Document>;
    export type NgoProfileModel = Model<INgoProfile & Document>;
  }
}
