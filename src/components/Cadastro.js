import { useEffect, useState } from 'react'


export function Cadastro() {

    const [cep, setCep] = useState();
    const [erro, setErro] = useState("");
    const [nomeSalvo, setNomeSalvo] = useState(false)
    const [formulario, setFormulario] = useState({
        nome: "",
        email: "",
        senha: "",
        logradouro: "",
        bairro: "",
        cidade: "",
        estado: "",
        numero: ""
    });
    
    async function buscarCep() {
        setErro("")

        if (cep.length !== 8) {
            setErro("CEP inválido")
            return;
        }

        try {
            const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
            const dados = await resposta.json();

            if (dados.erro) {
                setErro("CEP não encontrado")


            } else {

                setFormulario({ ...formulario, logradouro: dados.logradouro, bairro: dados.bairro, cidade: dados.cidade, estado: dados.uf })

            }
        } catch (e) {
            setErro("Erro ao conectar na API")
        }
    }

    const salvarContato = () => {
        localStorage.setItem('usuario_cadastrado', JSON.stringify(formulario))
        alert("Contato salvo com sucesso")
        setNomeSalvo(true)
    }

    const removerContato = () => {
        localStorage.removeItem('usuario_cadastrado')
        localStorage.removeItem('token')
        alert("Contato removido do localStorage")
        setNomeSalvo(false)
    }

    const handleChange = (e) => {
        setFormulario({ ...formulario, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        const dadosSalvos = localStorage.getItem('usuario_cadastrado')
        if (dadosSalvos) {
            const usuario = JSON.parse(dadosSalvos)
            setNomeSalvo(usuario.nome)
        }
    }, [nomeSalvo])

    return (
        <div>
            <input
                type='text'
                name='nome'
                onChange={handleChange}
                placeholder='Nome' />

            <input
                type='email'
                name='email'
                onChange={handleChange}
                placeholder='Email' />

            <input
                type='password'
                name='senha'
                onChange={handleChange}
                placeholder='Senha' />
            <input
                type="number"
                value={cep}
                placeholder="CEP (números)"
                onChange={(event) => setCep(event.target.value)}
            />
            <button onClick={buscarCep}>
                Buscar endereço
            </button>

            {erro && <p>{erro}</p>}

            <div>
                <input
                    type='text'
                    name='logradouro'
                    placeholder="Rua"
                    value={formulario.logradouro}
                    onChange={(e) => setFormulario({ ...formulario, logradouro: e.target.value })}
                />
                <input
                    type='text'
                    name='bairro'
                    placeholder="Bairro"
                    value={formulario.bairro}
                    onChange={(e) => setFormulario({ ...formulario, bairro: e.target.value })}
                />
                <input
                    type='text'
                    name='cidade'
                    placeholder="Cidade"
                    value={formulario.cidade}
                    onChange={(e) => setFormulario({ ...formulario, cidade: e.target.value })}
                />
                <input
                    type='text'
                    name='estado'
                    placeholder="Estado"
                    value={formulario.estado}
                    onChange={(e) => setFormulario({ ...formulario, estado: e.target.value })}
                />
                <input
                    type='number'
                    name='numero'
                    value={formulario.numero}
                    placeholder='Número'
                    onChange={(e) => setFormulario({ ...formulario, numero: e.target.value })}
                />

                <button onClick={salvarContato}>Salvar</button>
                <button onClick={removerContato} >Apagar</button>
                {nomeSalvo && (<p>Seja bem vindo, {nomeSalvo}</p>)}

            </div>
        </div>
    );
}