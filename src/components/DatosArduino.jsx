import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import 'firebase/database';
import { getDatabase, onValue, ref } from 'firebase/database';
import { firebaseConfig } from '../configFirebase/FirebaseConfig';
import { VistaDatosArduino } from './VistaDatosArduino';

export function DatosArduino() {
  const [datoBomba, setDatoBomba] = useState(null);
  const [datoHC_SR04, setDatoHC_SR04] = useState(null);
  const [datoReservorio, setDatoReservorio] = useState(null);
  const [datoDHT11, setDatoDHT11] = useState(null);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const refBomba = ref(database, 'Bomba');
    const refHC_SR04 = ref(database, 'HC_SR04');
    const refReservorio = ref(database, 'Reservorio');
    const refDHT11 = ref(database, 'dht11');

    onValue(refBomba, (snapshot) => {
      const newData = snapshot.val();
      setDatoBomba(newData);
    });

    onValue(refHC_SR04, (snapshot) => {
      const newData = snapshot.val();
      setDatoHC_SR04(newData);
    });

    onValue(refReservorio, (snapshot) => {
      const newData = snapshot.val();
      setDatoReservorio(newData);
    });

    onValue(refDHT11, (snapshot) => {
      const newData = snapshot.val();
      setDatoDHT11(newData);
    });
  }, []);

  if (!datoHC_SR04 || !datoDHT11 || !datoBomba || !datoReservorio) {
    return <p className='text-center'>Fetching data...</p>;
  }

  return (
    <VistaDatosArduino
      datoBomba={datoBomba}
      datoHC_SR04={datoHC_SR04}
      datoReservorio={datoReservorio}
      datoDHT11={datoDHT11}
    />
  );
}
