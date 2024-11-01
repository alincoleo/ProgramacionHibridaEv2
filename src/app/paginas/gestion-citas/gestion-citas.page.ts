import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { Cita } from 'src/app/modelo/cita';
import { CitaService } from 'src/app/servicio/cita.service';
import { CitaListComponent } from "../../componentes/cita-list/cita-list.component";
import { CitaFormComponent } from "../../componentes/cita-form/cita-form.component";

@Component({
  selector: 'app-gestion-citas',
  templateUrl: './gestion-citas.page.html',
  styleUrls: ['./gestion-citas.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons,  IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, CitaListComponent, CitaFormComponent]
})
export class GestionCitasPage implements OnInit {


  
  // @Input() 
  gestionCitas:Cita[]=[]  
  //@Output() onCreate2= new EventEmitter<Cita>()
  
  constructor(
    private citaService:CitaService
  ) {
   
   }

   private actualizar(){
    this.gestionCitas=this.citaService.getCitas()
  }
  //carga de datos al inicio del ciclo de vida
  ngOnInit(): void {
    this.actualizar()
  }
  
  // envioGestionHaciaHome($event: Cita) {
  //   this.onCreate2.emit($event)
  //   this.actualizar()
  // }
  
  gestionAgregarCita($event: Cita) {
    this.citaService.agregarCita($event)
    this.actualizar()
  }
  gestionEliminarCita($event: Cita) {
    this.citaService.eliminarCita(this.citaService.consultarIndice($event))
    this.actualizar()
    }
}
