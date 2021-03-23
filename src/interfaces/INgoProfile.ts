 /* call by routes and services*/
export interface INgoProfile {
    _id: string;
    nickName: string;
    //completedProjects: number;
    contactNumber: string;
    country: string;
    domainHealth: boolean;
    domainEducation: boolean;
    domainOrphanage: boolean;
    domainEnvironment: boolean;
    domainSocialWelfare: boolean;
    domainOther: boolean;
    userId: string; // only for user authentication
    
  }
   /* this is only to get input and map into the database*/
  export interface INgoProfileInputDTO {
    nickName: string;
    contactNumber: string;
    country: string;
    domainHealth: boolean;
    domainEducation: boolean;
    domainOrphanage: boolean;
    domainEnvironment: boolean;
    domainSocialWelfare: boolean;
    domainOther: boolean;
    userId: string; // only for user authentication
 
  }