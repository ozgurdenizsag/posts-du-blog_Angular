import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BaseDeDonneeService} from "../../services/base-de-donnee.service";
import {interval, Subscription} from "rxjs";
import {Tache} from "../../models/tache.model";

@Component({
  selector: 'app-single-categorie',
  templateUrl: './single-categorie.component.html',
  styleUrls: ['./single-categorie.component.scss']
})
export class SingleCategorieComponent implements OnInit , OnDestroy{

  @Input() categorie : string;

  private counterSubscribtion : Subscription;
  public taches : Tache[];
  time : number;
  timeString : string;

  constructor(private database : BaseDeDonneeService) { }

  ngOnInit(){
    this.database.getTachesFromServer();
    this.database.emitTache();
    this.taches = this.database.getTachesByCategorie(this.categorie);
    this.sommeDurees();
    this.timeString = this.conversion_seconde_heure(this.time);
    const counter = interval(500);
    this.counterSubscribtion = counter.subscribe(
      () => {
        this.taches = this.database.getTachesByCategorie(this.categorie);
        this.sommeDurees();
        this.timeString = this.conversion_seconde_heure(this.time);
      }
    );
  }

  ngOnDestroy() {
    this.counterSubscribtion.unsubscribe();
  }

  conversion_seconde_heure(time) {
    var reste=time;
    var result='';

    var nbJours=Math.floor(reste/(3600*24));
    reste -= nbJours*24*3600;

    var nbHours=Math.floor(reste/3600);
    reste -= nbHours*3600;

    var nbMinutes=Math.floor(reste/60);
    reste -= nbMinutes*60;

    var nbSeconds=reste;

    if (nbJours>0)
      result=result+nbJours+'j ';

    if (nbHours>0)
      result=result+nbHours+'h ';

    if (nbMinutes>0)
      result=result+nbMinutes+'min ';

    if (nbSeconds>0)
      result=result+nbSeconds+'s ';

    return result;
  }

  sommeDurees(){
    this.time = 0;
    var active;
    this.taches.forEach(
      tache => {
        if(tache.status === 'on') {
          active = (new Date(tache.date_active)).valueOf()
          this.time += tache.duree + Math.round((Date.now().valueOf() - active) / 1000);
        }else{
          this.time += tache.duree;
        }
      });
  }



}
