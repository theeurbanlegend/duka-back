import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { createUserDto } from 'src/dto';
import { UserService } from './user.service';
import { ObjectId } from 'mongoose';
import { BarcodeService } from 'src/barcode/barcode.service';

@Controller('user')
export class UserController {
    constructor(private userService:UserService, private barcodeService:BarcodeService){}
    @Get('test')
    getItem(){
        return this.barcodeService.getBarcodeDetails("6168686105175")
    }
    @Post('register')
    register(@Body() userDto:createUserDto){
        return this.userService.register(userDto)
    }
    @Post('login')
    signin(@Body('phone') phone:string, @Body('password') password:string){
        return this.userService.signin(phone,password)
    }
    @Post(':id/edit')
    editDetails(@Param('id') userId:ObjectId, @Body('password') password:string){
        return this.userService.editDetails(userId, password)
    }
}
