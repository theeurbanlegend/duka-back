import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { ObjectId } from 'mongoose';
import { createManufacturerDto } from 'src/dto';
export interface Manufacturer extends Document{
    name:string
    phone?:string
}
@Injectable()
export class ManufacturerService {
    constructor(@InjectModel('Manufacturer') private manufacturerModel: Model<Manufacturer>) {}

    async getAllManufacturers(): Promise<Manufacturer[]> {
        return await this.manufacturerModel.find({})
    }

    async getManufacturerById(manufacturerId: ObjectId): Promise<Manufacturer> {
        return await this.manufacturerModel.findById(manufacturerId).exec();
    }

    async addManufacturer(manufacturerDto: createManufacturerDto): Promise<Manufacturer> {
        const newManufacturer = new this.manufacturerModel(manufacturerDto);
        const added=await newManufacturer.save()
        return added
    }
    async updateManufacturer(manufacturerId: ObjectId, manufacturerDto: createManufacturerDto): Promise<Manufacturer> {
        return await this.manufacturerModel.findByIdAndUpdate(manufacturerId, manufacturerDto, { new: true }).exec();
    }
    async removeManufacturer(manufacturerId: ObjectId) {
        return await this.manufacturerModel.findByIdAndDelete(manufacturerId).exec()
    }
}
