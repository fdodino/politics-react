import { DateTime } from 'luxon'

export class Promesa {

  constructor(id, descripcionPromesa, fecha = DateTime.local()) {
    this.id = id
    this.descripcion = descripcionPromesa
    this.fecha = DateTime.fromISO(fecha)
  }

  get fechaAMostrar() {
    return this.fecha.toFormat('dd/MM/yyyy')
  }

  toDTO() {
    return {
      id: this.id,
      accionPrometida: this.descripcion,
      fecha: this.fecha.toFormat('yyyy-MM-dd')
    }
  }
}
