import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DrugService } from './drug.service';
import { ObjectId } from 'mongoose';
import { createDrugDto, createTxDto } from 'src/dto';
import { Transaction, TxnService } from 'src/txn/txn.service';

@Controller('drug')
export class DrugController {
    constructor(private drugService:DrugService, private txnService:TxnService){}
    @Get('all')
    getAllDrugs(){
        return this.drugService.getAllDrugs()
    }
    @Get('txns/all')
    getAllDrugTxns(){
        return this.txnService.getTxns()
    }
    
    @Post('txns/confirm')
    confirmTxn(@Body() txnDetails:Transaction ){
        return this.txnService.confirmTxn(txnDetails)
    }
    @Post('txns/validate')
    validateTxn(@Body() txnDetails:any){
        return this.txnService.validateTxn(txnDetails)
    }
    @Get(':id/single')
    getDrugById(@Param('id') drugId:ObjectId){
        return this.drugService.getDrugById(drugId)
    }
    @Post('/add')
    addDrug(@Body() drugDto:createDrugDto){
        return this.drugService.addDrug(drugDto)
    }
    @Post(':id/update')
    updateDrug(@Param('id') drugId:ObjectId, @Body() drug:createDrugDto){
        return this.drugService.updateDrug(drugId, drug)
    }
    @Post(':id/remove')
    removeDrug(@Param('id') drugId:ObjectId){
        return this.drugService.removeDrug(drugId)
    }
    @Post('checkout')
    drugCheckoutandUpdate(@Body() txnData:createTxDto){
        return this.txnService.performCheckout(txnData)
    }

}
