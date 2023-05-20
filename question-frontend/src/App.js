import { Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Question from './question/Question';
import UsersList from './user/UsersList';
import QuestionList from './question/QuestionList';
import NavBar from './common/NavBar';
import User from './user/User';
import { ProtectRegisterationRoute, ProtectedRoute } from './common/Protection';

const userType = {
  TEACHER: 'TEACHER',
  STUDENT: 'STUDENT',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN'
}

function App() {
  const username = localStorage.getItem('username');
  const [isAuthenticated, setIsAuthenticated] = useState(!!username);
  const [currentUserType, setUserType]= useState('');

  return (
    <React.Fragment>

      {
        isAuthenticated &&
        <NavBar userType={currentUserType} setUserType={setUserType} setIsAuthenticated={setIsAuthenticated} />
      }

      <Routes>
        <Route path='/questions/create' exact element={
          <ProtectedRoute allowedRoles={[userType.TEACHER]} child={
            <Question isCreate={true} />
          } />
        } />

        <Route path='/questions/update/:id' exact element={
          <ProtectedRoute allowedRoles={[userType.TEACHER]} child={
            <Question isCreate={false} />
          } />
        } />

        <Route path='/questions/all' exact element={
          <ProtectedRoute allowedRoles={[userType.TEACHER, userType.ADMIN, userType.SUPER_ADMIN]} child={
            <QuestionList />
          } />
        } />

        <Route path='/users/all' exact element={
          <ProtectedRoute allowedRoles={[userType.ADMIN, userType.SUPER_ADMIN]} child={
            <UsersList />
          } />
        } />


        <Route path='/' exact element={
          <ProtectedRoute allowedRoles={[]} child={
            <User />
          } />
        } />

        <Route path='/login' exact element={
          <ProtectRegisterationRoute child={
            <Login setIsAuthenticated={setIsAuthenticated} setUserType={setUserType} />
          } />
        } />

        <Route path='/signup' exact element={
          <ProtectRegisterationRoute child={
            <Signup />
          } />
        } />
      </Routes>
    </React.Fragment>

  );
}

export default App;
