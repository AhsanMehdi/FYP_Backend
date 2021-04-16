/* layer under the interface
   a schema of document
   WHY THIS :: containing all the parameters of the ngo profile
*/
import { INgoProfile } from '../interfaces/INgoProfile';
import mongoose from 'mongoose';
/* document structure 
   one by one parameters 
   types and constraints
*/

const NgoProfile = new mongoose.Schema(
  {
    nickName: {
      type: String,
      required: [true, 'Please enter a nick name name'],
      index: true,
    },
/*      Has been excludedd for runtime 
     branchId: {
      type: String,
      index: true,
    },

    totalBranches:{
        type: Number,
        index: true,
    },*/


    // completedProjects:{
    //     type: Number,
    //     index: true,
    // },

    // interestedDomain: {
    //     type: String,
    //     required: true, 
    //     index: true,
    // },
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
    
    // averageReceivedDonationYear:{
    //     type: Number,
    //     index: true,
    // },

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

    // startDate: {
    //     type: String,
    //     required: true, 
    //     index: true,
    // },

    // visibility: {
    //     type: String,
    //     required: true, 
    //     index: true,
    // },

    // registerationNumber: {
    //     type: String,
    //     required: true, 
    //     index: true,
    // },
    userId:{
      type: String,
      required: true, 
      index: true,

    },
  //   imageUrl: {
  //     type: String,
  //     required: [true, 'Please enter a nick name name'],
  //     index: true,
  // },

/// role of user they have to perform
    role: {
      type: String,
      default: 'user',
    },
  },
  { timestamps: true },
);
//// link with interface
export default mongoose.model<INgoProfile & mongoose.Document>('NGOProfile', NgoProfile);
