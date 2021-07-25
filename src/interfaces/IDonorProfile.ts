 /* call by routes and services*/
export interface IDonorProfile {
    _id: string;
    firstName: string;
    middleName: string;
    lastName:string;
    dob: string;
    //interestedDomain: string;
    cellNumber: string;
    cnic: string;
    country: string;
    visibility: string;
    occupation: string;
    domainHealth: boolean;
    domainEducation: boolean;
    domainOrphanage: boolean;
    domainEnvironment: boolean;
    domainSocialWelfare: boolean;
    domainOther: boolean;
    //imageUrl:string
    userId: string; // only for user authentication
  }
   /* this is only to get input and map into the database*/
  export interface IDonorProfileInputDTO {
    firstName: string;
    middleName: string;
    lastName:string;
    dob: string;
    //interestedDomain: string;
    cellNumber: string;
    cnic: string;
    country: string;
    visibility: string;
    occupation: string;
    domainHealth: boolean;
    domainEducation: boolean;
    domainOrphanage: boolean;
    domainEnvironment: boolean;
    domainSocialWelfare: boolean;
    domainOther: boolean;
    //imageUrl:string
    userId: string;
  }