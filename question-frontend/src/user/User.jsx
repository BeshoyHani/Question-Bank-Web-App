import { useEffect, useState } from 'react';
import { getCurrentUser } from './UserAPI';
import TimedModal from '../common/TimedModal';
import InputField from '../common/InputField';

export default function User() {
    const [user, setUser] = useState({});
    const [error, seterror] = useState('');

    const capitalizeString = (str) => {
        return str?.charAt(0).toUpperCase() + str?.slice(1) || str;
    }

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
            <div className='user-profile-image'>
                <img src='https://cdn-icons-png.flaticon.com/512/1077/1077114.png' />
            </div>
            <InputField label='Username: ' type='text' value={capitalizeString(user.username)} isDisabled={true} />
            <InputField label='Role: ' type='text' value={user.userType} isDisabled={true} />
            {
                error.length > 0 &&
                <TimedModal time={2000} modalTitle='Error' modalMessage={error} />
            }
        </div>
    );
}