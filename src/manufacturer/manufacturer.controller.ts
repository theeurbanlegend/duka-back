import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { ObjectId } from 'mongoose';
import { createManufacturerDto } from 'src/dto';

@Controller('manufacturer')
export class ManufacturerController {
    constructor(private manufacturerService:ManufacturerService){}
    @Get('all')
    getAllManufacturers(){
        return this.manufacturerService.getAllManufacturers()
    }
    @Get(':id/single')
    getManufacturerById(@Param('id') manufacturerId:ObjectId){
        return this.manufacturerService.getManufacturerById(manufacturerId)
    }
    @Post('/add')
    addManufacturer(@Body() manufacturerDto:createManufacturerDto){
        return this.manufacturerService.addManufacturer(manufacturerDto)
    }
    @Post(':id/update')
    updateManufacturer(@Param('id') manufacturerId:ObjectId, @Body() manufacturer:createManufacturerDto){
        return this.manufacturerService.updateManufacturer(manufacturerId, manufacturer)
    }
    @Post(':id/remove')
    removeManufacturer(@Param('id') manufacturerId:ObjectId){
        return this.manufacturerService.removeManufacturer(manufacturerId)
    }

}
