import { IsNotEmpty, IsOptional } from "class-validator"

export class createUserDto{
    @IsNotEmpty()
    name:string
    @IsNotEmpty()
    phone:string
    @IsOptional()
    recovery_email?:string
    @IsNotEmpty()
    password:string
    
}