import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Question from './question/Question';

function App() {
  return (
    <Routes>
      <Route path='/' exact element={
        <Question />
      } />

      <Route path='/login' exact element={
        <Login />
      } />

      <Route path='/signup' exact element={
        <Signup />
      } />
    </Routes>

  );
}

export default App;
