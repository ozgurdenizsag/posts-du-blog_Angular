import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {BaseDeDonneeService} from "../../services/base-de-donnee.service";

@Component({
  selector: 'app-creer-tache',
  templateUrl: './creer-tache.component.html',
  styleUrls: ['./creer-tache.component.scss']
})
export class CreerTacheComponent implements OnInit {

  tacheForm: FormGroup;

  constructor(private formBuilder : FormBuilder,
              private database : BaseDeDonneeService,
              private router : Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.tacheForm = this.formBuilder.group({
      nom : ['',Validators.required],
      status : ['',Validators.required],
      importance : ['',Validators.required],
      categorie : ['',Validators.required],
      notes : this.formBuilder.array([])
    });
  }

  getNotes(){
    return this.tacheForm.get('notes') as FormArray;
  }

  onSubmitForm() {

    const formValue = this.tacheForm.value;
    const nom = formValue['nom'];
    const status = formValue['status'];
    const importance = formValue['importance'];
    const categorie = formValue['categorie'];
    const notes = formValue['notes'] ? formValue['notes'] : [];

    this.database.addTache(nom,status,importance,categorie,notes);
    this.router.navigate(['/vue-ensemble']);
  }

  onAddNote(){
    const newNoteControl = this.formBuilder.control('',Validators.required);
    this.getNotes().push(newNoteControl);
  }

  onDeleteNote(i: number) {
    this.getNotes().removeAt(i);
  }
}
