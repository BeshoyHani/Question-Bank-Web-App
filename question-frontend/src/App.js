import { Route, Routes } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Question from './question/Question';
import UsersList from './user/UsersList';
import QuestionList from './question/QuestionList';
import NavBar from './common/NavBar';
import User from './user/User';
import { ProtectRegisterationRoute, ProtectedRoute } from './common/Protection';
import CreateExam from './exam/CreateExam';
import ExamList from './exam/ExamList';
import Exam from './exam/Exam';
import SplashScreen from './common/SplashScreen';
import useAuth from './hooks/useAuth';
import Home from './home/Home';

const userType = {
  TEACHER: 'TEACHER',
  STUDENT: 'STUDENT',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN'
}

function App() {
  useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('username'));
  const [currentUserType, setUserType] = useState(localStorage.getItem('user-type'));
  const [displaySplash, setDisplaySplash] = useState(false);
  const ref = useRef(false);

  useEffect(() => {
    const setSplashScreen = () => {
      setDisplaySplash(true);
      setTimeout(() => setDisplaySplash(false), 3000);
    };

    if (ref.current !== true && !isAuthenticated) {
      ref.current = true;
      setSplashScreen();
    }
  }, [currentUserType, isAuthenticated]);

  return (
    <React.Fragment>
      {
        displaySplash &&
        <SplashScreen />
      }


      {
        localStorage.getItem('username') && !displaySplash &&
        <NavBar userType={localStorage.getItem('user-type')} setUserType={setUserType} setIsAuthenticated={setIsAuthenticated} />
      }
      {
        !displaySplash &&
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

          <Route path='/questions/' exact element={
            <ProtectedRoute allowedRoles={[userType.TEACHER, userType.ADMIN, userType.SUPER_ADMIN]} child={
              <QuestionList />
            } />
          } />

          <Route path='/exams/create' exact element={
            <ProtectedRoute allowedRoles={[userType.TEACHER]} child={
              <CreateExam />
            } />
          } />

          <Route path='/exams' exact element={
            <ProtectedRoute allowedRoles={[]} child={
              <ExamList role={localStorage.getItem('user-type')} />
            } />
          } />

          <Route path='/exams/:name/try/:id' exact element={
            <ProtectedRoute allowedRoles={[]} child={
              <Exam />
            } />
          } />


          <Route path='/users' exact element={
            <ProtectedRoute allowedRoles={[userType.ADMIN, userType.SUPER_ADMIN]} child={
              <UsersList />
            } />
          } />

          <Route path='/profile' exact element={
            <ProtectedRoute allowedRoles={[]} child={
              <User />
            } />
          } />


          <Route path='/' exact element={
            <Home />
          } />

          {/* <Route path='/login' exact element={
            <ProtectRegisterationRoute child={
              <Login setIsAuthenticated={setIsAuthenticated} setUserType={setUserType} />
            } />
          } /> */}

          {/* <Route path='/signup' exact element={
            <ProtectRegisterationRoute child={
              <Signup />
            } />
          } /> */}
        </Routes>
      }
    </React.Fragment>

  );
}

export default App;
