export interface UserDto {
    id?:number
    username?: string;
    name?:string;
    password?: string;
    email?: string;
    birthday?: Date;
    role?: string;
    postDtoList?: any[]; 
  }