import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Photo } from '../../models/photo.model';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { AngularFireDatabase } from '@angular/fire/compat/database';




@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private auth: AuthService, private afs: AngularFirestore,private storage: AngularFireStorage, private db1: AngularFireDatabase, ) { }
  user: User;
  private isLoggedIn: boolean = false;
  fileId;

  private basePath = '/uploads';

  removeUpload(image:string){

    this.auth.user$.subscribe(user => this.user = user);
    this.auth.user$.subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
        console.log(image);
        this.db1.list(this.basePath).remove(image);
        const docRef = this.afs.collection('photos', ref => ref.where("key", "==", image));
        const storageRef = this.storage.ref('uploads/' + image);
        docRef.snapshotChanges().forEach((changes) => {
          changes.map((a) => {
            this.fileId = a.payload.doc.id;
            console.log(a.payload.doc.id);
            this.afs.collection('photos').doc(this.fileId).delete();
            storageRef.child(image).delete();
          })
        })
      } })
      
    }
}
