import { CategoryDto } from "./CategoryDto";
import { UserDto } from "./UserDto";

export interface PostDto {
    id ?: number;
    title?: string;
    content?:string;
    imageUrl?:string;
    createdAt?:Date;
    updatedAt?:Date;
    userDto?:UserDto;
    commentDtoList ?: any[];
    categoryDtoList?:CategoryDto[];
}

