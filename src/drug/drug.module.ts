import { Module } from '@nestjs/common';
import { DrugController } from './drug.controller';
import { DrugService } from './drug.service';
import { MongooseModule } from '@nestjs/mongoose';
import { drugSchema } from 'src/models';
import { TxnService } from 'src/txn/txn.service';
import { transactionSchema } from 'src/models/transactionSchema';

@Module({
  imports:[MongooseModule.forFeature([{name:'Drug', schema:drugSchema}]), MongooseModule.forFeature([{name:'Txn', schema:transactionSchema}])],
  exports:[MongooseModule.forFeature([{name:'Drug', schema:drugSchema}])],
  controllers: [DrugController],
  providers: [DrugService, TxnService]
})
export class DrugModule {}
