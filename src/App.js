

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Cadastro } from './components/Cadastro'
import { Home } from './components/Home'
import { Menu } from './components/Menu'
import { Login } from './components/Login'
import { Dashboard } from './components/Dashboard';
import { Publico } from './components/Publico';
import { Autenticacao } from './components/Autenticacao';


function App() {

  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path='/' element={<Publico />} />
        <Route path='/deslogado' element={<Home />} />
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={
          <Autenticacao>
            <Dashboard />
          </Autenticacao>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;