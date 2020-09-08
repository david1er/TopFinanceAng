import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './Composants/menu/menu.component';
import { HeaderComponent } from './Composants/header/header.component';
import { FooterComponent } from './Composants/footer/footer.component';
import { SauvegardeComponent } from './sauvegarde/sauvegarde.component';
import { RestaurerComponent } from './restaurer/restaurer.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { NewClientComponent } from './Clients/new-client/new-client.component';
import { NewCompteComponent } from './Comptes/new-compte/new-compte.component';
import { ListCompteComponent } from './Comptes/list-compte/list-compte.component';
import { EditCompteComponent } from './Comptes/edit-compte/edit-compte.component';
import { CpteReleveComponent } from './cpte-releve/cpte-releve.component';
import { NewEmpruntComponent } from './Emprunts/new-emprunt/new-emprunt.component';
import { ListEmpruntComponent } from './Emprunts/list-emprunt/list-emprunt.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { ModeReglementComponent } from './mode-reglement/mode-reglement.component';
import { OpecourComponent } from './OpeCour/opecour/opecour.component';
import { OpecourListComponent } from './OpeCour/opecour-list/opecour-list.component';
import { OpecoursComponent } from './OpeCour/opecours/opecours.component';
import { NewRetraitComponent } from './Operations/new-retrait/new-retrait.component';
import { VersementComponent } from './Operations/versement/versement.component';
import { RetraitComponent } from './Operations/retrait/retrait.component';
import { VirementComponent } from './Operations/virement/virement.component';
import { RechercheComponent } from './recherche/recherche.component';
import { ReleveCompteComponent } from './releve-compte/releve-compte.component';
import { NewRembComponent } from './Remboursement/new-remb/new-remb.component';
import { ListRembComponent } from './Remboursement/list-remb/list-remb.component';
import { SituationCompteComponent } from './situation-compte/situation-compte.component';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { SauvegardeBDComponent } from './sauvegarde-bd/sauvegarde-bd.component';
import { RestaurerBDComponent } from './restaurer-bd/restaurer-bd.component';
//import {FlxUiDataTable, FlxUiDatatableModule} from 'flx-ui-datatable';
import {ToasterService} from './Shared/toaster.service';
//formatage en francais
import { LOCALE_ID } from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {MaterialModule} from './material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import { NewVersementComponent } from './Operations/new-versement/new-versement.component';
import {AgGridModule} from 'ag-grid-angular';
import { ListeClientComponent } from './liste-client/liste-client.component';
import { ClientListComponent } from './Clients/client-list/client-list.component';
import { EditClientComponent } from './Clients/edit-client/edit-client.component';
import { EditVersementComponent } from './Operations/edit-versement/edit-versement.component';
import { EditRetraitComponent } from './Operations/edit-retrait/edit-retrait.component';
import { OperationCouranteComponent } from './operation-courante/operation-courante.component';
import {MatProgressSpinnerModule} from '@angular/material';
import { ViewClientComponent } from './Clients/view-client/view-client.component';
import { ViewCompteComponent } from './Comptes/view-compte/view-compte.component';
import { ViewEmpruntComponent } from './Emprunts/view-emprunt/view-emprunt.component';
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    SauvegardeComponent,
    RestaurerComponent,
    AcceuilComponent,
    NewClientComponent,
    NewCompteComponent,
    ListCompteComponent,
    EditCompteComponent,
    CpteReleveComponent,
    NewEmpruntComponent,
    ListEmpruntComponent,
    LoginComponent,
    LogoutComponent,
    MatConfirmDialogComponent,
    ModeReglementComponent,
    OpecourComponent,
    OpecourListComponent,
    OpecoursComponent,
    NewRetraitComponent,
    VersementComponent,
    RetraitComponent,
    VirementComponent,
    RechercheComponent,
    ReleveCompteComponent,
    NewRembComponent,
    ListRembComponent,
    SituationCompteComponent,
    UtilisateursComponent,
    SauvegardeBDComponent,
    RestaurerBDComponent,
    NewVersementComponent,
    ListeClientComponent,
    ClientListComponent,
    EditClientComponent,
    EditVersementComponent,
    EditRetraitComponent,
    OperationCouranteComponent,
    ViewClientComponent,
    ViewCompteComponent,
    ViewEmpruntComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
        // FlxUiDatatableModule,
        AppRoutingModule,
        // JwtHelperService,
        AgGridModule.withComponents([]),
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 2000,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
        }),
        AgGridModule,
        MatProgressSpinnerModule,
    ],
  providers: [
    ToasterService,
  //  FlxUiDataTable,
    //pour le formatage en francais
    { provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
  bootstrap: [AppComponent],
  entryComponents: [MatConfirmDialogComponent,NewRembComponent,OpecourComponent]
})
export class AppModule { }
