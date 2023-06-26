import { Fab } from '@mui/material';
import InputField from '../common/InputField';
import './Auth.css'
import { useEffect, useState } from 'react';
import { login } from './AuthAPI';
import { Link, useNavigate } from 'react-router-dom';
import TimedModal from '../common/TimedModal';


export default function Login({ setIsAuthenticated, setUserType }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        name === 'username' ? setUsername(value) : setPassword(value);
    }

    const setErrorMessage = (msg) => {
        setErrorMsg(msg);
        setTimeout(() => setErrorMessage(''), 2000);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await login(username, password);
            setUsername('');
            setPassword('');
            setIsAuthenticated(true);
            setUserType(localStorage.getItem('user-type'));
            setTimeout(() => {
                localStorage.clear();
            }, 5000 * 60 * 60)
            navigate('/');
        } catch (error) {
            setPassword('');
            setErrorMessage(error.message);
        }
    }
    return (
        <div id="auth-form">
            <h2 id="headerTitle">Login</h2>
            <div>
                <form>
                    <InputField className='row' id="userame" type="text" name="username" label="Username" placeholder="Username"
                        value={username} onChange={handleInputChange} />
                    <InputField className='row' id="password" type="password" name="password" label="Password" placeholder="Password"
                        value={password} onChange={handleInputChange} />

                    <div className='d-flex row'>
                        {
                            errorMsg.length > 0 &&
                            <TimedModal time={2000} modalTitle={'Error'} modalMessage={errorMsg} />
                        }
                        <Fab variant="extended" type='submit' color="success" aria-label="add" sx={{ mt: 3 }} onClick={handleSubmit}>
                            Login
                        </Fab>

                        <p>Already have an account? <Link to='/signup'>Signup</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}