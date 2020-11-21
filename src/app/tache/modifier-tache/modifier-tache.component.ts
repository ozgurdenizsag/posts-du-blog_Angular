import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BaseDeDonneeService} from "../../services/base-de-donnee.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Tache} from "../../models/tache.model";

@Component({
  selector: 'app-modifier-tache',
  templateUrl: './modifier-tache.component.html',
  styleUrls: ['./modifier-tache.component.scss']
})
export class ModifierTacheComponent implements OnInit {

  tacheForm: FormGroup;
  tache : Tache;

  constructor(private formBuilder : FormBuilder,
              private database : BaseDeDonneeService,
              private router : Router,
              private route : ActivatedRoute) { }

  ngOnInit(){
    this.database.getTachesFromServer();
    this.database.emitTache();
    const id = this.route.snapshot.params['id'];
    this.tache = this.database.getTacheById(parseInt(id));
    this.initForm();
  }

  initForm(){
    this.tacheForm = this.formBuilder.group({
      nom : [ this.tache.nom ,Validators.required],
      importance : [ this.tache.importance ,Validators.required],
      categorie : [ this.tache.categorie ,Validators.required],
      notes : this.formBuilder.array(this.tache.notes ? this.tache.notes : [])
    });
  }

  getNotes(){
    return this.tacheForm.get('notes') as FormArray;
  }

  onSubmitForm() {
    const formValue = this.tacheForm.value;
    const nom = formValue['nom'];
    const importance = formValue['importance'];
    const categorie = formValue['categorie'];
    const notes = formValue['notes'] ? formValue['notes'] : [];

    this.tache.nom = nom;
    this.tache.importance = importance;
    this.tache.categorie = categorie;
    if(notes) {
      this.tache.notes = notes;
    }
    this.database.saveTachesToServer();
    this.database.emitTache();
    this.router.navigate(['/vue-ensemble']);
  }

  onAddNote(){
    const newNoteControl = this.formBuilder.control('',Validators.required);
    this.getNotes().push(newNoteControl);
  }

  onDeleteNote(index : number){
    this.getNotes().removeAt(index);
  }

}
