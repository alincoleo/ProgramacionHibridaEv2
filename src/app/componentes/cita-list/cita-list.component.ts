import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cita } from 'src/app/modelo/cita';
import { CommonModule } from '@angular/common';
import { IonCardHeader, IonCardTitle, IonCardSubtitle, IonList, IonItem, IonCard, IonToggle, IonLabel, IonNote, IonText, IonButton, IonIcon } from "@ionic/angular/standalone";
import {  trashOutline } from 'ionicons/icons';
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

  @Input() listaCitas:Cita[]=[]
  @Output() onDestroy= new EventEmitter<Cita>()

  constructor() {addIcons({trashOutline}); }

  ngOnInit() {}

  onClick(cita:Cita){
    this.onDestroy.emit(cita)
  }

}
