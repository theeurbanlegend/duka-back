import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class createManufacturerDto{
    @IsString()
    @IsNotEmpty()
    man_name:string
    @IsNotEmpty()
    man_phone:string
    @IsOptional()
    man_email:string
    @IsOptional()
    man_location:string
    @IsOptional()
    man_website:string
}