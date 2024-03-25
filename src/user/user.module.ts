import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/models';
import { BarcodeService } from 'src/barcode/barcode.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
@Module({
    imports:[MongooseModule.forFeature([{name:"User", schema:userSchema}])],
    exports:[MongooseModule.forFeature([{name:"User", schema:userSchema}])],
    controllers:[UserController],
    providers:[UserService, BarcodeService, JwtService]
})
export class UserModule {}
