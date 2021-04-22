 /* call by routes and services*/
export interface IChatBox {
    _id: string; // for user authentication
    
    message: string;
    fromId:string;
    toId:string;
  



  }
   /* this is only to get input and map into the database*/
  export interface IChatBoxInputDTO {
  
    message: string;
    fromId:string;
    toId:string;
  
    to:string;
  

  }