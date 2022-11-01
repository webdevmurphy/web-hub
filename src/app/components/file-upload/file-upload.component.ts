import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, createUploadTask} from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ObjectUnsubscribedError, Observable } from 'rxjs';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';

import { AngularFireUploadTask } from '@angular/fire/compat/storage';
import { finalize, tap, switchMap } from 'rxjs/operators';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { snapshotChanges } from '@angular/fire/compat/database';
import { compileClassMetadata } from '@angular/compiler';
import { Firestore } from 'firebase/firestore';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  percentage: Observable<number>;  
  isProfilePic;
  
  fileName: string;
  user: User;
  downloadUrl: string;
  private isLoggedIn: boolean = false;


  constructor(public auth: AuthService,
    private storage: AngularFireStorage,
    private db: AngularFirestore) { }

  ngOnInit(): void {
   
    
  }


  onFileSelected(event: any) :void {

    const file: File = event.target.files[0];
   

    console.log(file.type);

    if(file.type == 'image/jpeg' || file.type == 'image/png' || file.type =='image/gif'){
      const storage = getStorage();
      const storageRef = ref(storage, 'photos/' + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
    
          // ...
    
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, 
      () => {
        // Upload completed successfully, now we can get the download URL
      
       getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
         
          
          this.auth.user$.subscribe(user => {
           
            
            let uploadData = {
              downloadUrl,
              path: file.name,
              isProfilePic: "none",
              src: downloadUrl,
              thumb: downloadUrl,
              user,
              alt: "Alternate image text"
            }
        
            this.db.collection(`photos`).add( uploadData );
           
            console.log('File available at', downloadUrl);
            
            })
  
        });
      }
    );
  


    }
  else if(file.type == 'video/mp4'){
      console.log("youtube Famous");
      const storage = getStorage();
      const storageRef = ref(storage, 'video/' + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
    
          // ...
    
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, 
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          console.log('File available at', downloadUrl);
  
          this.auth.user$.subscribe(user => {
           
            let uploadData = {
              downloadUrl,
              path: file.name,
              isProfilePic: "none",
              src: downloadUrl,
              thumb: downloadUrl,
              dataUrl:downloadUrl,
              videoUrl: downloadUrl,
              user,
              alt: "Alternate image text"
            }
            this.db.collection(`video`).add( uploadData );
            console.log("success!");
            })
  
  
  
        });
      }
    );


    }
    
    else{
     

      const storage = getStorage();
      const storageRef = ref(storage, 'data/' + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed',

      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
    
          // ...
    
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, 
      () => {
        // Upload completed successfully, now we can get the download URL
       getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          console.log('File available at', downloadUrl);
  
          this.auth.user$.subscribe(user => {
           
            let uploadData = {
              downloadUrl,
              path: file.name,
              isProfilePic: "none",
              src: downloadUrl,
              thumb: downloadUrl,
              dataUrl:downloadUrl,
              user,
              alt: "Alternate image text"
            }
            this.db.collection(`data`).add( uploadData );
            console.log("success!");
            
            })
  
  
  
        });
      }
    );
    }
  }
}