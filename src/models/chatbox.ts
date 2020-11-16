import { IChatBox } from '../interfaces/IChatBox';
import mongoose from 'mongoose';


const ChatBox = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: [true, 'Please enter a nick name name'],
      index: true,
    },

    message: {
      type: String,
      index: true,
    },

    dateOfCommunication:{
        type: String,
        index: true,
    },

    remainderStatus:{
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

export default mongoose.model<IChatBox & mongoose.Document>('CHATBox', ChatBox);
