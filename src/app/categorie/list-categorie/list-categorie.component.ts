import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrls: ['./list-categorie.component.scss']
})
export class ListCategorieComponent implements OnInit {

  @Input() categories : string[];

  constructor() { }

  ngOnInit(): void {
  }

}
