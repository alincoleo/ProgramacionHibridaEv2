// para modelo en duro
// export class Cita{
//     constructor(
//         public frase:string="",
//         public autor:string=""
//     ){}
// }

// para llamado a BBDD
export interface Cita{
    id?:number
    frase:string
    autor:string
}