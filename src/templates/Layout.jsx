import { FaHome, FaChartBar, FaBurn } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export function Layout({ children }) {
  const navigate = useNavigate();
  
  const client = axios.create({
    baseURL: 'http://127.0.0.1:8000',
  });

  function submitLogout(e) {
    e.preventDefault();
    client.post('/api/logout/', { withCredentials: true }).then(function (res) {
      navigate('/login'); 
    });
  }

  return (
    <div className='main-container d-flex'>
      <div className='sidebar' id='side_nav'>
        <div className='header-box px-3 pt-3 pb-4'>
          <h1 className='fs-4'>
            <span className='bg-white text-dark rounded shadow px-2 me-2'>
              LCI
            </span>
            Proyecto Final
          </h1>
        </div>

        <ul className='list-unstyled px-2'>
          <li>
            <Link to='/home' className='text-decoration-none px-3 py-2 d-block'>
              <FaHome className='iconHome'/>
              Home
            </Link>
          </li>
          <li>
            <Link
              to='/datos'
              className='text-decoration-none px-3 py-2 d-block'
            >
              <FaBurn className='iconDatos'/>
              Datos
            </Link>
          </li>
          <li>
            <Link
              to='/reportes'
              className='text-decoration-none px-3 py-2 d-block'
            >
              <FaChartBar className='iconReportes'/>
              Reportes
            </Link>
          </li>
          <li>
            <Button className='btn_cierreSesion btn btn-danger' onClick={submitLogout}>Cerrar Sesion</Button>
          </li>
        </ul>
        <hr className='h-color mx-2' />
      </div>
      <div className='content'>{children}</div>
    </div>
  );
}
