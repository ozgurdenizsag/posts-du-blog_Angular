import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BaseDeDonneeService} from "../../services/base-de-donnee.service";
import {Router} from "@angular/router";
import {interval, Subscription} from "rxjs";

@Component({
  selector: 'app-single-tache',
  templateUrl: './single-tache.component.html',
  styleUrls: ['./single-tache.component.scss']
})
export class SingleTacheComponent implements OnInit , OnDestroy{

  @Input() id : number;
  @Input() nom : string;
  @Input() duree : number;
  @Input() date_active : string;
  @Input() notes : string [];
  @Input() status : string;
  @Input() importance : string;
  @Input() categorie : string;
  time: number;
  timeString : string;
  private counterSubscribtion: Subscription;

  constructor(private database : BaseDeDonneeService,
              private router : Router,
              private datebase : BaseDeDonneeService) { }

  ngOnInit() {
    this.time = this.duree;
    if(this.status === 'on') {
      const date = new Date(this.date_active);
      this.time += Math.round((Date.now().valueOf() - date.valueOf()) / 1000);
    }
    this.timeString=this.conversion_seconde_heure(this.time);
    let counter = interval(1000);
    this.counterSubscribtion = counter.subscribe(
      () => {
        if(this.status === 'on') {
          this.time += 1;
          this.timeString=this.conversion_seconde_heure(this.time);
        }
      }
    );
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

  onOnClick() {
    this.database.switchOnOne(this.id);
    this.database.addHistory(this.id);
  }

  onOffClick() {
    this.database.switchOffOne(this.id);
    this.database.switchOffOneHistory(this.id);
  }

  onDeleteClick() {
    this.database.deleteTache(this.id);
    if(this.status === 'on'){
      this.database.switchOffOneHistory(this.id);
    }
  }

  onDetailsClick() {
    this.router.navigate(['/modifier/'+ this.id]);
  }

  ngOnDestroy() {
    this.counterSubscribtion.unsubscribe();
  }


}
