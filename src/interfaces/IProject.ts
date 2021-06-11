 /* call by routes and services*/
export interface IProject {
    _id: string;
    tittle: string;
    projectType: string;
    estimatedBudget: number;
    //totalDonation: number;
    //collectedDonation: number;
    descriptionStory: string ;
    objective: string ;
    //receivedDonationArea: string;
    //currentExpenses: number;
    country: string;
    //expectedEndDate: string;
    startDate: string;
    //visibility: string;
    registerationNumber: string;
    //totalDonors: string;
    //visibleDonors: string;
    imageUrl: string ;
    userId: string; // for user authentication
    rating: number; // this is responsible for the rating of the ngo
    
  }
   /* this is only to get input and map into the database*/
  export interface IProjectInputDTO {
    tittle: string;
    projectType: string;
    estimatedBudget: number;
    descriptionStory: string ;
    objective: string ;
    country: string;
    startDate: string;
    registerationNumber: string;
    imageUrl: string ;
    userId: string;
    rating: number;
  }