import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../../../services/file-upload.service';
import { map } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import { User } from 'firebase/auth';


@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.css']
})
export class UploadListComponent implements OnInit {
  fileUploads?: any[];
  user: User;
  constructor(private uploadService: FileUploadService, private auth: AuthService) { }


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
