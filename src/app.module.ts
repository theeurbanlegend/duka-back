import { Global, Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { DrugModule } from './drug/drug.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BarcodeService } from './barcode/barcode.service';
import { SocketIoGateway } from './socket.io/socket.io.gateway';
import { JwtService } from '@nestjs/jwt';
import { TxnService } from './txn/txn.service';
import { TxnModule } from './txn/txn.module';
import { DrugService } from './drug/drug.service';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv'; // Import dotenv
dotenv.config(); // Load environment variables from .env file

@Module({
  imports: [
    ConfigModule.forRoot(),UserModule, ManufacturerModule, DrugModule,MongooseModule.forRoot(process.env.MONGO_URI), TxnModule],
  controllers: [UserController],
  providers: [UserService, BarcodeService, SocketIoGateway,JwtService, TxnService, DrugService]
})
export class AppModule {}
