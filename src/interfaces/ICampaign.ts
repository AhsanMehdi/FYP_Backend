 /* call by routes and services*/
export interface ICampaign {
    _id: string;
    nickName: string;
    subject: string;
    descriptionStory:string;
    objective: string;
    country: string;
    status: string;
    visibility: string;
    dateOfCreation: string;
    userId: string; // for user authentication
  }
  /* this is only to get input and map into the database*/
  export interface ICampaignInputDTO {

    nickName: string;
    subject: string;
    descriptionStory:string;
    objective: string;
    country: string;
    status: string;
    visibility: string;
    dateOfCreation: string;
    userId: string;
  }

