import {useState} from 'react'
import { GerarToken } from '../utils/GerarToken';
import { useNavigate } from 'react-router-dom';

export function Login(){

const navigate = useNavigate()
const [email, setEmail] = useState("");
const [senha, setSenha] = useState("");

const fazerLogin = async (e) => {
    e.preventDefault();

    try{

        const resposta = await fetch('https://dummyjson.com/auth/login', {
            
        })

    }catch{

    }
    
}
    return(
        <div>
            <input
            type="email"
            name = "email"
            placeholder="Digite o seu email..."
            onChange={(e) => {setEmail(e.target.value)}}
            />
            <input
            type="password"
            name = "senha"
            placeholder="Digite a senha..."
            onChange={(e) => {setSenha(e.target.value)}}
            />
            <button onClick={fazerLogin}>ENTRAR</button>
        </div>
    )
}