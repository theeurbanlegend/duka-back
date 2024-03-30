import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { transactionSchema } from 'src/models/transactionSchema';
import { TxnService } from './txn.service';
import { DrugService } from 'src/drug/drug.service';
import { drugSchema } from 'src/models';
import { SocketIoGateway } from 'src/socket.io/socket.io.gateway';
import { BarcodeService } from 'src/barcode/barcode.service';

@Module({
  imports:[MongooseModule.forFeature([{name:'Txn', schema:transactionSchema}]), MongooseModule.forFeature([{name:'Drug', schema:drugSchema}])],
  exports:[MongooseModule.forFeature([{name:'Txn', schema:transactionSchema}])],
  controllers: [],
  providers: [BarcodeService,TxnService, DrugService, SocketIoGateway]
})
export class TxnModule {}
