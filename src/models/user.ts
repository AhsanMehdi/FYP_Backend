/* layer under the layers of 
   all attributes of signin and signup  
*/
import { IUser } from '../interfaces/IUser';
import mongoose from 'mongoose';
/*
   the schema parameters

*/
const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a full name'],
      index: true,
    },

    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },

    
    password: String,

    salt: String,

    
    userType: {
      type: String,
      required: [false, 'Please enter user type'],
      index: true,
    },

    role: {
      type: String,
      default: 'user',
    },
  },
  { timestamps: true },
);
//// containing the signin signup attributes of user
export default mongoose.model<IUser & mongoose.Document>('User', User);
