import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { ContactService, Contact } from 'src/app/service/model/config/contact.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  banks: any = [];
  contact: Contact = {
    titular: '',
    dni: '',
    reside: '',
    phone: '',
    email: '',
    banco: '',
    type: '',
    number: '',
    created: new Date()
  };
  contactID: null;
  constructor(private navCtrl: NavController, 
    private contacService: ContactService, 
    private activeRouter: ActivatedRoute,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router) {        
    this.banks = [
      {'desc': 'Banesco', 'code': '0134'},
      {'desc': 'Bod', 'code': '0102'},
      {'desc': 'Mercantil', 'code': '0105'},
      {'desc': 'Provincial', 'code': '0108'},
      {'desc': 'Venezuela', 'code': '0102'}
    ];
    
   }

  ngOnInit() {
    this.contactID = this.activeRouter.snapshot.params['id'];
    if(this.contactID){
      this.contacService.getID(this.contactID).subscribe( (res ) => {
          if(res != undefined){
            this.contact = res;
          }else{
            this.contact = {
              titular: '',
              dni: '',
              reside: '',
              phone: '',
              email: '',
              banco: '',
              type: '',
              number: '',
              created: new Date()
            };
          }          
      })
    }
  }

  goBack(){
    this.navCtrl.navigateBack(['config', 'list'])
  }

  async addData(){
    const loading = await this.loadingController.create({
      message : 'Enviando información..'
    });
    await loading.present();
    console.log(this.contact);

    await this.contacService.add(this.contact);
    loading.dismiss();
    this.goBack()
  }

  async updateData(){
    const loading = await this.loadingController.create({
      message : 'Actualizando información..'
    });
    await loading.present();
    console.log(this.contact);

    await this.contacService.update(this.contactID, this.contact);
    loading.dismiss();
    this.goBack()
  }


  
  async removeItem(){
    const alert = await this.alertController.create({
     header: 'Borrar',
     message: '¿Seguro que desa eliminar el registro?',
     buttons: [ 
       {
         text: 'Cancelar',
         role: 'cancel',
         handler: data => {
           console.log('Cancel clicked');
         }
       },
       {
         text: 'Borrar',
         handler: data => {          
             this.deleteItem( this.contactID );          
         }
       }
     ]
    })
    await alert.present()
   }

   async deleteItem(id: string){
     const loading = await this.loadingController.create({
       message : 'Eliminando información..'
     });
     await loading.present(); 
     await this.contacService.delete(id);
     loading.dismiss(); 
     this.goBack()
   }

   goTransferens(){
    // let navigationExtras: NavigationExtras = {
    //     queryParams: { 
    //       id : this.contactID,
    //       dni: this.contact.dni,
    //       titular: this.contact.titular
    //     } 
    // };
    this.router.navigate(['/home/operation/transferens', this.contactID, this.contact.titular])
  }
}
