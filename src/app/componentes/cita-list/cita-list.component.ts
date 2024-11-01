import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cita } from 'src/app/modelo/cita';
import { CommonModule } from '@angular/common';
import { IonCardHeader, IonCardTitle, IonCardSubtitle, IonList, IonItem, IonCard, IonToggle, IonLabel, IonNote, IonText, IonButton, IonIcon } from "@ionic/angular/standalone";
import {  trashSharp, trashOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cita-list',
  templateUrl: './cita-list.component.html',
  styleUrls: ['./cita-list.component.scss'],
  standalone: true,
  imports:[FormsModule, CommonModule,IonCardHeader, IonCardTitle, IonCardSubtitle, IonList, IonItem,IonCard,IonToggle, IonLabel, IonNote,IonText,IonButton, IonIcon  ],
})
export class CitaListComponent  implements OnInit {
  frase:string=""
  autor:string=""

  @Input() listaCitas:Cita[]=[]
  @Output() onDestroy= new EventEmitter<Cita>()

  constructor() {addIcons({trashOutline,trashSharp}); }

  ngOnInit() {}

  onClick(){
    //configuración del msj que se enviará (se crea un objeto cita nuevo por cada envio)
    this.onDestroy.emit(new Cita(this.frase,this.autor))
  }

}
