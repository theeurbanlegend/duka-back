import { IsArray, IsNotEmpty, IsString } from "class-validator"
import { ObjectId } from "mongoose"

export class createTxDto{
    @IsNotEmpty()
    tx_type:string
    @IsArray()
    tx_details:txn_detail[]
    @IsNotEmpty()
    payment_type:string
    payment_details?:{
        tx_id:string
        tx_type:string
        tx_time:string
        amnt_paid:string
        cus_name:string
        cus_no:string
    }
    @IsNotEmpty()
    tx_total:string
}
interface txn_detail{
    item_affected:ObjectId,
    stock_in:string
    stock_out:string
    profit:number
}