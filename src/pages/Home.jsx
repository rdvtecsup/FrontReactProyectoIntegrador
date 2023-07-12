
import { Layout } from "../templates/Layout";
import '../carrusel.css';


export function Home() {
  return (
    <Layout>
      <div className="fw-bold text-center mt-5">
        <div className="blog-card spring-fever">
        <div className="title-content">
          <h1><a href="#">Bienvenido Usuario!</a></h1>
          <div className="intro"> <a href="#">Reservorio</a> </div>
        </div>
        <div className="card-info">
        
        <h2>Proyecto "Sistema de supervisión y automatización de suministro de agua"</h2>
        <p>Alvaro Huamani Jair Imanol</p>
        <p>Castro Vilchez Estefany</p>
        <p>Dávila Vargas Randy Blasco</p>
        <p>Fontela Vilcasa Rodrigo Alejandro</p>
        <p>Rojas Huayhua Yesica Nancy</p>
        Somos de Tecsup, pertenecemos al cuarto semestre de la carrera de Diseño y Desarrollo de Software. Presentamos nuestro proyecto integrador, que emplea las siguientes tecnologías: Firebase para el almacenamiento en la nube, Kotlin como lenguaje de programación para el aplicativo móvil y componentes electrónicos como el ESP32, DHT11, HC-SR04, relé y motor sumergible WP-3200.           
        </div>
        <div className="gradient-overlay"></div>
        <div className="color-overlay"></div>
      </div>
      </div>
    </Layout>
  )
}