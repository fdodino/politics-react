import axios from 'axios'
import { SERVER_CONNECTION } from './serverConstants'
import { Candidate } from '../domain/candidate'

const CANDIDATE_URI = '/candidates/'

class CandidateService {

  async buscarPorId(idCandidate: number) {
    const candidate = await axios.get(SERVER_CONNECTION + CANDIDATE_URI + idCandidate)
    const { id, nombre, partido, promesas } = candidate.data
    return new Candidate(id, nombre, partido.nombre, promesas)
  }

  async actualizar(candidate: Candidate) {
    await axios.patch(SERVER_CONNECTION + CANDIDATE_URI + candidate.id, {
      votos: candidate.votos,
      promesas: candidate.promesas.map(promesa => promesa.toDTO()),
    })
  }

}

export const candidateService = new CandidateService()
