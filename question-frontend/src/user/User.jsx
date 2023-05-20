import { useEffect, useState } from 'react';
import './User.css';
import { getCurrentUser } from './UserAPI';
import TimedModal from '../common/TimedModal';

export default function User() {
    const [user, setUser] = useState({});
    const [error, seterror] = useState('');

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const username = localStorage.getItem('username');
                const user = await getCurrentUser(username);
                return user;
            } catch (error) {
                seterror(error.message);
            }
        }
        getUserInfo()
            .then(user => setUser(user || {}))
            .catch(error => seterror(error.message));
    }, []);
    return (
        <div className='user-container item-container'>
            <div>
                <h1>{user.username}</h1>
                <p>{user.userType}</p>
            </div>
            {
                error.length > 0 &&
                <TimedModal time={2000} modalTitle='Error' modalMessage={error} />
            }
        </div>
    );
}