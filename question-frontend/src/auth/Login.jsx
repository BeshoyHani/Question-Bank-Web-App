import { Fab } from '@mui/material';
import InputField from '../common/InputField';
import './Auth.css'
export default function Login() {
    return (
        <div id="auth-form">
            <h2 id="headerTitle">Login</h2>
            <div>
                <InputField className='row' id="userame" type="text" name="userame" label="Username" placeholder="Username" />
                <InputField className='row' id="password" type="text" name="password" label="Psername" placeholder="Password" />
                <div className='d-flex row'>
                    <Fab variant="extended" color="success" aria-label="add" sx={{ mt: 3 }}>
                        Login
                    </Fab>
                </div>
            </div>
        </div>
    )
}