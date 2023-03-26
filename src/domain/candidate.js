import { sortBy } from 'lodash'
import { Promesa } from './promesa'

let lastId = 1

export class Candidate {

  constructor(_id, _nombre, _partido, _promesas) {
    this.id = _id || lastId++
    this.nombre = _nombre
    this.partido = _partido
    this.promesas = (_promesas || []).map(({ id, accionPrometida, fecha }) => new Promesa(id, accionPrometida, fecha))
    this.votos = 0
  }

  agregarPromesa(descripcionPromesa) {
    this.promesas.push(new Promesa(null, descripcionPromesa))
  }

  buscarPorNombre(_nombre) {
    return this.nombre === _nombre
  }

  promesasPorFecha() {
    return sortBy(this.promesas, 'fecha')
  }

  registrarVoto() {
    this.votos++
  }
} 