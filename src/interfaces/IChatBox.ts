export interface IUserCommunication {
    _id: string;
    subject: string;
    message: string;
    dateOfCommunication:string;
    remainderStatus:string;

  }
  
  export interface IUserCommunicationInputDTO {
    subject: string;
    message: string;
    dateOfCommunication:string;
    remainderStatus:string;

  }