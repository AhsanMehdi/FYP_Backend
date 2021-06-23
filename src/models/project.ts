/* layer under the interface
   a schema of document
   WHY THIS :: containing all the parameters of the project
*/
import { IProject } from '../interfaces/IProject';
import mongoose from 'mongoose';
import { type } from 'os';
/* document structure 
   one by one parameters 
   types and constraints
*/

const Project = new mongoose.Schema(
  {
    tittle: {
      type: String,
      required: [true, 'Please enter a nick name name'],
      index: true,
    },

    projectType: {
        type: String,
        required: [true, 'Please enter a nick name name'],
        index: true,
    },
    estimatedBudget: {
        type: Number,
        required: [true, 'Please enter a nick name name'],
        index: true,
    },

    // totalDonation: {
    //     type: Number,
    //     required: [true, 'Please enter a nick name name'],
    //     index: true,
    // },
    // collectedDonation: {
    //     type: Number,
    //     required: [true, 'Please enter a nick name name'],
    //     index: true,
    // },
    descriptionStory: {
        type: String,
        required: [true, 'Please enter a nick name name'],
        index: true,
    },
    objective: {
        type: String,
        required: [true, 'Please enter a nick name name'],
        index: true,
    },
    // receivedDonationArea: {
    //     type: String
    // },
    // currentExpenses: {
    //     type: Number,
    //     required: [true, 'Please enter a nick name name'],
    //     index: true,
    // },
    country: {
        type: String,
        required: [true, 'Please enter a nick name name'],
        index: true,
    },
    // expectedEndDate: {
    //     type: String,
    //     required: [true, 'Please enter a nick name name'],
    //     index: true,
    // },
    startDate: {
        type: String,
        required: [true, 'Please enter a nick name name'],
        index: true,
    },
    // visibility: {
    //     type: String,
    //     required: [true, 'Please enter a nick name name'],
    //     index: true,
    // },
    registerationNumber: {
        type: String,
        required: [true, 'Please enter a nick name name'],
        index: true,
    },
    // totalDonors: {
    //     type: String,
    //     required: [true, 'Please enter a nick name name'],
    //     index: true,
    // },
    // visibleDonors: {
    //     type: String,
    //     required: [true, 'Please enter a nick name name'],
    //     index: true,
    // },
    userId: {
        type: String,
        required: [true, 'Please enter a nick name name'],
        index: true,
    },
    imageUrl: {
        type: String,
        required: [true, 'Please enter a nick name name'],
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
//// link with Project Interface
export default mongoose.model<IProject & mongoose.Document>('PROJECT', Project);
