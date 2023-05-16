import { Fab } from '@mui/material';
import InputField from '../common/InputField';
import './Auth.css'

const userType = ['STUDENT', 'TEACHER', 'ADMIN'];

export default function Signup() {
    return (
        <div id="auth-form">
            <h2 id="headerTitle">Signup</h2>
            <div>
                <InputField className='row' id="userame" type="text" name="userame" label="Username" placeholder="Username" />
                <div className='row'>
                    <select name="userType" id="userType">
                        <option value="" selected disabled>Select User Type</option>
                        {userType.map(type => {
                            return <option value={type}>{type}</option>
                        })}
                    </select>
                </div>
                <InputField className='row' id="password" type="password" name="password" label="Password" placeholder="Password" />
                <InputField className='row' id="reRassword" type="password" name="rePassword" label="Confirm Password" placeholder="Password" />
                <div className='d-flex row'>
                    <Fab variant="extended" color="success" aria-label="add" sx={{ mt: 3 }}>
                        Signup
                    </Fab>
                </div>
            </div>
        </div>
    )
}