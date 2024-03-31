import { IsNotEmpty, IsNumber, IsOptional } from "class-validator"

export class createDrugDto{
    @IsNotEmpty()
    item_name:string
    @IsNotEmpty()
    retail_price:string
    @IsNotEmpty()
    selling_price:string
    @IsOptional()
    manufacturer_id:string
    @IsOptional()
    barcode_no:string
    @IsOptional()
    expiry_date:Date
    @IsNumber()
    in_stock:number
}
