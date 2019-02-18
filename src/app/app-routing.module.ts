import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from './service/security/auth-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './view/login/login.module#LoginPageModule' },
  { 
    path: '',
    loadChildren: './view/home/home.module#HomePageModule' ,
    canActivate : [AuthGuardGuard]
  },
  { 
    path: 'config',
    loadChildren: './view/config/config.module#ConfigPageModule',
    canActivate : [AuthGuardGuard]
  },  
  { path: 'config/profile', loadChildren: './view/config/profile/profile.module#ProfilePageModule' },
  { path: 'config/ubication', loadChildren: './view/config/ubication/ubication.module#UbicationPageModule' },
  { path: 'config/money', loadChildren: './view/config/money/money.module#MoneyPageModule' },
  { path: 'config/certification', loadChildren: './view/config/certification/certification.module#CertificationPageModule' },
  { path: 'config/list', loadChildren: './view/config/list/list.module#ListPageModule' },
  { path: 'config/list/contact/:id', loadChildren: './view/config/list/contact/contact.module#ContactPageModule' },
  { path: 'config/pin', loadChildren: './view/config/pin/pin.module#PinPageModule' },
  { path: 'config/bank', loadChildren: './view/config/bank/bank.module#BankPageModule' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  constructor(){
  }

}
