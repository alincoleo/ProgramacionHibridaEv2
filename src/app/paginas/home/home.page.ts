import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard,IonCardHeader,IonCardContent,IonCardTitle,IonNote,IonLabel,IonItem,IonList,IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon,IonFab,IonFabButton } from '@ionic/angular/standalone';
import { Cita } from 'src/app/modelo/cita';
import { CitaService } from 'src/app/servicio/cita.service';
import { addIcons } from 'ionicons';
import { settingsOutline, add, trashOutline } from 'ionicons/icons';
import { RouterModule } from '@angular/router';
import { ConfiguracionService } from 'src/app/servicio/configuracion.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonCard,IonCardHeader,IonCardContent,IonCardTitle,IonNote,IonLabel,IonItem,IonList,IonFab,IonFabButton,IonButtons, IonButton, IonIcon, RouterModule, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HomePage implements OnInit {

  frase : string=""
  autor : string=""
  citaHome:Cita[] =[]
  // para inicializar el objeto nulo
   citaAleatora:Cita|null=null
   eliminarCitas:boolean=false

  constructor(
    //inyectamos el servicio
    private citaService:CitaService,
    private configuracionService:ConfiguracionService
  ) {
    //importamos el icono de engranaje
    addIcons({settingsOutline,trashOutline,add});
  }
  private actualizar(){
    this.citaHome=this.citaService.getCitas()
  }
  //carga de datos al inicio del ciclo de vida
  ngOnInit(): void {
    this.actualizar()
    this.getCitaAleatoria()
    this.getStatusEliminar()
  }
// No me funcionaba porque no volvía a validar el status al redireccionar
  ionViewWillEnter() {
    this.getStatusEliminar();
  }

  getCitaAleatoria() {
    if (this.citaHome.length > 0) {
      const indiceAleatorio = Math.floor(Math.random() * this.citaHome.length);
      this.citaAleatora = this.citaHome[indiceAleatorio];
    } else {
      this.citaAleatora = null;
    }
  }

  getStatusEliminar(){
    this.eliminarCitas=this.configuracionService.getBoolean()
  }
  onClick(){
    console.log("hello")
     if(this.citaAleatora!=null){  
     this.citaService.eliminarCita(this.citaService.consultarIndice(this.citaAleatora))
     }
      this.actualizar()
      this.getCitaAleatoria()
  }
}
