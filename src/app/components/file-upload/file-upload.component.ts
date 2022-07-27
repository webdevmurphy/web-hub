import { Component, OnInit } from '@angular/core';
import { AngularFireStorage} from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';
import { __values } from 'tslib';

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  percentage: Observable<number>;
  isHovering: boolean;
  isProfilePic;
  files: File[] = [];
  fileName: string;
  user: User;
  private isLoggedIn: boolean = false;
  constructor(public auth: AuthService,
    private storage: AngularFireStorage,
    private db: AngularFirestore) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => this.user = user);
  }

  onFileSelected(event: any){
    const storage = getStorage();

    const metadata = {
      contentType: 'image/jpeg'
    };

    const file: File = event.target.files[0];
  
   
    const storageRef = ref(storage, 'photos/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    console.log("Hi, I'm mr: " + storageRef);
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
            user,
            alt: "Alternate image text"
          }
          this.db.collection(`photos`).add( uploadData );
          console.log("success!");
          })



      });
    }
  );
}
}