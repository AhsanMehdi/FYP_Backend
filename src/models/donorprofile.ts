import { IDonorProfile } from '../interfaces/IDonorProfile';
import mongoose from 'mongoose';


const DonorProfile = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please enter a nick name name'],
      index: true,
    },

    middleName: {
      type: String,
      index: true,
    },

    lastName:{
        type: String,
        index: true,
    },

    dob:{
        type: String,
        index: true,
    },

    interestedDomain: {
        type: String,
        required: true, 
        index: true,
    },
    
    cellNumber:{
        type: String,
        index: true,
    },

    cnic: {
        type: String,
        required: false, 
        index: true,
    },

    country: {
        type: String,
        required: true, 
        index: true,
    },

    visibility: {
        type: String,
        required: true, 
        index: true,
    },

    occupation: {
        type: String,
        required: true, 
        index: true,
    },
    userId:{
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

export default mongoose.model<IDonorProfile & mongoose.Document>('DONORProfile', DonorProfile);
