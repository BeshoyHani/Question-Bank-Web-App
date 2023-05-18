import { useEffect, useState } from 'react';
import './User.css';
import { getCurrentUser } from './UserAPI';

export default function User() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const username = localStorage.getItem('username');
                const user = await getCurrentUser(username);
                return user;
            } catch (error) {
                console.log(error.message);
            }
        }

        getUserInfo()
            .then(user => setUser(user))
            .catch(error => console.log(error.message));
    }, []);
    return (
        <div className='user-container user-item-container'>
            <div>
                <h1>{user.username}</h1>
                <p>{user.userType}</p>
            </div>
        </div>
    );
}