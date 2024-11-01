import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonLabel,IonItem,IonList,IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon,IonFab,IonFabButton } from '@ionic/angular/standalone';
import { Cita } from 'src/app/modelo/cita';
import { CitaService } from 'src/app/servicio/cita.service';
import { addIcons } from 'ionicons';
import { settingsOutline, add, trashOutline } from 'ionicons/icons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonLabel,IonItem,IonList,IonFab,IonFabButton,IonButtons, IonButton, IonIcon, RouterModule, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HomePage implements OnInit {

  frase : string=""
  autor : string=""
  citaHome:Cita[] =[]
  // para inicializar el objeto nulo
  // citaAleatora:Cita|null=null

  constructor(
    //inyectamos el servicio
    private citaService:CitaService
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
    // this.getCitaAleatoria()
  }
  // getCitaAleatoria() {
  //   if (this.citaHome.length > 0) {
  //     const indiceAleatorio = Math.floor(Math.random() * this.citaHome.length);
  //     this.citaAleatora = this.citaHome[indiceAleatorio];
  //   } else {
  //     this.citaAleatora = null;
  //   }
  // }
}
