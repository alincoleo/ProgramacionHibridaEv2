import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonInput, IonList, IonText } from "@ionic/angular/standalone";
import { Cita } from 'src/app/modelo/cita';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cita-form',
  templateUrl: './cita-form.component.html',
  styleUrls: ['./cita-form.component.scss'],
  standalone: true,
  imports :[CommonModule, FormsModule, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonInput, IonList,IonText]
})
export class CitaFormComponent  implements OnInit {
  //captura desde el formulario
  frase:string =""
  autor:string=""

  //evento que emitira el mensaje
  @Output() onCreate= new EventEmitter<Cita>()

  constructor() { }

  ngOnInit() {}
  //momento en que se enviará el mensaje
  onClick(){
    //configuración del msj que se enviará (se crea un objeto cita nuevo por cada envio)
    this.onCreate.emit( {frase: this.frase,autor: this.autor})
  }

}
