import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  private eliminarCitasInicio = false

  constructor() { }

  getBoolean():boolean{
    return this.eliminarCitasInicio
  }

  setBoolean(eliminarCita:boolean){
    this.eliminarCitasInicio=eliminarCita
  }
}
