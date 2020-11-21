import {Component, Input, OnInit} from '@angular/core';
import {BaseDeDonneeService} from "../../services/base-de-donnee.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-single-histoire',
  templateUrl: './single-histoire.component.html',
  styleUrls: ['./single-histoire.component.scss']
})
export class SingleHistoireComponent implements OnInit {

  @Input() id : number;
  @Input() idTache : number;
  @Input() debut : string;
  @Input() fin : string;

  public debutString : string;
  public finString : string;
  public nomTache : string;


  constructor(private database : BaseDeDonneeService,
              private router : Router) { }

  ngOnInit(){
    this.debutString = this.conversion_seconde_date(this.debut);
    this.finString = this.conversion_seconde_date(this.fin);
    const tache = this.database.getTacheById(this.idTache);
    this.nomTache = '';
    if(tache) {
      this.nomTache = tache.nom;
    }
  }

  conversion_seconde_date(time) {
    const event = new Date(time);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return event.toLocaleDateString('fr-FR', options) + " " + event.toLocaleTimeString('fr-FR')
  }

  onDeleteHistorie() {
    this.database.deleteHistoryById(this.id);
  }

  onModifierHistorie() {
    this.router.navigate(['/modifier-history/'+ this.id]);
  }
}
