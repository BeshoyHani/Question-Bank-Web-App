import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './User.css';
import { changeUserType } from './UserAPI';
import { useState } from 'react';

const userTypes = ['STUDENT', 'TEACHER', 'ADMIN'];

export default function UserItem({ username, userType, onDeleteUser }) {
    const [currentUserType, setCurrentUserType] = useState(userType);

    const onChangeType = async (event) => {
        try {
            const { value: newType } = event.target;
            const user = await changeUserType(username, newType);
            setCurrentUserType(user.userType);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className='user-item-container'>
            <div>
                <h2>{username}</h2>
            </div>
            <div className='user-item-buttons-container'>
                <select name="userType" value={currentUserType} onChange={onChangeType}>
                    <option value={currentUserType} disabled>{currentUserType}</option>
                    {
                        userTypes.map((type, index) => {
                            return type !== currentUserType && <option value={type} key={index}>{type}</option>
                        })
                    }

                </select>

                <IconButton aria-label="delete" sx={{ mx: 3 }} onClick={() => onDeleteUser(username)}>
                    <DeleteIcon />
                </IconButton>
            </div>
        </div>

    );
}