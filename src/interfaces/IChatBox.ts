export interface IChatBox {
    _id: string;
    subject: string;
    message: string;
    createdAt:string;
    to:string;
    from:string;



  }
  
  export interface IChatBoxInputDTO {
    subject: string;
    message: string;
    createdAt:string;
    to:string;
    from:string;

  }