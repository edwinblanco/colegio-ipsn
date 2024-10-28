import axios from 'axios';
import router from './router';

//const URL = 'http://localhost/proyectoBackCPSN/public/api/'; // Para la cada
const URL = 'http://localhost/colegio-ipsn-back/public/api/'; // Para el trabajo
//const URL = 'https://coral-toad-721622.hostingersite.com/api/';

const validarToken = async (userData) => {
    if (!userData) {
        router.push('/auth/login'); // Redirigir si no hay token
        return;
    }

    const token = userData.access_token;

    try {
        const response = await axios.get(URL + 'validar-token', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        // Puedes manejar la respuesta aquí si es necesario
    } catch (error) {
        // Capturar el error 401
        if (error.response && error.response.status === 401) {
            router.push('/auth/login'); // Redirigir al login si el token es inválido
            return;
        }
    }
};

export { URL, validarToken };
