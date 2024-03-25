import { Module } from '@nestjs/common';
import { ManufacturerController } from './manufacturer.controller';
import { ManufacturerService } from './manufacturer.service';
import { manufacturerSchema } from 'src/models';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name:'Manufacturer', schema:manufacturerSchema}])],
  exports:[MongooseModule.forFeature([{name:'Manufacturer', schema:manufacturerSchema}])],
  controllers: [ManufacturerController],
  providers: [ManufacturerService]
})
export class ManufacturerModule {}
