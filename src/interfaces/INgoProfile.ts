export interface INgoProfile {
    _id: string;
    nickName: string;
    branchId: string;
    totalBranches:number;
    completedProjects: number;
    interestedDomain: string;
    averageReceivedDonationYear: number;
    contactNumber: string;
    country: string;
    startDate: string;
    visibility: string;
    registerationNumber: string;
    userId: string;
    
  }
  
  export interface INgoProfileInputDTO {
    nickName: string;
    branchId: string;
    totalBranches:number;
    completedProjects: number;
    interestedDomain: string;
    averageReceivedDonationYear: number;
    contactNumber: string;
    country: string;
    startDate: string;
    visibility: string;
    registerationNumber: string;
    userId: string;
 
  }