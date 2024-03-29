 /* call by routes and services*/
export interface IProject {
    _id: string;
    tittle: string;
    projectType: string;
    estimatedBudget: number;
    totalDonation: number;
    collectedDonation: number;
    descriptionStory: string ;
    objective: string ;
    receivedDonationArea: string;
    currentExpenses: number;
    country: string;
    expectedEndDate: string;
    startDate: string;
    visibility: string;
    RegisterationNumber: string;
    totalDonors: string;
    visibleDonors: string;
    userId: string; // for user authentication
    
  }
   /* this is only to get input and map into the database*/
  export interface IProjectInputDTO {
    tittle: string;
    projectType: string;
    estimatedBudget: number;
    totalDonation: number;
    collectedDonation: number;
    descriptionStory: string ;
    objective: string ;
    receivedDonationArea: string;
    currentExpenses: number;
    country: string;
    expectedEndDate: string;
    startDate: string;
    visibility: string;
    RegisterationNumber: string;
    totalDonors: string;
    visibleDonors: string;
    userId: string;
  }