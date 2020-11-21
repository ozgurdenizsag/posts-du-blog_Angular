import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SingleTacheComponent } from './tache/single-tache/single-tache.component';
import { SingleCategorieComponent } from './categorie/single-categorie/single-categorie.component';
import { ListCategorieComponent } from './categorie/list-categorie/list-categorie.component';
import { HeaderComponent } from './header/header.component';
import { CreerTacheComponent } from './tache/creer-tache/creer-tache.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BaseDeDonneeService } from "./services/base-de-donnee.service";
import { HistoriqueComponent } from './historique/historique.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { VueEnsembleComponent } from './vue-ensemble/vue-ensemble.component';
import {RouterModule, Routes} from "@angular/router";
import { ModifierTacheComponent } from './tache/modifier-tache/modifier-tache.component';
import { NothingComponent } from './nothing/nothing.component';
import { SingleHistoireComponent } from './historique/single-histoire/single-histoire.component';
import { ModifierHistoryComponent } from './historique/modifier-history/modifier-history.component';

const routes: Routes = [
  { path: 'creer/tache', component: CreerTacheComponent },
  { path: 'historique', component: HistoriqueComponent },
  { path: 'vue-ensemble' , component: VueEnsembleComponent },
  { path : 'modifier/:id', component : ModifierTacheComponent},
  { path : 'modifier-history/:id', component : ModifierHistoryComponent},
  { path : '', component : NothingComponent },
  { path : 'not-found', component : FourOhFourComponent },
  { path : '**' , redirectTo : '/not-found' }
];

@NgModule({
  declarations: [
    AppComponent,
    SingleTacheComponent,
    SingleCategorieComponent,
    ListCategorieComponent,
    HeaderComponent,
    CreerTacheComponent,
    HistoriqueComponent,
    FourOhFourComponent,
    VueEnsembleComponent,
    ModifierTacheComponent,
    NothingComponent,
    SingleHistoireComponent,
    ModifierHistoryComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    BaseDeDonneeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
