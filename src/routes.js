import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ConsultaCandidates } from './components/ConsultaCandidates'
import { FichaCandidate } from './components/FichaCandidate'

export const PoliticsRoutes = () => 
  <Router>
      <Routes>
          <Route path="/" element={<ConsultaCandidates/>} />
          <Route path="/ficha/:id" element={<FichaCandidate/>} />
      </Routes>
  </Router>
