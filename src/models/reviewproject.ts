/* layer under the interface
   a schema of document
   WHY THIS :: containing all the parameters of the project
*/
import { IReviewProject } from '../interfaces/IReviewProject';
import mongoose from 'mongoose';
import { type } from 'os';
/* document structure 
   one by one parameters 
   types and constraints
*/

const ReviewProject = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, 'Please write a comment here '],
      index: true,
    },

    like: {
        type: String,
        required: [true, 'write like'],
        index: true,
    },
    dislike: {
        type: String,
        required: [true, 'write dislike'],
        index: true,
    },

    userId: {
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
export default mongoose.model<IReviewProject & mongoose.Document>('ReviewPROJECT', ReviewProject);
