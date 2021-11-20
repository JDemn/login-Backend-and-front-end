import { useState } from "react";
import { Login } from "./components/Login";
import { Menu } from './components/Menu'; 

function App() {
  //estado inicial de la aplicación. logeado o no
  const  [conectado, setConectado] = useState(false);

  const acceder=(estado )=>{
    setConectado(estado)
  }
  return (
    conectado ? <Menu/> : <Login acceder = { acceder }/>
  );
}

export default App;
