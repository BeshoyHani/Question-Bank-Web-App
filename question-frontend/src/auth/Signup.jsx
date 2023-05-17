import { Fab } from '@mui/material';
import InputField from '../common/InputField';
import './Auth.css'
import { useState } from 'react';
import { signup } from './AuthAPI';
import { useNavigate } from 'react-router-dom';

const userType = ['STUDENT', 'TEACHER'];

export default function Signup() {
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState('');
    const [userInfo, setUserInfo] = useState({
        username: '',
        password: '',
        rePassword: '',
        userType: 'DEFAULT'
    });

    const handleIputChange = (event) => {
        const { name, value } = event.target;
        setUserInfo({ ...userInfo, [name]: value });
    }

    const handleSubmit = async (event) => {
        const { username, password, rePassword, userType } = userInfo;

        try {
            for (const prop in userInfo) {
                if (userInfo[prop].length === 0) {
                    throw new Error();
                }
            }
            if (password !== rePassword) {
                throw new Error('Password Doesn\'t Match');
            }
            if (userType === 'DEFAULT') {
                throw new Error('User Type is Required');
            }
            event.preventDefault();
            await signup(username, userType, password);
            navigate('/');
        } catch (error) {
            event.preventDefault();
            setErrorMsg(error.message);
        }
    }
    return (
        <div id="auth-form">
            <h2 id="headerTitle">Signup</h2>
            <div>
                <form>
                    <InputField className='row' id="userame" type="text" name="username"
                        label="Username" placeholder="Username" value={userInfo.name} onChange={handleIputChange} />
                    <div className='row'>
                        <select name="userType" value={userInfo.userType} onChange={handleIputChange}>
                            <option value="DEFAULT" disabled>Select User Type</option>
                            {userType.map((type, index) => {
                                return <option key={index} value={type}>{type}</option>
                            })}
                        </select>
                    </div>
                    <InputField className='row' id="password" type="password" name="password"
                        label="Password" placeholder="Password" value={userInfo.password} onChange={handleIputChange} />

                    <InputField className='row' id="rePassword" type="password" name="rePassword"
                        label="Confirm Password" placeholder="Password" value={userInfo.rePassword} onChange={handleIputChange} />

                    {
                        errorMsg.length > 0 &&
                        <div className='error row'>{errorMsg}</div>
                    }
                    <div className='d-flex row'>
                        <Fab variant="extended" type='submit' color="success" aria-label="add" sx={{ mt: 3 }} onClick={handleSubmit}>
                            Signup
                        </Fab>
                    </div>
                </form>
            </div>
        </div>
    )
}