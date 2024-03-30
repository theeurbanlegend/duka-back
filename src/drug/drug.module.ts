import { Module } from '@nestjs/common';
import { DrugController } from './drug.controller';
import { DrugService } from './drug.service';
import { MongooseModule } from '@nestjs/mongoose';
import { drugSchema } from 'src/models';
import { TxnService } from 'src/txn/txn.service';
import { transactionSchema } from 'src/models/transactionSchema';
import { SocketIoGateway } from 'src/socket.io/socket.io.gateway';
import { BarcodeService } from 'src/barcode/barcode.service';

@Module({
  imports:[MongooseModule.forFeature([{name:'Drug', schema:drugSchema}]), MongooseModule.forFeature([{name:'Txn', schema:transactionSchema}])],
  exports:[MongooseModule.forFeature([{name:'Drug', schema:drugSchema}])],
  controllers: [DrugController],
  providers: [BarcodeService,DrugService, TxnService, SocketIoGateway]
})
export class DrugModule {}
