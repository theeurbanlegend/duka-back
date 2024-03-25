import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongoose';
import { createDrugDto } from 'src/dto';
export interface Drug extends Document{
    item_name:string
    item_price:string
    manufacturer_id:ObjectId
    barcode_no?:string
    in_stock:number
}
@Injectable()
export class DrugService {
    constructor(@InjectModel('Drug') private drugModel: Model<Drug>) {}

    async getAllDrugs(): Promise<Drug[]> {
        return await this.drugModel.find().exec();
    }

    async getDrugById(drugId: ObjectId): Promise<Drug> {
        return await this.drugModel.findById(drugId).exec();
    }

    async addDrug(drugDto: createDrugDto): Promise<Drug> {
        const newDrug = new this.drugModel(drugDto);
        return await newDrug.save();
    }

    async updateDrug(drugId: ObjectId, drugDto: createDrugDto): Promise<Drug> {
        return await this.drugModel.findByIdAndUpdate(drugId, drugDto, { new: true }).exec();
    }

    async removeDrug(drugId: ObjectId) {
        return await this.drugModel.findByIdAndDelete(drugId).exec();
    }
    
}
