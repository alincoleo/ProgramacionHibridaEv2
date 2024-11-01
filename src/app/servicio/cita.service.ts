import { Injectable } from '@angular/core';
import { Cita } from '../modelo/cita';
@Injectable({
  providedIn: 'root'
})
export class CitaService {
  
  private citas: Cita[]=[
    new Cita("Tu tiempo es limitado, así que no lo malgastes viviendo la vida de alguien más… ten el valor de seguir tu corazón y tu intuición","Steve Jobs"),
    new Cita("Vademecum vadetecum","Friederich Nietzche" ),
    new Cita("Eureka","Isaac Newton"),
    new Cita("persecula seculorum","AA")
  ]
  constructor() { }
  
  agregarCita(cita:Cita){
    this.citas.push(cita)
  }

  eliminarCita(indice:number){
    this.citas.splice(indice,1)
  }

  consultarIndice(eliminar:Cita):number{
    return this.citas.findIndex(citaActual=>citaActual==eliminar)
  }

  getCitas():Cita[]{
    return this.citas
  }
}
