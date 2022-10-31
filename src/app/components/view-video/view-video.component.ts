import { Component, OnInit } from '@angular/core';
import { Photo } from '../../../models/photo.model';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FileUploadService } from 'src/services/file-upload.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UploadDialogComponent } from '../upload-dialog/upload-dialog.component';
@Component({
  selector: 'app-view-video',
  templateUrl: './view-video.component.html',
  styleUrls: ['./view-video.component.scss']
})
export class ViewVideoComponent implements OnInit {
  public images: Photo[];
  user: User;
  private isLoggedIn: boolean = false;
  fileId;
  fileUploads?: any[];
  constructor(
    public auth: AuthService, 
    private afs: AngularFirestore,
    private db: AngularFireStorage,
    public dialog: MatDialog, 
    private uploadService: FileUploadService
    ) { }

  ngOnInit(): void {

    this.auth.user$.subscribe((user) => {
      this.user = user;
    if(user){
    this.uploadService.getFiles(999).snapshotChanges().pipe(
      map(changes => 
        // store the key  
        changes.map(c =>  ({ key: c.payload.key, ...c.payload.val() })).filter(e => e.uid == this.user.uid &&  e.type == "video/mp4" )
      )   
        ).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
    });
  }})











   
  }

  openDialog(fileUpload: HTMLInputElement): void {
    console.log(fileUpload);
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      panelClass: 'custom-modalbox',
      data: {myFile: fileUpload},
    });
    dialogRef.afterClosed().subscribe(result => {
    result = fileUpload;
    console.log("File name is: " + fileUpload.name);
      console.log(`Dialog result: ${result}`);    
    })
  } 


}
