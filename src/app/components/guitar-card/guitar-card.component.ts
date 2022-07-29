import { Component, OnInit, Input } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Article } from '../../../models/article';



@Component({
  selector: 'app-guitar-card',
  templateUrl: './guitar-card.component.html',
  styleUrls: ['./guitar-card.component.scss']
})
export class GuitarCardComponent implements OnInit {
  @Input() public article: Article;
  public safeUrl: SafeResourceUrl;
  public videoMode: boolean;
  constructor(private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  switchMode() {
    if (!this.videoMode) {
      this.safeUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this.article.video);
    }
    this.videoMode = !this.videoMode;
  }


}
