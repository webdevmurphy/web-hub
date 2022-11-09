import { Component, OnInit } from '@angular/core';
import { Photo } from '../../../models/photo.model';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Component({
  selector: 'app-view-files',
  templateUrl: './view-files.component.html',
  styleUrls: ['./view-files.component.scss']
})
export class ViewFilesComponent implements OnInit {
  public images: Photo[];
  user: User;
  private isLoggedIn: boolean = false;
  fileId;
  constructor(public auth: AuthService, private afs: AngularFirestore,private db: AngularFireStorage) { }
  
  


  ngOnInit(): void {
    this.auth.user$.subscribe(user => this.user = user);
    this.auth.user$.subscribe(user => {
      if (user) {
        this.isLoggedIn = true;

        

        
        this.afs.collection('data', ref => ref.where('user.uid', '==', user.uid))
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
   
  }




  

removeUpload(image:string){
  this.auth.user$.subscribe(user => this.user = user);
  this.auth.user$.subscribe(user => {
    if (user) {

      this.isLoggedIn = true;
      console.log(image);
      const docRef = this.afs.collection('data', ref => ref.where("path", "==", image));
      const storageRef = this.db.ref('data/' + image);
      docRef.snapshotChanges().forEach((changes) => {
        changes.map((a) => {
          this.fileId = a.payload.doc.id;
          console.log(a.payload.doc.id);
          this.afs.collection('data').doc(this.fileId).delete();
          storageRef.delete();
        })
      })
    } })
    
  }

}
