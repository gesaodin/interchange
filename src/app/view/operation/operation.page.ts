import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.page.html',
  styleUrls: ['./operation.page.scss'],
})
export class OperationPage implements OnInit {

  constructor(private router : Router, private navCtrl : NavController) { }

  goBack(){
    this.router.navigateByUrl('/home/balance');
  }
  goDeposit(){
    this.navCtrl.navigateForward(['home', 'operation', 'deposit']);
    
  }
  goTransferens(){
    this.navCtrl.navigateForward(['/home/operation/transferens', 'null','null']);
  }
  goSettings(){
    this.navCtrl.navigateForward(['config']);    
  }
  goRequest(){
    this.navCtrl.navigateForward(['/home/operation/request']);
  }
  goFly(){
    this.navCtrl.navigateForward(['/home/operation/fly']);
  }
  goDolar(){
    this.navCtrl.navigateForward(['/home/operation/dolar']);
  }
  ngOnInit() {
  }

}
