import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreerTacheComponent} from "./tache/creer-tache/creer-tache.component";
import {HistoriqueComponent} from "./historique/historique.component";
import {FourOhFourComponent} from "./four-oh-four/four-oh-four.component";
import {VueEnsembleComponent} from "./vue-ensemble/vue-ensemble.component";
import {ModifierTacheComponent} from "./tache/modifier-tache/modifier-tache.component";


const routes: Routes = [
  { path: 'creer/tache', component: CreerTacheComponent },
  { path: 'historique', component: HistoriqueComponent },
  { path : 'vue-ensemble', component : VueEnsembleComponent},
  { path : 'modifier/:id', component : ModifierTacheComponent},
  { path : 'not-found', component : FourOhFourComponent},
  { path : '' , redirectTo : 'vue-ensemble' , pathMatch : 'full' },
  { path : '**' , redirectTo : '/not-found'}
];

@NgModule({
  imports: [ RouterModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
