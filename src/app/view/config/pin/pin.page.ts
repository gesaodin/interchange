import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PinService } from 'src/app/service/model/config/pin.service';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.page.html',
  styleUrls: ['./pin.page.scss'],
})
export class PinPage implements OnInit {

  num1 = "";
  num2 = "";
  num3 = "";
  num4 = "";
  numero = "";
  title = "Introduzca PIN de acceso"
  repetir = "";
  hiddeMe = false;

  constructor(private navCrtl: NavController,
     private router: Router, 
     private pinService: PinService, 
     private loadingController: LoadingController) { }

  ngOnInit() {
  }

  goBack(){
    this.navCrtl.navigateBack(['/config'])
  }

  onClickPressButton(num: string){
    if(this.num1 == ""){
      this.num1 = num;
    }else if(this.num2 == ""){
      this.num2 = num;
    }else if(this.num3 == ""){
      this.num3 = num;
    }else{
      this.num4 = num;
      if(this.numero == ""){
        this.numero = this.num1 +  this.num2 +  this.num3 +  this.num4;
        this.cleanInput();
        this.title = "Repetir PIN de acceso"
      }else{
        this.repetir = this.num1 +  this.num2 +  this.num3 +  this.num4;
        this.validatePin()
      }      
    }
  }
  private cleanInput(): void{
    this.num1 = ""
    this.num2 = ""
    this.num3 = ""
    this.num4 = ""
  }
  private validatePin(): boolean{
    if(this.numero == this.repetir){
      this.hiddeMe = true;      
      return true;
    }else{
      this.title = "Introduzca PIN de acceso"
      this.cleanInput()
      this.numero = ""
      this.repetir = ""
      return false;
    }
  }

  async onSave(){
    const loading = await this.loadingController.create({
      message: 'Guardando sun pin de seguridad'
    })
    await loading.present();
    await this.pinService.add({code:this.numero}).then(res => {
      this.goBack();
    });
    loading.dismiss();

  }
}
