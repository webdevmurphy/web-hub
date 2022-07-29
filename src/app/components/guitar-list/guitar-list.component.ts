import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../../models/article';

@Component({
  selector: 'app-guitar-list',
  templateUrl: './guitar-list.component.html',
  styleUrls: ['./guitar-list.component.scss']
})
export class GuitarListComponent implements OnInit {
  @Input() public articles: Article[];
  constructor() { }

  ngOnInit(): void {
  }

}
