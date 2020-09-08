import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewClientComponent} from './Clients/new-client/new-client.component';
import {NewCompteComponent} from './Comptes/new-compte/new-compte.component';
import {ListCompteComponent} from './Comptes/list-compte/list-compte.component';
import {ModeReglementComponent} from './mode-reglement/mode-reglement.component';
import {VersementComponent} from './Operations/versement/versement.component';
import {RetraitComponent} from './Operations/retrait/retrait.component';
import {VirementComponent} from './Operations/virement/virement.component';
import {NewRetraitComponent} from './Operations/new-retrait/new-retrait.component';
import {NewEmpruntComponent} from './Emprunts/new-emprunt/new-emprunt.component';
import {ListEmpruntComponent} from './Emprunts/list-emprunt/list-emprunt.component';
import {NewRembComponent} from './Remboursement/new-remb/new-remb.component';
import {ListRembComponent} from './Remboursement/list-remb/list-remb.component';
import {RechercheComponent} from './recherche/recherche.component';
import {ReleveCompteComponent} from './releve-compte/releve-compte.component';
import {SituationCompteComponent} from './situation-compte/situation-compte.component';
import {SauvegardeBDComponent} from './sauvegarde-bd/sauvegarde-bd.component';
import {RestaurerBDComponent} from './restaurer-bd/restaurer-bd.component';
import {CpteReleveComponent} from './cpte-releve/cpte-releve.component';
import { NewVersementComponent } from './Operations/new-versement/new-versement.component';
import {AcceuilComponent} from './acceuil/acceuil.component';
import {LogoutComponent} from './logout/logout.component';
import {UtilisateursComponent} from './utilisateurs/utilisateurs.component';
import {RestaurerComponent} from './restaurer/restaurer.component';
import {SauvegardeComponent} from './sauvegarde/sauvegarde.component';
import {ClientListComponent} from './Clients/client-list/client-list.component';
import {EditClientComponent} from './Clients/edit-client/edit-client.component';
import {EditCompteComponent} from './Comptes/edit-compte/edit-compte.component';
import {EditVersementComponent} from './Operations/edit-versement/edit-versement.component';
import {EditRetraitComponent} from './Operations/edit-retrait/edit-retrait.component';
import {OperationCouranteComponent} from './operation-courante/operation-courante.component';
import {ViewClientComponent} from './Clients/view-client/view-client.component';
import {ViewCompteComponent} from './Comptes/view-compte/view-compte.component';
import {ViewEmpruntComponent} from './Emprunts/view-emprunt/view-emprunt.component';


const routes: Routes = [
  {path:"acceuil",component:AcceuilComponent},

  {path:"new_client",component:NewClientComponent},
  {path:"list_client",component:ClientListComponent},
  {path:"edit_client/:id",component:EditClientComponent},
  {path:"view_client/:id",component:ViewClientComponent},

  {path:"new_compte",component:NewCompteComponent},
  {path:"list_compte",component:ListCompteComponent},
  {path:"edit_compte/:id",component:EditCompteComponent},
  {path:"view_compte/:id",component:ViewCompteComponent},

  {path:"reglements",component:ModeReglementComponent},

  {path:"versement",component:VersementComponent},
  {path:"new-versement",component:NewVersementComponent},
  {path:"edit_versement/:id",component:EditVersementComponent},

  {path:"retrait",component:RetraitComponent},
  {path:"new-retrait",component:NewRetraitComponent},
  {path:"edit_retrait/:id",component:EditRetraitComponent},

  {path:"virement",component:VirementComponent},
  {path:"new-virement",component:VirementComponent},

  {path:"new_emprunt",component:NewEmpruntComponent},
  {path:"list_emprunts",component:ListEmpruntComponent},
  {path:"view_emprunt/:id",component:ViewEmpruntComponent},

  {path:"new_remb",component:NewRembComponent},
  {path:"list_remb",component:ListRembComponent},

  {path:"recherche",component:RechercheComponent},

  {path:"opecour",component:OperationCouranteComponent},

  {path:"releve_compte",component:ReleveCompteComponent},

  {path:"situation_compte",component:SituationCompteComponent},

  {path:"sauvegarder",component:SauvegardeBDComponent},
  {path:"restaurer",component:RestaurerBDComponent},

  {path:"cpteRel",component:CpteReleveComponent},

  {path:"logout",component:LogoutComponent},

  {path:"utilisateur",component:UtilisateursComponent},


  {path:"res",component:RestaurerComponent},
  {path:"sauv",component:SauvegardeComponent},
  { path: '', redirectTo: '/acceuil', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
