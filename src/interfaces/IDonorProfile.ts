export interface IDonorProfile {
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
  }
  
  export interface IDonorProfileInputDTO {
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
  }