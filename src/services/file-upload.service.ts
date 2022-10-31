import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, snapshotChanges } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../models/file-upload.model';
import { User } from '../models/user';
import { AuthService } from './auth.service';
import { query } from 'firebase/firestore';



@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private basePath = '/uploads';
  user: User;
  private isLoggedIn: boolean = false;
  fileId;
  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage, private db1: AngularFirestore, private auth: AuthService) { }

  pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    this.auth.user$.subscribe((user) => {
      this.user = user;
      /* user.uid => user id */
     // this.userID = this.user.isDungeonMaster;
    })
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          fileUpload.uid = this.user.uid;
          fileUpload.type = fileUpload.file.type;
          this.saveFileData(fileUpload);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }



  private saveFileData(fileUpload: FileUpload): void {
    
    if(fileUpload.file.type == "image/jpeg" || fileUpload.file.type == "image/png" || fileUpload.file.type == "image/gif"){
      console.log("Image is type: " + fileUpload.file.type);
      this.db.list(this.basePath).push(fileUpload).then(snapshot => {

        let uploadData = {
          downloadUrl: fileUpload.url,
          path: fileUpload.name,
          isProfilePic: "none",
          src: fileUpload.url,
          thumb: fileUpload.url,
          key: snapshot.key,
          user: fileUpload.uid,
          alt: "Alternate image text"
        }
        this.db1.collection("photos").add(uploadData);
      })
    }if(fileUpload.file.type == "video/mp4"){
      console.log("VIDEO");
      this.db.list(this.basePath).push(fileUpload).then(snapshot => {

        let uploadData = {
          downloadUrl: fileUpload.url,
          path: fileUpload.name,
          isProfilePic: "none",
          src: fileUpload.url,
          thumb: fileUpload.url,
          key: snapshot.key,
          videoUrl: fileUpload.url,
          user: fileUpload.uid,
          alt: "Alternate image text"
        }
        this.db1.collection("video").add(uploadData);
      })
    } 
  }

  getFiles(numberItems: number): AngularFireList<FileUpload> {  
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }

  deleteFile(fileUpload: FileUpload): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
        this.deleteCollection(fileUpload.key);

      })
      .catch(error => console.log(error));
  }

  deleteCollection(key:string){
    this.auth.user$.subscribe(user => this.user = user);
    this.auth.user$.subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
        console.log(key);
        const docRef = this.db1.collection('photos', ref => ref.where("key", "==", key));  
        docRef.snapshotChanges().forEach((changes) => {
          changes.map((a) => {
            this.fileId = a.payload.doc.id;
            console.log(a.payload.doc.id);
            this.db1.collection('photos').doc(this.fileId).delete();  
          })
        })
      } }) 
    }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
}
