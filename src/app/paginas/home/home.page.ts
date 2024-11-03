import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard,IonCardHeader,IonCardContent,IonCardTitle,IonNote,IonLabel,IonItem,IonList,IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon,IonFab,IonFabButton } from '@ionic/angular/standalone';
import { Cita } from 'src/app/modelo/cita';
import { CitaService } from 'src/app/servicio/cita.service';
import { addIcons } from 'ionicons';
import { settingsOutline, add, homeOutline,createOutline } from 'ionicons/icons';
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
    addIcons({settingsOutline,homeOutline,createOutline,add});
  }
  private async actualizar(){
    this.citaHome= await this.citaService.getCitas()
  }
  //carga de datos al inicio del ciclo de vida se elimina la promesa ya que se espera un vacio
  async ngOnInit() {
    // esto es importante, sin eso no abre la conexión
    await this.citaService.iniciarPlugin()
    await this.actualizar()
     this.getCitaAleatoria()
     this.getStatusEliminar()
  }
  async ngOnDestroy(){
    await this.citaService.cerrarConexion
  }
// No me funcionaba porque no volvía a validar el status al redireccionar
  ionViewWillEnter() {
    this.getStatusEliminar();
  }

  getCitaAleatoria() {
    // me faltaba actualizar la BBDD al entrar a cita aleatoria
    console.log("ingresando a cita aleatoria "+this.citaHome.length)
    if (this.citaHome.length > 0) {
      const indiceAleatorio = Math.floor(Math.random() * this.citaHome.length);
      console.log("se obtuvo un indice "+indiceAleatorio)
      this.citaAleatora = this.citaHome[indiceAleatorio];
      console.log("se obtuvo una cita "+this.citaAleatora)
    } else {
      this.citaAleatora = null;
    }
  }

  async getStatusEliminar(){
    this.eliminarCitas= await this.configuracionService.getBoolean()
  }

  async onClick(){
    if(this.citaAleatora!=null){  
      await this.citaService.eliminarCita(this.citaAleatora)
    }
    await this.actualizar()
    this.getCitaAleatoria()
  }
}
