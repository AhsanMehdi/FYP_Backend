/*link withthe database of user*/
export interface IUser {
  _id: string; // for user authentication
  name: string;
  email: string;
  password: string;
  salt: string;
  userType: string;
}
/* to map input into data base schema via Interface*/
export interface IUserInputDTO {
  name: string;
  email: string;
  password: string;
  userType: string;
}
