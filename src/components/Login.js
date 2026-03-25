import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export function Login() {

    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const fazerLogin = async (e) => {
        e.preventDefault();

        try {
            const resposta = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: email,
                    password: senha
                })
            })

            if (resposta.ok) {
                const dados = await resposta.json();
                localStorage.setItem('token', dados.accessToken)
                alert("Login realizado com sucesso.")
                navigate("/dashboard")
            } else {
                alert("Usuário e/ou senha incorretos. Verifique e tente novamente.")
            }

        } catch {
            alert("Erro na conexão com o servidor.")
        }

    }
    return (
        <div>
            <input
                type="text"
                name="email"
                placeholder="Digite o seu email..."
                onChange={(e) => { setEmail(e.target.value) }}
            />
            <input
                type="password"
                name="senha"
                placeholder="Digite a senha..."
                onChange={(e) => { setSenha(e.target.value) }}
            />
            <button onClick={fazerLogin}>ENTRAR</button>
        </div>
    )
}