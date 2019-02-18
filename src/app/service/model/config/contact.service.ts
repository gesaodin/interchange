import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

export interface Contact{
  titular?: string
  dni?: string
  reside?: string
  phone?: string
  email?: string
  banco?: string
  type?: string
  number?: string
  created: Date
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  currentUser = firebase.auth().currentUser.uid;
  contacts: AngularFirestoreCollection<Contact>;

  constructor(private afs: AngularFirestore) { }

  getID(id : string): Observable<Contact>{
    const doc : AngularFirestoreDocument<Contact> = this.afs.collection('client')
    .doc(this.currentUser).collection('contacts').doc(id)
    return doc.valueChanges();   
  }

  add(contact: Contact): Promise<void>{
    return new Promise<any>((resolve, reject) => {      
      this.afs.collection('client').doc(this.currentUser).collection('contacts').add(contact)
      .then(  
        res => resolve(res),
        err => reject(err)
      )
    })        
  }
  update(uid:string, contact: Contact): Promise<void>{
    return new Promise<any>((resolve, reject) => {      
      this.afs.collection('client').doc(this.currentUser).collection('contacts').doc(uid).set(contact)
      .then(  
        res => resolve(res),
        err => reject(err)
      )
    })  
  }
  delete(id: string): Promise<void>{
    return new Promise<any>((resolve, reject) => {      
      this.afs.collection('client').doc(this.currentUser).collection('contacts').doc(id).delete()
      .then(  
        res => resolve(res),
        err => reject(err)
      )
    })      
  }


}
