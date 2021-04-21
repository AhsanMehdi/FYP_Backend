 /* call by routes and services*/
export interface IReviewProject {
    _id: string;
    comment: string;
    like: string;
    projectId: string; // for user authentication
    
  }
   /* this is only to get input and map into the database*/
  export interface IReviewProjectInputDTO {
    comment: string;
    like: string;
    projectId: string; // for user authentication
  }