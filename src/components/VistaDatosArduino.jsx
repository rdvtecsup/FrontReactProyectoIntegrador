import '../datos.css';
import reservorio from '../img/reservorio.png';
import temperatura from '../img/temperatura.png';
import distancia from '../img/distancia.png';
import estado from '../img/estado.png';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { firebaseConfig } from '../configFirebase/FirebaseConfig';
import React, { useState } from 'react';

export function VistaDatosArduino({
  datoBomba,
  datoHC_SR04,
  datoReservorio,
  datoDHT11,
}) {
  const [estadoBomba, setEstadoBomba] = useState(datoBomba.rele);

  function cambiarEstadoBomba() {
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const refBomba = ref(database, 'Bomba');
    const nuevoEstadoBomba = !estadoBomba;
  
    setEstadoBomba(nuevoEstadoBomba);
 
    // Actualizar el estado en Firebase
    set(refBomba, { rele: nuevoEstadoBomba })
      .then(() => {
        console.log(nuevoEstadoBomba)
        
        console.log(datoBomba.rele)
        console.log(nuevoEstadoBomba)
        console.log('Estado de la bomba actualizado en Firebase');
      })
      .catch((error) => {
        console.error('Error al actualizar el estado de la bomba en Firebase:', error);
        // Revertir el estado local en caso de error
        setEstadoBomba(estadoBomba);
      });
  }
  
  return (
    
    <div>
      
      <div className="title-cards">
        <h2>Monitoreo y control</h2>
      </div>
      <div className="container-card">
        <div className="card" id="carta">
          <figure>
            <img src={estado} alt='imgEstado' />
          </figure>
          <div className="contenido-card">
            <h3>Bomba de Agua</h3>
            <h4>Estado</h4>
            <b>{estadoBomba ? 'Encendido' : 'Apagado'}</b>
            <br/>
            <br/>
            <button className="btn-bomba" onClick={cambiarEstadoBomba}>
                Cambiar Estado
            </button>

          </div>
        </div>

        <div className="card" id="carta">
          <figure>
            <img src={distancia} alt='imgDistancia' />
          </figure>
          <div className="contenido-card">
            <h3>Sensor hc-sr04</h3>
            <h4>Distancia</h4>
            <b>{datoHC_SR04.distancia}</b>
          </div>
        </div>
        <div className="card" id="carta">
          <figure>
            <img src={reservorio} alt='imgReservorio' />
          </figure>
          <div className="contenido-card">
            <h3>Reservorio</h3>
            <h4>Altura</h4>
            <b>{datoReservorio.altura}</b>
          </div>
        </div>
        <div className="card" id="carta">
          <figure>
            <img src={temperatura} alt='imgtemperatura' />
          </figure>
          <div className="contenido-card">
            <h3>Sensor -dht11</h3>
            <h4>Temperatura</h4>
            <b>{datoDHT11.temperatura}</b>
            <h4>Humedad</h4>
            <b>{datoDHT11.humedad}</b>
          </div>
        </div>
      </div>
    </div>
  );
}