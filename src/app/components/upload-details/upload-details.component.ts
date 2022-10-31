import { Component, OnInit, Input } from '@angular/core';
import { FileUploadService } from '../../../services/file-upload.service';
import { FileUpload } from '../../../models/file-upload.model';
import { Photo } from '../../../models/photo.model';

@Component({
  selector: 'app-upload-details',
  templateUrl: './upload-details.component.html',
  styleUrls: ['./upload-details.component.css']
})
export class UploadDetailsComponent implements OnInit {
  @Input() fileUpload!: FileUpload;

  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  deleteFileUpload(fileUpload: FileUpload): void {
   
    this.uploadService.deleteFile(fileUpload);
  }
}
