import { createInjectableType } from '@angular/compiler';
import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../gallery/gallery.component';
import { FileUploadService } from '../../../services/file-upload.service';
import { FileUpload } from '../../../models/file-upload.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss']
})
export class UploadDialogComponent implements OnInit {
  fileUploads?: any[];

  @Input() fileUpload!: FileUpload;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private uploadService: FileUploadService, 
    public dialogRef: MatDialogRef<UploadDialogComponent>,

  ) { }

  ngOnInit(): void {

    this.uploadService.getFiles(6).snapshotChanges().pipe(
      map(changes =>
        // store the key
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
    });
  }

  deleteFileUpload(fileUpload: FileUpload): void {

    this.uploadService.deleteFile(fileUpload);
    this.dialogRef.close();
  }



}
