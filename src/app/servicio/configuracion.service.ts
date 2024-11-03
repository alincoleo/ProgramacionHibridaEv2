import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';


@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {
  private readonly KEY_ELIMINAR_CITA_INICIO="ELIMINAR_CITA_INICIO"
  // private eliminarCitasInicio = false

  constructor() { }

  async getBoolean():Promise<boolean>{
    const respuesta = await Preferences.get({key:this.KEY_ELIMINAR_CITA_INICIO})
    // crea un if si hay una respuesta la evalua devolviendo un booleano
    return respuesta?.value == "true"
  }

  async setBoolean(eliminarCita:boolean){
    await Preferences.set(
      {key: this.KEY_ELIMINAR_CITA_INICIO,
        value: eliminarCita? "true":"false"
      }
    )
    
  }
}
