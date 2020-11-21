import {Component, OnDestroy, OnInit} from '@angular/core';
import {BaseDeDonneeService} from "../services/base-de-donnee.service";
import {History} from "../models/history.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit , OnDestroy{
  histories: History[];
  private historiesSubscription: Subscription;

  constructor(private database : BaseDeDonneeService) { }

  ngOnInit(){
    this.historiesSubscription = this.database.historiesSubject.subscribe(
      (histories : History[]) => {
        this.histories = histories;
      }
    );
    this.database.getTachesFromServer()
    this.database.emitTache();
    this.database.getHistoriesFromServer();
    this.database.emitHistories();
  }

  ngOnDestroy() {
    this.historiesSubscription.unsubscribe();
  }

}
