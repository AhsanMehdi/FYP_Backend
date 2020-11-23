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
    userId: string;
  }
  
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

