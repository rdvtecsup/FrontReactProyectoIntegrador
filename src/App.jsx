import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { Datos } from './pages/Datos';
import { Reportes } from './pages/Reportes';
import './App.css';

function App() {  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/datos' element={<Datos />} />
        <Route path='/reportes' element={<Reportes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;