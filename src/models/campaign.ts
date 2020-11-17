import { ICampaign } from '../interfaces/ICampaign';
import mongoose from 'mongoose';


const Campaign = new mongoose.Schema(
  {
    nickName: {
      type: String,
      required: [true, 'Please enter a nick name name'],
      index: true,
    },

    subject: {
      type: String,
      index: true,
    },

    descriptionStory:{
        type: String,
        index: true,
    },

    objective:{
        type: String,
        index: true,
    },

    country: {
        type: String,
        required: true, 
        index: true,
    },
    
    status:{
        type: String,
        index: true,
    },

    visibility: {
        type: String,
        required: false, 
        index: true,
    },

    dateOfCreation: {
        type: String,
        required: true, 
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

export default mongoose.model<ICampaign & mongoose.Document>('CAMPAIGN', Campaign);


