import { Subject} from "rxjs";
import * as firebase from "firebase";
import { Injectable } from "@angular/core";
import {Tache} from "../models/tache.model";
import {History} from "../models/history.model";

@Injectable()
export class BaseDeDonneeService {

  historiesSubject  = new Subject<any[]>();
  private histories : History[];
  tachesSubject  = new Subject<any[]>();
  private taches : Tache[];

  constructor() { }

  emitTache(){
    this.tachesSubject.next(this.taches);
  }

  getTacheById(id : number){
    const index = this.getIndex(id);
    return this.taches[index];
  }

  switchOnOne(id:number){
    this.getTacheById(id).status = "on";
    this.getTacheById(id).date_active=(new Date()).toString();
    this.saveTachesToServer();
    this.emitTache();
  }

  switchOffOne(id:number){
    this.getTacheById(id).status = "off";
    const date = new Date(this.getTacheById(id).date_active);
    this.getTacheById(id).duree += Math.round((Date.now().valueOf() - date.valueOf())/1000);
    this.getTacheById(id).date_active = Date().toString();
    this.saveTachesToServer();
    this.emitTache();
  }

  addTache(nom:string,status:string,importance:string,categorie:string,notes:string[]){
    const date = Date().toString();
    const id = Date.now().valueOf();
    const tacheObject = new Tache(id,nom,0,date,status,importance,categorie,notes)
    this.taches.push(tacheObject);
    if(status === 'on'){
      this.addHistory(id);
    }
    this.saveTachesToServer();
    this.emitTache();
  }

  getIndex(id:number){
    return this.taches.findIndex(tache => tache.id === id);
  }

  deleteTache(id:number){
    var index = this.getIndex(id);
    this.taches.splice(index, 1);
    this.saveTachesToServer();
    this.getTachesFromServer();
    this.emitTache();
  }

  saveTachesToServer(){
    firebase.database().ref('/taches').set(this.taches);
  }

  getCategories(){
    this.getTachesFromServer();
    const categories = [];
    this.taches.forEach(
      tache => {
        if (!categories.includes(tache.categorie)) {
          categories.push(tache.categorie);
        }
      }
    );
    return categories;
  }

  getTachesFromServer(){
    firebase.database().ref('/taches').on('value', (data) => {
      this.taches = data.val() ? data.val() : [];
      this.emitTache();
    });
  }

  getTachesByCategorie(categorie : String){
    const tachesByCate = [];
    this.taches.forEach(
      t => {
        if (t.categorie === categorie) {
          tachesByCate.push(t);
        }
      }
    );
    return tachesByCate;
  }

  emitHistories(){
    this.historiesSubject.next(this.histories);
  }

  getHistoryById(id:number){
    const index = this.getIndexHistory(id);
    return this.histories[index];
  }

  getHistoryByIdTache(id:number){
    const index = this.getIndexByIdTache(id);
    return this.histories[index];
  }

  switchOffOneHistory(idTache:number){
    const h = this.getHistoryByIdTache(idTache);
    h.fin = (new Date()).toString();
    this.saveHistoriesToServer();
    this.emitHistories();
  }

  addHistory(id:number){
    const debut = Date().toString();
    const idH = Date.now().valueOf();
    const h = new History(idH,id,debut,'');
    this.getHistoriesFromServer();
    this.histories.push(h);
    this.saveHistoriesToServer();
    this.emitHistories();
  }

  deleteHistoryById(id:number){
    this.getTachesFromServer();
    this.getHistoriesFromServer();
    const hToDelete = this.getHistoryById(id);
    let tache = this.getTacheById(hToDelete.idTache);
    if(tache && hToDelete.fin===''){
      tache.status='off';
    }
    const index = this.getIndexHistory(id);
    this.histories.splice(index, 1);
    this.saveHistoriesToServer();
    this.getHistoriesFromServer();
    this.emitHistories();
    if(tache){
      tache.duree = this.sommeDuree(hToDelete.idTache);
    }
    this.saveTachesToServer();
    this.getTachesFromServer();
    this.emitTache();
  }

  sommeDuree(id:number){
    console.log(this.histories);
    let duree = 0;
    this.histories.forEach(
      history => {
        if(history.idTache === id && history.fin!==''){
          let d = (new Date(history.debut)).valueOf();
          let f = (new Date(history.fin)).valueOf();
          duree += Math.round( (f-d) /1000);
        }
      }
    )
    console.log(duree);
    return duree;
  }

  saveHistoriesToServer(){
    firebase.database().ref('/histories').set(this.histories);
  }

  getHistoriesFromServer(){
    firebase.database().ref('/histories').on('value', (data) => {
      this.histories = data.val() ? data.val() : [];
      this.emitHistories();
    });
  }

  getIndexHistory(id:number){
    return this.histories.findIndex(history => history.id === id);
  }

  getIndexByIdTache(id:number){
    return this.histories.findIndex(history => history.idTache === id && !history.fin);
  }

  modifierHistory(id: number, debut: string, fin: string) {
    this.getHistoriesFromServer();
    this.getTachesFromServer();
    let h = this.getHistoryById(id);
    let d = new Date(debut);
    let f = new Date(fin);
    let tache = this.getTacheById(h.idTache);
    if(tache && (f.valueOf()-d.valueOf())>0){
      h.debut = d.toString();
      h.fin = f.toString();
      tache.status = 'off';
      tache.duree = this.sommeDuree(h.idTache);
    }
    this.saveHistoriesToServer();
    this.getHistoriesFromServer();
    this.emitHistories();
    this.saveTachesToServer();
    this.getTachesFromServer();
    this.emitTache();
  }
}
