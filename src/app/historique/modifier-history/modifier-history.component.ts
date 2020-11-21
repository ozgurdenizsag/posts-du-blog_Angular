import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BaseDeDonneeService} from "../../services/base-de-donnee.service";
import {ActivatedRoute, Router} from "@angular/router";
import {History} from "../../models/history.model";

@Component({
  selector: 'app-modifier-history',
  templateUrl: './modifier-history.component.html',
  styleUrls: ['./modifier-history.component.scss']
})
export class ModifierHistoryComponent implements OnInit {
  historyForm: FormGroup;
  history : History;
  private id: string;

  constructor(private formBuilder : FormBuilder,
              private database : BaseDeDonneeService,
              private router : Router,
              private route : ActivatedRoute) {}

  ngOnInit(){
    this.database.getHistoriesFromServer();
    this.database.emitTache();
    this.id = this.route.snapshot.params['id'];
    this.history = this.database.getHistoryById(parseInt(this.id));
    this.initForm();
  }

  private initForm() {
    this.historyForm = this.formBuilder.group({
      debut : [ this.initializeValue(this.history.debut) ,Validators.required],
      fin : [ this.initializeValue(this.history.fin) ,Validators.required]
    });
  }

  onSubmitForm() {
    const formValue = this.historyForm.value;
    const debut = formValue['debut'];
    const fin = formValue['fin'];
    this.database.modifierHistory(parseInt(this.id),debut,fin);
    this.router.navigate(['/historique']);
  }

  initializeValue(time){
    if(time===''){
      return '';
    }
    const date = new Date(time);
    let result = '';
    result += date.getFullYear() + '-';
    if(date.getMonth()<9) {
      result += '0';
    }
    result += date.getMonth()+1 + '-';
    if(date.getUTCDate()<=9) {
      result += '0';
    }
    result += date.getUTCDate() +'T';
    if(date.getHours()<=9) {
      result += '0';
    }
    result += date.getHours() + ':';
    if(date.getMinutes()<=9) {
      result += '0';
    }
    result += date.getMinutes();
    return result;
  }

}
