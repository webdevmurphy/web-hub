import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../gallery/gallery.component';
import { FileUploadService } from '../../../services/file-upload.service';
import { FileUpload } from '../../../models/file-upload.model';
import { map } from 'rxjs/operators';








@Component({
  selector: 'app-lg-image-view',
  templateUrl: './lg-image-view.component.html',
  styleUrls: ['./lg-image-view.component.scss']
})
export class LgImageViewComponent implements OnInit {

  fileUploads?: any[];

  @Input() fileUpload!: FileUpload;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private uploadService: FileUploadService, 
    public dialogRef: MatDialogRef<LgImageViewComponent>,



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

}
