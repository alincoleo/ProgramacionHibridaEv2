import { Injectable } from '@angular/core';
import { Cita } from '../modelo/cita';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
@Injectable({
  providedIn: 'root'
})
export class CitaService {
  // el simbolo de exclamación indica que sí o sí se inicializará luego, aquí solo declaramos la variable
  db!: SQLiteDBConnection;
  plataforma:string=""
  // nombre el que uno desee
  DB_NAME: string ="lista_citas"
  // lo siguiente son configuraciones
  DB_ENCRIPTADA: boolean=false
  DB_MODE: string="no-enctryption"
  DB_VERSION: number=1
  DB_READ_ONLY: boolean=false
  //variables de la tabla
  TABLE_NAME :string = "lista_citas"
  TABLE_COL_ID :string ="id"
  TABLE_COL_FRASE:string = "frase"
  TABLE_COL_AUTOR:string="autor"
  DB_SQL_TABLAS: string = `
    CREATE TABLE IF NOT EXISTS ${this.TABLE_NAME}(
      ${this.TABLE_COL_ID} INTEGER PRIMARY KEY AUTOINCREMENT,
      ${this.TABLE_COL_FRASE} TEXT NOT NULL,
      ${this.TABLE_COL_AUTOR} TEXT NOT NULL
    );
  `  

  constructor() { }

  // string de conexión
  sqlite:SQLiteConnection = new SQLiteConnection(CapacitorSQLite)

  // inicialización para web
  private async _iniciarPluginWeb(): Promise<void> {    
    await customElements.whenDefined('jeep-sqlite')
    const jeepSqliteEl = document.querySelector("jeep-sqlite")
    if( jeepSqliteEl != null ) {      
      await this.sqlite.initWebStore()            
    }
  }

  async iniciarPlugin() {   
    this.plataforma = Capacitor.getPlatform()
    // evalua en la plataforma que nos encontramos y llama al método
    if(this.plataforma == "web") {
      // quiero esperar que se ejecute
      await this._iniciarPluginWeb()
    }
    await this.abrirConexion()
    await this.db.execute(this.DB_SQL_TABLAS)   
    // arriba justo antes crea la tabla si no existe
    const auxRevisarTabla = await this.revisarTabla()
    if(auxRevisarTabla===0){
      await this.agregarCita({frase:"Tu tiempo es limitado, así que no lo malgastes viviendo la vida de alguien más… ten el valor de seguir tu corazón y tu intuición",autor:"Steve Jobs"})
      await this.agregarCita({frase:"Vademecum vadetecum",autor:"Friederich Nietzche"})
      await this.agregarCita({frase:"Eureka",autor:"Isaac Newton"})
      await this.agregarCita({frase:"persecula seculorum",autor:"AA"})   
    }       
}

async abrirConexion() {                    
  const ret = await this.sqlite.checkConnectionsConsistency() 
  const isConn = (await this.sqlite.isConnection(this.DB_NAME, this.DB_READ_ONLY)).result
  if(ret.result && isConn) {
    this.db = await this.sqlite.retrieveConnection(this.DB_NAME, this.DB_READ_ONLY)      
  } else {
    this.db = await this.sqlite.createConnection(
      this.DB_NAME,
      this.DB_ENCRIPTADA,
      this.DB_MODE,
      this.DB_VERSION,
      this.DB_READ_ONLY
    )
  }
  await this.db.open()
}

// Recordar cerrar conexión donde se abren, en el ciclo ngOnDestroy
async cerrarConexion() {
  await this.db.close() 
}
  
  async agregarCita(cita:Cita){
    // this.citas.push(cita)
    // los signos de interrogación indican valores que serán reemplazados
    const sql=`INSERT INTO ${this.TABLE_NAME} (${this.TABLE_COL_FRASE},${this.TABLE_COL_AUTOR}) VALUES (?,?)`
    // aquí en el arreglo se ingresan los valores en "?" en el mismo orden en que se presentan en la query
    await this.db.run(sql,[cita.frase,cita.autor])
  }

  async getCitas(): Promise<Cita[]>{
    // return this.citas
    const sql = `SELECT * FROM ${this.TABLE_NAME}`
    const resultado = await this.db.query(sql)
    // Recordar resultado? (llamada segura) luego "??"" significa "si es nulo" devolver areglo vacio[]
    return resultado?.values ??[]
  }
  
  async eliminarCita(cita:Cita){
    console.log("entrando a eliminar cita "+cita.frase+" "+cita.autor)
    const sql=`DELETE FROM ${this.TABLE_NAME}
    WHERE ${this.TABLE_COL_FRASE}=?
    AND ${this.TABLE_COL_AUTOR}=?`
    // aquí en el arreglo se ingresan los valores en "?" en el mismo orden en que se presentan en la query
    await this.db.run(sql,[cita.frase,cita.autor])
  }

  // por mientras manejar un any, a futuro averiguar si se puede forzar el número en la salida
  async revisarTabla():Promise<number>{
    const sql = `SELECT COUNT(1) AS CONTADOR FROM ${this.TABLE_NAME}`
    const resultado = await this.db.query(sql)
    console.log("revisando llamado al count " +resultado?.values?.[0].CONTADOR)
    // con esto accedo al primer registro de la columna que le di el alias "CONTADOR"
    return resultado?.values?.[0].CONTADOR ?? 0
  }
}
