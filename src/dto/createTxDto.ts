import { IsArray, IsNotEmpty, IsString } from "class-validator"
import { ObjectId } from "mongoose"

export class createTxDto{
    @IsNotEmpty()
    tx_type:string
    @IsArray()
    tx_details:txn_detail[]
    @IsNotEmpty()
    tx_total:string
}
interface txn_detail{
    item_affected:ObjectId,
    stock_in:string
    stock_out:string
    profit:number
}