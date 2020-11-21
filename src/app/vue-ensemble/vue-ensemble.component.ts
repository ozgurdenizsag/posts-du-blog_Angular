import { Component, OnInit , OnDestroy} from '@angular/core';
import {BaseDeDonneeService} from "../services/base-de-donnee.service";
import { Subscription , interval } from "rxjs";


@Component({
  selector: 'app-vue-ensemble',
  templateUrl: './vue-ensemble.component.html',
  styleUrls: ['./vue-ensemble.component.scss']
})
export class VueEnsembleComponent implements OnInit , OnDestroy{

  public categories : string[];
  private counterSubscribtion : Subscription;
  constructor(private database : BaseDeDonneeService) { }

  ngOnInit() {
    this.database.getTachesFromServer();
    this.database.getHistoriesFromServer();
    this.database.emitTache();
    let counter = interval(1000);
    this.counterSubscribtion = counter.subscribe(
      () => {
        this.categories = this.database.getCategories();
      }
    );
  }

  onQuickStart() {
    this.database.addTache('nom','on','leger','Sans Categorie',[]);
  }

  ngOnDestroy() {
    this.counterSubscribtion.unsubscribe();
  }

}
