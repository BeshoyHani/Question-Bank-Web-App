import { Route, Routes } from 'react-router-dom';
import React from 'react';
import './App.css';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Question from './question/Question';
import UserItem from './user/UserItem';
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
  return (
    <React.Fragment>

      <NavBar />
      <Routes>
        <Route path='/questions/create' exact element={
          <ProtectedRoute allowedRoles={[userType.TEACHER]} child={
            <Question />
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
          <User />
        } />

        <Route path='/login' exact element={
          <ProtectRegisterationRoute child={
            <Login />
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
