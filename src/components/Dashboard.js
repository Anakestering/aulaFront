import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

export function Dashboard() {

    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);


    const logout = () => {
        localStorage.removeItem('token')
        alert("Você saiu")
        navigate("/")
    }

    useEffect(() => {

        const token = localStorage.getItem('token');
        fetch('https://dummyjson.com/auth/me', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(resposta => {
                if (resposta.ok) {
                    return resposta.json();
                }
                throw new Error("Token inválido.")
            })
            .then(dadosDoUsuario =>{
                setUsuario(dadosDoUsuario)
            })
            .catch(erro =>{
                alert("Sessão inválida ou expirada. Faça login novamente.")
                logout();
            })
    }, [])

    if(!usuario){
        return <h1>Validando credenciais de segurança...</h1>
    }

    return (
        <div>
            <h1>Área restrita. Você está logado!!!</h1>
            <h3>Seja bem vinde, {usuario.firstName} {usuario.lastName}</h3>
            <button onClick={logout} >Logout</button>
        </div>

    )
}