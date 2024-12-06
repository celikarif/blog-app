import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppRouter from './routes/AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import Base from './components/Base';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div style={{ flex: 1 }}>
<ToastContainer />
 <Base title={'Deneme'} description='as'>
 <h1>Bu children mı ??</h1>
 </Base>

        <AppRouter /> 
      </div>

  );
}

export default App;
