import { Dropdown } from 'primereact/dropdown'
import { DataTable } from 'primereact/datatable'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { Toast } from 'primereact/toast'
import { useRef, useEffect, useState } from 'react'
import { isEmpty } from 'lodash'
import { useNavigate } from 'react-router-dom'
import { orderBy } from 'lodash'
import { candidateService } from '../services/candidateService'
import { zonaService } from '../services/zonaService'
import { Candidate } from '../domain/candidate'
import { Zona } from '../domain/zona'

export const ConsultaCandidates = function() {
  const [zonas, setZonas] = useState<Zona[]>([])
  const [zonaSeleccionada, setZonaSeleccionada] = useState<Zona | undefined>(undefined)
  const navigate = useNavigate()
  const toast = useRef<Toast | null>(null)

  async function elegirZona(zonas: |Zona[], zona: Zona) {
    try {
      const idZonaSeleccionada = zona.id
      const indiceAModificar = zonas.map((zona) => zona.id).indexOf(idZonaSeleccionada)
      const zonaElegida = await zonaService.getZonaSeleccionada(idZonaSeleccionada)
       
      zonas[indiceAModificar] = zonaElegida
      setZonaSeleccionada(zonaElegida)
    } catch (e: unknown) {
      console.log(e)
      toast.current!.show({ severity: 'error', summary: 'Ocurrió un error al traer la zona de votación seleccionada.', detail: (e as Error).message})
    }
  }

  useEffect(() => {
    const getZonas = async function() { 
      try {
        const zonas = await zonaService.zonas()
        if (!isEmpty(zonas)) {
          await elegirZona(zonas, zonas[0])
        }
        setZonas(zonas)
      } catch (e: unknown) {
        console.log(e)
        toast.current!.show({ severity: 'error', summary: 'Ocurrió un error al traer las zonas de votación.', detail: (e as Error).message})
      }
    }
    getZonas()
    }, []
  )


  const registrarVoto = function(candidate: Candidate) {
    return <Button icon="pi pi-user" tooltip="Registrar Voto" className="p-button-secondary p-button-raised p-button-rounded" onClick={async () => {
      try {
        candidate.registrarVoto()
        await candidateService.actualizar(candidate)
        setZonaSeleccionada({ ...zonaSeleccionada! })
      } catch (e: unknown) {
        console.log(e)
        toast.current!.show({ severity: 'error', summary: 'Ocurrió un error al traer las zonas de votación.', detail: (e as Error).message})
      }
    }}/>
  }

  const verFicha = function(candidate: Candidate) {
    return <Button icon="pi pi-chevron-right" tooltip="Ver Ficha" className="p-button-secondary p-button-raised p-button-rounded p-button-outlined" onClick={() => {navigate('/ficha/' + candidate.id)}}/>
  }

  return (
    <div>
      <div className="titulo">
        Consulta de Candidates
      </div>
      <div className="section">
        <Dropdown style={{width: '20em', textAlign: 'left'}} optionLabel="descripcion" value={zonaSeleccionada} options={zonas} onChange={(e) => {elegirZona(zonas, e.value)}} placeholder="Seleccione una zona"/>
      </div>
      <div>
        <DataTable value={orderBy(zonaSeleccionada?.candidates, ['votos'], ['desc'])}>
          <Column field="nombre" header="Nombre"></Column>
          <Column field="partido.nombre" header="Partido"></Column>
          <Column field="votos" header="Votos"></Column>
          <Column body={registrarVoto} style={{width:'7em'}} />
          <Column body={verFicha} style={{width:'10em'}} />
        </DataTable>
        <div className="section">
          <Toast ref={toast} />
        </div>
      </div>
    </div>
  )
}