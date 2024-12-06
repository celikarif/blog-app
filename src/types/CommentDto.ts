import { PostDto } from "./PostDto";
import { UserDto } from "./UserDto";

export interface CommentDto { 
    id ?: number;
    content?:string;
    createdAt?:Date;
    postDto?:PostDto; 
    userDto?:UserDto;
}


