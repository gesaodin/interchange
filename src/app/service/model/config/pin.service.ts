import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase'
import { Observable } from 'rxjs';


export interface Pin{
  code: string
}

@Injectable({
  providedIn: 'root'
})
export class PinService {


  currentUser = firebase.auth().currentUser.uid;
  constructor(private afs: AngularFirestore) { }


 

  getID(): Observable<Pin>{
    const doc : AngularFirestoreDocument<Pin > = this.afs.collection('client').doc(this.currentUser).collection('user').doc<Pin>('pin');
    return doc.valueChanges();   
  }

  add(pin: Pin): Promise<void>{
    return new Promise<any>((resolve, reject) => {      
      this.afs.collection('client').doc(this.currentUser).collection('user').doc('pin').set(pin)
      .then(  
        res => resolve(res),
        err => reject(err)
      )
    })    
  }
}
