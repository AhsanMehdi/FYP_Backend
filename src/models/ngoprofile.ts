import { INgoProfile } from '../interfaces/INgoProfile';
import mongoose from 'mongoose';


const NgoProfile = new mongoose.Schema(
  {
    nickName: {
      type: String,
      required: [true, 'Please enter a nick name name'],
      index: true,
    },

    branchId: {
      type: String,
      index: true,
    },

    totalBranches:{
        type: Number,
        index: true,
    },

    completedProjects:{
        type: Number,
        index: true,
    },

    interestedDomain: {
        type: String,
        required: true, 
        index: true,
    },
    
    averageReceivedDonationYear:{
        type: Number,
        index: true,
    },

    contactNumber: {
        type: String,
        required: true, 
        index: true,
    },

    country: {
        type: String,
        required: true, 
        index: true,
    },

    startDate: {
        type: String,
        required: true, 
        index: true,
    },

    visibility: {
        type: String,
        required: true, 
        index: true,
    },

    registerationNumber: {
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

export default mongoose.model<INgoProfile & mongoose.Document>('NGOProfile', NgoProfile);
