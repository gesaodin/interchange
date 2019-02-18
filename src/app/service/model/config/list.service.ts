import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

//Contactos o afiliados
export interface Contact{
  id : string
  titular: string
  dni: string
  reside: string
  phone: string
  email: string
  banco: string
  type: string
  number: string
  created: any
}


@Injectable({
  providedIn: 'root'
})
export class ListService {

  currentUser = firebase.auth().currentUser.uid;
  constructor(private afs: AngularFirestore) {


   }


  getAll(): Observable<Contact[]>{
    const contact : AngularFirestoreCollection<Contact> = this.afs.collection('client')
    .doc(this.currentUser).collection<Contact>('contacts');
    return contact.snapshotChanges().pipe(
      map( actions => {
        return actions.map( a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data}
        })
      })
    )
  }

  


}
