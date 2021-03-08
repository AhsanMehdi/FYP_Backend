 /* call by routes and services*/
export interface INgoProfile {
    _id: string;
    nickName: string;
    completedProjects: number;
  
    //averageReceivedDonationYear: number;
    contactNumber: string;
    country: string;
    domainHealth: boolean;
    domainEducation: boolean;
    domainOrphanage: boolean;
    domainEnvironment: boolean;
    domainSocialWelfare: boolean;
    domainOther: boolean;
    //startDate: string;
    //visibility: string;
    //registerationNumber: string;
    userId: string; // only for user authentication
    
  }
   /* this is only to get input and map into the database*/
  export interface INgoProfileInputDTO {
    nickName: string;
    completedProjects: number;
  
    //averageReceivedDonationYear: number;
    contactNumber: string;
    country: string;
    domainHealth: boolean;
    domainEducation: boolean;
    domainOrphanage: boolean;
    domainEnvironment: boolean;
    domainSocialWelfare: boolean;
    domainOther: boolean;
    //startDate: string;
    //visibility: string;
    //registerationNumber: string;
    userId: string; // only for user authentication
 
  }