import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Cita } from 'src/app/modelo/cita';
import { CitaService } from 'src/app/servicio/cita.service';
import { CitaListComponent } from "../../componentes/cita-list/cita-list.component";
import { CitaFormComponent } from "../../componentes/cita-form/cita-form.component";
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { settingsOutline, homeOutline, createOutline } from 'ionicons/icons';

@Component({
  selector: 'app-gestion-citas',
  templateUrl: './gestion-citas.page.html',
  styleUrls: ['./gestion-citas.page.scss'],
  standalone: true,
  imports: [RouterModule, IonIcon, IonButton, IonBackButton, IonButtons,  IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, CitaListComponent, CitaFormComponent]
})
export class GestionCitasPage implements OnInit {

  gestionCitas:Cita[]=[]  
  
  constructor(
    private citaService:CitaService
  ) { addIcons({homeOutline,createOutline,settingsOutline})}

  private async actualizar(){
     this.gestionCitas= await this.citaService.getCitas()
  }
  //carga de datos al inicio del ciclo de vida
  async ngOnInit() {
    await this.citaService.iniciarPlugin()
    await this.actualizar()
  }
  async ngOnDestroy(){
    await this.citaService.cerrarConexion
  }
  
  async gestionAgregarCita($event: Cita) {
   await this.citaService.agregarCita($event)
   await this.actualizar()
  }
 
  async gestionEliminarCita($event: Cita) {
    await this.citaService.eliminarCita($event)
    await this.actualizar()
    }
}
