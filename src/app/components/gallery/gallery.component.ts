import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Photo } from '../../../models/photo.model';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';
import {MatDialog} from '@angular/material/dialog';
import { getStorage, ref, listAll } from 'firebase/storage';

import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/compat/database';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  
  public images: Photo[];

  constructor(private auth: AuthService, private afs: AngularFirestore, private db1: AngularFireDatabase, private db: AngularFireStorage,public dialog: MatDialog) { }
  user: User;
  private isLoggedIn: boolean = false;

  downloadUrl;
  selectedFile:string[];
  userID;
  
  fileId;

  removePhoto;
 
 

  ngOnInit(){
    
    this.auth.user$.subscribe(user => this.user = user);
    this.auth.user$.subscribe(user => {
      if (user) {
        this.isLoggedIn = true;


        
        this.afs.collection('photos', ref => ref.where('user.uid', '==', user.uid))
        .valueChanges({ idField: 'fileId' }).pipe(
          map(res => res.map( imgResult => new Photo(imgResult) ))
        ).subscribe(res => this.images = res)



      







      } else {
        this.isLoggedIn = false;

        this.afs.collection('photos')
        .valueChanges().pipe(
          map(res => res.map( imgResult => new Photo(imgResult) ))
        ).subscribe(res => this.images = res);
      }
    });
    this.selectedFile = new Array<string>();
  }



removeUpload(image:string){
  this.auth.user$.subscribe(user => this.user = user);
  this.auth.user$.subscribe(user => {
    if (user) {

      this.isLoggedIn = true;
      console.log(image);
      const docRef = this.afs.collection('photos', ref => ref.where("path", "==", image));
      const storageRef = this.db.ref('photos/' + image);
      docRef.snapshotChanges().forEach((changes) => {
        changes.map((a) => {
          this.fileId = a.payload.doc.id;
          console.log(a.payload.doc.id);
          this.afs.collection('photos').doc(this.fileId).delete();
          storageRef.delete();
        })
      })
    } }).unsubscribe;
    
  }

  openDialog() {
    const dialogRef = this.dialog.open(GalleryComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });



  }


  selectPhoto(downloadUrl){
    this.userID = this.user.uid;
    console.log("hello" + this.userID + " " + downloadUrl);
   
    console.log("success!");
     this.auth.user$.subscribe(user => this.user = user);
    this.auth.user$.subscribe(user => { 
      if (user) {
     console.log("success!");
     this.afs.collection('profile-pic').doc(this.user.uid).set({ "isProfilePic": downloadUrl, "uid": this.user.uid });
      }
    })
    }





  
}

