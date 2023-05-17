import { Fab } from '@mui/material';
import InputField from '../common/InputField';
import './Auth.css'
import { useState } from 'react';
import { login } from './AuthAPI';
import { useNavigate } from 'react-router-dom';
export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        name === 'username' ? setUsername(value) : setPassword(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await login(username, password);
            setUsername('');
            setPassword('');
            navigate('/');
        } catch (error) {
            setPassword('');
            setErrorMsg(error.message)
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
                            <div className='error'>{errorMsg}</div>
                        }
                        <Fab variant="extended" type='submit' color="success" aria-label="add" sx={{ mt: 3 }} onClick={handleSubmit}>
                            Login
                        </Fab>
                    </div>
                </form>
            </div>
        </div>
    )
}