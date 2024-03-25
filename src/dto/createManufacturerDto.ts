import { IsNotEmpty, IsString } from "class-validator"

export class createManufacturerDto{
    @IsString()
    @IsNotEmpty()
    man_name:string
    @IsNotEmpty()
    man_phone:string
    
}