/* the layer under interface 
   basically a document parameters
    WHY THIS :: containing all the parameters of the donor profile
*/

import { IDonorProfile } from '../interfaces/IDonorProfile';
import mongoose from 'mongoose';

/* document structure 
   one by one parameters 
   types and constraints
*/
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

    // interestedDomain: {
    //     type: String,
    //     required: true, 
    //     index: true,
    // },
    
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
    /* adding some attributes regarding the interested domain*/
    domainHealth: {
      type: Boolean,
      required: true, 
      index: true,
  },
      domainEducation: {
        type: Boolean,
        required: true, 
        index: true,
    },
    domainOrphanage: {
      type: Boolean,
      required: true, 
      index: true,
    },
    domainEnvironment: {
      type: Boolean,
      required: true, 
      index: true,
    },
    domainSocialWelfare: {
      type: Boolean,
      required: true, 
      index: true,
    },
    domainOther: {
      type: Boolean,
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
//// link with interface
export default mongoose.model<IDonorProfile & mongoose.Document>('DONORProfile', DonorProfile);  
