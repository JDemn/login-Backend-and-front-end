import React, { useRef, useState } from 'react'
import '../css/login.css'

const URL_LOGIN = 'http://localhost/ws-login/login.php';

const enviarData = async (url, data) => {
    const resp = await
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    // console.log(resp);
    const json = await resp.json();

    return json;
}
export const Login = ({ acceder }) => {
    //manejo de errores
    const [error, seterror] = useState(null);
    const [loading, setloading] = useState(false);

    const refUsuario = useRef(null);
    const refClave = useRef(null);

    const handleLogin = async () => {
        // console.log(refUsuario.current.value);
        setloading(true);
        //estos datos se mandan a través de ajax
        const data = {
            'usuario': refUsuario.current.value,
            'clave': refClave.current.value
        }
        // const usuario = refUsuario.current.value;   //valor que está en el objeto
        // const clave = refClave.current.value;       // valor que está en el objeto

        console.log(data);
        //m[e]todo para que se conecte al servidor y le mande los datos
        const respJson = await enviarData(URL_LOGIN, data);
        console.log('respuesta desde el evento', respJson );

        acceder(respJson.conectado);
        seterror( respJson.error );
        setloading(false);
    }

    return (
        <div className='login'>
            <div className='row'>
                <div className='col-sm-4 offset-4 mt-5'>
                    <div className='card pt-5'>
                        <div className='card-header text-center'>
                            <h4>Login</h4>
                        </div>
                        <div className='card-body'>

                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">✉️</span>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="email"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    ref={refUsuario}
                                />
                            </div>

                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon2">🔐</span>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="password"
                                    aria-label="clave"
                                    aria-describedby="basic-addon1"
                                    ref={refClave}
                                />
                            </div>
                            {
                                error && <div className = 'alert alert-danger'>{ error }</div>
                            }
                            <button
                                className='btn btn-primary btn-lg btn-block'
                                onClick={handleLogin}
                                disabled = { loading }
                            >
                                Acceder
                            </button>

                            <div className='card-footer mt-3'>
                                <span>Olvidó su contraseña?</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
