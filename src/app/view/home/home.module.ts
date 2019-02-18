import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { ShippingPageModule } from '../shipping/shipping.module';
import { MovementsPageModule } from '../movements/movements.module';
import { HomePageRoutingModule } from './home.router.module';

import { BalancePageModule } from '../balance/balance.module';
import { OperationPageModule } from '../operation/operation.module';
import { TransferensPageModule } from '../operation/transferens/transferens.module';
import { DepositPageModule } from '../operation/deposit/deposit.module';
import { ProfilePageModule } from '../config/profile/profile.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    BalancePageModule,
    OperationPageModule,
    ShippingPageModule,
    MovementsPageModule,
    DepositPageModule,
    TransferensPageModule,
    ProfilePageModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {

  constructor(){
   
  }
}