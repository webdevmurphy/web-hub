import { Component, OnInit } from '@angular/core';
import { Photo } from '../../../models/photo.model';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';
import {MatDialog} from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { UploadDialogComponent } from '../upload-dialog/upload-dialog.component';
import { FileUploadService } from '../../../services/file-upload.service';
import { FileUpload } from '../../../models/file-upload.model';

export interface DialogData {
  myFile: FileUpload;
  answer: string;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  fileUploads?: any[];

  constructor(
       public auth: AuthService,
       public dialog: MatDialog, 
       private uploadService: FileUploadService) { }
      
  user: User;

  myFile: File;

  selectedFiles?: FileList;
  
  private isLoggedIn: boolean = false;
  ngOnInit(){
    this.auth.user$.subscribe((user) => {
      this.user = user;
    if(user){
    this.uploadService.getFiles(999).snapshotChanges().pipe(
      map(changes => 
        // store the key  
        changes.map(c =>  ({ key: c.payload.key, ...c.payload.val() })).filter(e => e.uid == this.user.uid  && e.type =="image/jpeg" || e.type == "image/png" || e.type == "image/gif")
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







