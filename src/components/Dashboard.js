import { useNavigate } from "react-router-dom"

export function Dashboard() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token')
        alert("Você saiu")
        navigate("/")
    }

    return (
        <div>
            <h1>Área restrita. Você está logado!!!</h1>
            <button onClick={logout} >Deslogar</button>
        </div>

    )
}