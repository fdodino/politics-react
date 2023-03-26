import axios from 'axios'
import { Candidate } from '../domain/candidate'
import { SERVER_CONNECTION } from './serverConstants'

const CANDIDATE_URI = '/candidates/'

class CandidateService {

  async buscarPorId(idCandidate) {
    const candidate = await axios.get(SERVER_CONNECTION + CANDIDATE_URI + idCandidate)
    const { id, nombre, partido, promesas } = candidate.data
    return new Candidate(id, nombre, partido.nombre, promesas)
  }

  async actualizar(candidate) {
    await axios.put(SERVER_CONNECTION + CANDIDATE_URI + candidate.id, {
      votos: candidate.votos,
      promesas: candidate.promesas.map(promesa => promesa.toDTO()),
    })
  }
}

export const candidateService = new CandidateService()
