 /* call by routes and services*/
export interface IChatBox {
    _id: string; // for user authentication
    subject: string;
    message: string;
    createdAt:string;
    to:string;
    from:string;



  }
   /* this is only to get input and map into the database*/
  export interface IChatBoxInputDTO {
    subject: string;
    message: string;
    createdAt:string;
    to:string;
    from:string;

  }