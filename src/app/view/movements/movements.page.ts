import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { OperationService, Operation } from 'src/app/service/model/operation/operation.service';
@Component({
  selector: 'app-movements',
  templateUrl: './movements.page.html',
  styleUrls: ['./movements.page.scss'],
})
export class MovementsPage implements OnInit {

  slideOpts = {
    effect: 'flip'
  };
  tabs = 'pesos';
  chile: Operation[];
  saldo: number = 0.00;
  diferido: number = 0.00;

  constructor(private navCtrl: NavController,
    private operationService: OperationService) { 

      this.operationService.getAll().subscribe( res => {
        this.chile = res
        this.saldo = 0.00;
        let trasnferencia = 0;
        let saldo = 0;
        let pendiente = 0;
        this.chile.forEach(oper => {
          var money = oper.money
          if(oper.form == 'TRA') {
            money = oper.money * -1;                       
          }
       
          if(oper.status){
            this.saldo += money;
          }else if(oper.form == 'TRA'){            
            this.saldo += money
            this.diferido -= money;          
          }else{
            this.diferido += money; 
          }

        });

      })

    }

  ngOnInit() {

  }

  goMore(){
    this.navCtrl.navigateForward(['config']);    
  }
  goTransferens(){
    this.navCtrl.navigateForward(['/home/operation/transferens', 'null','null']);
  }
  clickSelect(id: string){
    this.tabs = id;
  }

  segmentChanged(ev: Event){

  }

}
