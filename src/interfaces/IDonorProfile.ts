export interface IDonorProfile {
    _id: string;
    firstName: string;
    middleName: string;
    lastName:string;
    dob: string;
    interestedDomain: string;
    cellNumber: string;
    cnic: string;
    country: string;
    visibility: string;
    occupation: string;
  }
  
  export interface IDonorProfileInputDTO {
    firstName: string;
    middleName: string;
    lastName:string;
    dob: string;
    interestedDomain: string;
    cellNumber: string;
    cnic: string;
    country: string;
    visibility: string;
    occupation: string;
  }