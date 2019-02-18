import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

export interface Bank{
  code?: string
  name?: string
  type?: string
  number?: string
  money?: string
  titular?: string
}
@Injectable({
  providedIn: 'root'
})
export class BankService {

  currentUser = firebase.auth().currentUser.uid;
  constructor(private afs: AngularFirestore) { }


 

  getID(): Observable<Bank>{
    const doc : AngularFirestoreDocument<Bank > = this.afs.collection('client').doc(this.currentUser).collection('user').doc<Bank>('bank');
    return doc.valueChanges();   
  }

  add(bank: Bank): Promise<void>{
    return new Promise<any>((resolve, reject) => {      
      this.afs.collection('client').doc(this.currentUser).collection('user').doc('bank').set(bank)
      .then(  
        res => resolve(res),
        err => reject(err)
      )
    })    
  }
}
