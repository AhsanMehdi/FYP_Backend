/*
    Chatbox model layer under part of the interface of chatbox
*/

import { IChatBox } from '../interfaces/IChatBox';
import mongoose from 'mongoose';

/* document structure 
   one by one parameters 
   types and constraints
*/
const ChatBox = new mongoose.Schema(
  {
    

    message: {
      type: String,
      index: true,
    },



    to:{
      type: String,
      index: true,
    },

    from:{
    type: String,
    index: true,
    },


/// role of user they have to perform
    role: {
      type: String,
      default: 'user',
    },
  },
  { timestamps: true },
);
//// link with interface
export default mongoose.model<IChatBox & mongoose.Document>('CHATBox', ChatBox);
