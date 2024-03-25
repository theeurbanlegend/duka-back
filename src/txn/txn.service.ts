import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongoose';
import { Drug, DrugService } from 'src/drug/drug.service';
import { createTxDto } from 'src/dto';
export interface Txn extends Document {
  tx_type: string;
  tx_details: txn_detail[]
  tx_total: string;
}

interface txn_detail{
    item_affected:ObjectId,
    stock_in:string
    stock_out:string
    profit:number
}
@Injectable()
export class TxnService {
  constructor(
    @InjectModel('Txn') private txnModel: Model<Txn>,
    @InjectModel('Drug') private drugModel:Model<Drug>
  ) {}
  async getTxns():Promise<Txn[]|string>{
    const allTxns=await this.txnModel.find({}).populate('tx_details.item_affected')
    if(allTxns.length===0) return "No txns created yet"
    return allTxns
  }
  async performCheckout(txnData: createTxDto):Promise<string> {
    const { tx_details}=txnData
    const bulkUpdateOps = tx_details.map(txn => ({
        updateOne: {
            filter: { _id: txn.item_affected },
            update: { $set: { ["in_stock"]: txn.stock_out } },
        },
    }));

    // Execute bulk update
    const result = await this.drugModel.bulkWrite(bulkUpdateOps)
    if(result.ok){
        const newTxn= await this.txnModel.create(txnData)
        await newTxn.save()
        return `New Transaction ${newTxn._id} created!`
    }else return "Error Adding Txn!"

    
  }
}
