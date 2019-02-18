import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children : [
      {
        path : 'balance',
        children: [{path: '',loadChildren: '../balance/balance.module#BalancePageModule'}]
      },
      {
        path : 'operation',
        children: [{path: '', loadChildren: '../operation/operation.module#OperationPageModule'}]
      },
      {
        path: 'operation/deposit',
        children : [{path: '',loadChildren: '../operation/deposit/deposit.module#DepositPageModule'}]
      },
      {
        path: 'operation/transferens/:id/:titular',
        children : [{path: '',loadChildren: '../operation/transferens/transferens.module#TransferensPageModule'}]
      },
      { 
        path: 'operation/request',
        children: [{path: '', loadChildren: '../operation/request/request.module#RequestPageModule' }]
      },
      { 
        path: 'operation/fly',
        children: [{path: '', loadChildren: '../operation/fly/fly.module#FlyPageModule' }]
      },
      { 
        path: 'operation/dolar',
        children: [{path: '', loadChildren: '../operation/dolar/dolar.module#DolarPageModule' }]
      },
      {
        path : 'message',
        children: [{path: '',loadChildren: '../shipping/shipping.module#ShippingPageModule'}]
      },
      {
        path : 'movements',
        children: [{path: '',loadChildren: '../movements/movements.module#MovementsPageModule'}]
      }
    ]
  },
  {
    path: '',
    redirectTo : 'home',
    pathMatch : 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}