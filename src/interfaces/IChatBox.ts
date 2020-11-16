export interface IChatBox {
    _id: string;
    subject: string;
    message: string;
    dateOfCommunication:string;
    remainderStatus:string;

  }
  
  export interface IChatBoxInputDTO {
    subject: string;
    message: string;
    dateOfCommunication:string;
    remainderStatus:string;

  }