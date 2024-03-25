import { IsNotEmpty, IsNumber, IsOptional } from "class-validator"

export class createDrugDto{
    @IsNotEmpty()
    item_name:string
    @IsNotEmpty()
    item_price:string
    @IsOptional()
    manufacturer_id:string
    @IsOptional()
    barcode_no:string
    @IsNumber()
    in_stock:number
}
