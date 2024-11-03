import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton,IonIcon,IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonItem, IonToggle } from '@ionic/angular/standalone';
import { IonicModule, ToggleChangeEventDetail } from '@ionic/angular';
import { IonToggleCustomEvent } from '@ionic/core';
import { ConfiguracionService } from 'src/app/servicio/configuracion.service';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { settingsOutline, homeOutline, createOutline } from 'ionicons/icons';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
  standalone: true,
  imports: [RouterModule,IonButton,IonIcon,IonToggle, IonItem, IonButtons, IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ConfiguracionPage implements OnInit {

  eliminarCitasInicio =false
  constructor(
    private configuracionService : ConfiguracionService
  ) {addIcons({homeOutline,createOutline,settingsOutline}) }

  async ngOnInit() {
    this.eliminarCitasInicio= await this.configuracionService.getBoolean()
  }
  onConfigurarEliminarCitasInicio($event: IonToggleCustomEvent<ToggleChangeEventDetail<any>>) {
    this.configuracionService.setBoolean(this.eliminarCitasInicio)
    }

}
